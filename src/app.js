(function () {
  'use strict';
  if (!window.HX || !window.HX_DATA) {
    return;
  }
  var H = window.HX,
    data = window.HX_DATA,
    adapter;
  try {
    adapter = window.localStorage;
  } catch (e) {
    adapter = null;
  }
  var store = H.storage(adapter),
    prefs = H.preferences(store.get('preferences')),
    logs = H.diagnostics();
  if (prefs.diagnostics) {
    logs.restore(store.get('events'));
  }
  var state = {
    selection: H.selection(H.detect(navigator.userAgent), prefs.manual),
    cache: 'unknown',
    session: 'idle'
  };
  var routes = [
    '',
    'hypehen',
    'firmware',
    'compatibility',
    'payloads',
    'offline',
    'system',
    'diagnostics',
    'recovery',
    'settings',
    'updates',
    'guide',
    'changelog',
    'credits',
    'about'
  ];
  var main = document.getElementById('content'),
    nav = document.getElementById('nav');
  function t(key) {
    return data.locales[prefs.locale][key] || data.locales.en[key] || key;
  }
  function el(tag, text, parent, className) {
    var n = document.createElement(tag);
    if (typeof text === 'string') {
      n.appendChild(document.createTextNode(text));
    }
    if (className) {
      n.className = className;
    }
    if (parent) {
      parent.appendChild(n);
    }
    return n;
  }
  function link(text, route, parent, primary) {
    var a = el('a', text, parent, 'button' + (primary ? ' primary' : ' secondary'));
    a.href = '#/' + route;
    return a;
  }
  function button(key, parent, fn) {
    var b = el('button', t(key), parent);
    b.type = 'button';
    b.onclick = fn;
    return b;
  }
  function say(key) {
    document.getElementById('announce').textContent = t(key);
  }
  function save() {
    store.set('preferences', JSON.stringify(prefs));
    say(store.persistent() ? 'saved' : 'sessionOnly');
  }
  function row(key, value, parent) {
    var r = el('div', '', parent, 'row');
    el('strong', t(key), r);
    el('span', value, r);
  }
  function panel() {
    return el('section', '', main, 'panel');
  }
  function record(code) {
    logs.record(code);
    if (prefs.diagnostics) {
      store.set('events', logs.export());
    }
  }
  function status(parent) {
    row('firmware', state.selection.value || t('unknown'), parent);
    el(
      'p',
      t(state.selection.status),
      parent,
      state.selection.status === 'conflict' ? 'warning' : ''
    );
    row('device', t(state.selection.hint ? 'hint' : 'information'), parent);
    row('cache', t(state.cache), parent);
  }
  function firmwareForm() {
    var f = el('form', '', main),
      label = el('label', t('select'), f),
      input = el('input', '', f);
    input.id = 'firmware';
    label.htmlFor = input.id;
    input.value = prefs.manual || '';
    input.maxLength = 5;
    input.autocomplete = 'off';
    var submit = el('button', t('save'), f);
    submit.type = 'submit';
    f.onsubmit = function (e) {
      e.preventDefault();
      if (!H.firmware(input.value)) {
        say('invalid');
        return;
      }
      prefs.manual = input.value;
      state.selection = H.selection(state.selection.hint, prefs.manual);
      state.session = H.transition(state.session, 'firmware_changed');
      save();
      render();
    };
    button('clear', f, function () {
      prefs.manual = null;
      state.selection = H.selection(state.selection.hint, null);
      save();
      render();
    });
    el(
      'p',
      t(state.selection.status),
      main,
      state.selection.status === 'conflict' ? 'warning' : ''
    );
  }
  function catalog() {
    el('p', t('catalogNote'), main);
    var label = el('label', t('search'), main),
      input = el('input', '', main),
      list = el('div', '', main);
    input.id = 'search';
    label.htmlFor = input.id;
    input.maxLength = 5;
    function populate() {
      list.textContent = '';
      var count = 0;
      data.catalog.records.forEach(function (r) {
        if (input.value && r.firmware !== input.value) {
          return;
        }
        count++;
        var line = el('div', '', list, 'row');
        el('strong', r.firmware, line);
        el('span', t(r.status), line);
      });
      if (!count) {
        el('p', t('empty'), list);
      }
    }
    input.oninput = populate;
    populate();
  }
  function components() {
    el('p', t('noComponents'), main);
    var favorites = [];
    try {
      favorites = JSON.parse(store.get('favorites')) || [];
    } catch (e) {
      favorites = [];
    }
    if (!Array.isArray(favorites)) {
      favorites = [];
    }
    favorites = favorites.filter(function (id) {
      return data.components.some(function (c) {
        return c.id === id;
      });
    });
    var label = el('label', t('searchComponents'), main),
      search = el('input', '', main);
    search.id = 'component-search';
    label.htmlFor = search.id;
    search.maxLength = 64;
    var filterLabel = el('label', '', main),
      filter = el('input', '', filterLabel);
    filter.type = 'checkbox';
    filterLabel.appendChild(document.createTextNode(t('favorites')));
    var list = el('div', '', main);
    function populate() {
      list.textContent = '';
      var count = 0;
      data.components.forEach(function (c) {
        var favorite = favorites.indexOf(c.id) >= 0;
        if (
          c.name.toLowerCase().indexOf(search.value.toLowerCase()) < 0 ||
          (filter.checked && !favorite)
        ) {
          return;
        }
        count++;
        var p = el('section', '', list, 'panel');
        el('h2', c.name, p);
        el('p', t('documentation'), p);
        var a = el('a', c.sourceUrl, p);
        a.href = c.sourceUrl;
        a.rel = 'noopener noreferrer';
        button(favorite ? 'unfavorite' : 'favorite', p, function () {
          var index = favorites.indexOf(c.id);
          if (index < 0) {
            favorites.push(c.id);
          } else {
            favorites.splice(index, 1);
          }
          store.set('favorites', JSON.stringify(favorites));
          populate();
        });
      });
      if (!count) {
        el('p', t('emptyComponents'), list);
      }
    }
    search.oninput = populate;
    filter.onchange = populate;
    populate();
  }
  function cacheInspect() {
    if (!navigator.serviceWorker || !window.caches || !window.isSecureContext) {
      state.cache = 'unsupported';
      return;
    }
    window.caches
      .open(data.cacheName)
      .then(function (cache) {
        return Promise.all(
          data.assets.map(function (path) {
            return cache.match(new URL(path, document.baseURI).href).then(function (r) {
              return !!r;
            });
          })
        );
      })
      .then(
        function (results) {
          state.cache = results.every(function (v) {
            return v;
          })
            ? 'ready'
            : 'absent';
          if (!location.hash || location.hash === '#/' || location.hash === '#/offline') {
            render();
          }
        },
        function () {
          state.cache = 'failed';
          if (location.hash === '#/offline') {
            render();
          }
        }
      );
  }
  function prepare() {
    state.cache = 'preparing';
    render();
    navigator.serviceWorker.register('./sw.js').then(
      function (reg) {
        var worker = reg.installing || reg.waiting || reg.active;
        if (!worker) {
          throw new Error('missing worker');
        }
        if (worker.state === 'activated') {
          cacheInspect();
          return;
        }
        worker.addEventListener('statechange', function () {
          if (worker.state === 'activated') {
            cacheInspect();
          }
          if (worker.state === 'redundant') {
            state.cache = 'failed';
            record('HX-3001');
            render();
          }
        });
      },
      function () {
        state.cache = 'failed';
        record('HX-3001');
        render();
      }
    );
  }
  function render() {
    var route = location.hash.replace(/^#\//, ''),
      index = routes.indexOf(route),
      p,
      report;
    main.textContent = '';
    nav.textContent = '';
    document.documentElement.lang = prefs.locale;
    document.body.className = prefs.largeText ? 'large' : '';
    routes.forEach(function (r, i) {
      var a = el('a', t('route' + i), nav);
      a.href = '#/' + r;
      if (r === route) {
        a.setAttribute('aria-current', 'page');
      }
    });
    el('h1', index < 0 ? t('notFound') : t('route' + index), main);
    el('p', t('tagline'), main, 'subtitle');
    if (index < 0) {
      link(t('home'), '', main);
      return;
    }
    if (route === '') {
      p = panel();
      p.className += ' hero';
      el('h2', 'HYPEHEN', p);
      el('p', t('unavailable'), p);
      link(t('compatLink'), 'compatibility', p, true);
      status(panel());
      link(t('prepare'), 'offline', main);
      link(t('guideLink'), 'guide', main);
    }
    if (route === 'hypehen') {
      el('p', t('unavailable'), main, 'warning');
      el('p', t(state.selection.status), main);
      el('p', H.guard(state).code, main);
      link(t('compatLink'), 'compatibility', main);
    }
    if (route === 'firmware') {
      firmwareForm();
      catalog();
    }
    if (route === 'compatibility') {
      catalog();
    }
    if (route === 'payloads') {
      components();
    }
    if (route === 'offline') {
      el('p', t(state.cache), main, 'warning');
      el('p', t('component'), main);
      el('p', t('cacheHelp'), main);
      if (state.cache !== 'unsupported' && state.cache !== 'preparing') {
        button('prepare', main, prepare);
        button('verify', main, cacheInspect);
      }
    }
    if (route === 'system') {
      el('p', t('systemHelp'), main);
      p = panel();
      status(p);
      row('installed', H.version, p);
      row('language', navigator.language || t('unknown'), p);
    }
    if (route === 'diagnostics') {
      el('p', t('diagHelp'), main);
      button('export', main, function () {
        report.value = logs.export();
        report.focus();
        report.select();
      });
      button('clearLogs', main, function () {
        logs.clear();
        store.remove('events');
        report.value = logs.export();
      });
      el('label', t('report'), main).htmlFor = 'report';
      report = el('textarea', '', main);
      report.id = 'report';
      report.readOnly = true;
      report.value = logs.export();
    }
    if (route === 'recovery') {
      el('p', t('recoveryHelp'), main);
      button('reset', main, function () {
        if (window.confirm(t('resetConfirm'))) {
          ['preferences', 'events', 'favorites', 'session'].forEach(store.remove);
          prefs = H.preferences(null);
          logs.clear();
          state.selection = H.selection(state.selection.hint, null);
          state.session = 'idle';
          render();
          document.getElementById('reset-preferences').focus();
        }
      }).id = 'reset-preferences';
    }
    if (route === 'settings') {
      el('label', t('language'), main).htmlFor = 'locale';
      var select = el('select', '', main);
      select.id = 'locale';
      ['en', 'id'].forEach(function (v) {
        var o = el('option', v === 'en' ? 'English' : 'Bahasa Indonesia', select);
        o.value = v;
        o.selected = prefs.locale === v;
      });
      select.onchange = function () {
        prefs.locale = select.value;
        save();
        render();
      };
      ['largeText', 'diagnostics'].forEach(function (key) {
        var l = el('label', '', main),
          c = el('input', '', l);
        c.type = 'checkbox';
        c.checked = prefs[key];
        l.appendChild(document.createTextNode(t(key)));
        c.onchange = function () {
          prefs[key] = c.checked;
          if (key === 'diagnostics' && !c.checked) {
            store.remove('events');
          }
          save();
          render();
        };
      });
    }
    if (route === 'updates') {
      row('installed', H.version, main);
      p = el('p', t('updateUnknown'), main);
      button('check', main, function () {
        var x = new XMLHttpRequest();
        x.open('GET', 'release.json', true);
        x.timeout = 5000;
        x.onload = function () {
          try {
            var v = JSON.parse(x.responseText);
            p.textContent =
              x.status === 200 && v.schemaVersion === 1 && v.version === H.version
                ? t('sameVersion')
                : t('updateUnknown');
          } catch (e) {
            p.textContent = t('updateUnknown');
          }
        };
        x.onerror = x.ontimeout = function () {
          p.textContent = t('updateUnknown');
        };
        x.send();
      });
    }
    if (route === 'guide' || route === 'changelog' || route === 'credits' || route === 'about') {
      el('p', t(route + 'Text'), main);
    }
    if (route === 'credits') {
      [
        'https://github.com/GoldHEN/GoldHEN',
        'https://github.com/OpenOrbis/OpenOrbis-PS4-Toolchain',
        'https://github.com/OpenOrbis/mira-project',
        'https://github.com/GamerHack/GamerHack.github.io'
      ].forEach(function (url) {
        var a = el('a', url, el('p', '', main));
        a.href = url;
        a.rel = 'noopener noreferrer';
      });
    }
  }
  try {
    H.validateCatalog(data.catalog);
  } catch (e) {
    record('HX-4002');
    data.catalog = { schemaVersion: 1, records: [] };
  }
  window.addEventListener('hashchange', function () {
    render();
    main.focus();
  });
  document.addEventListener('keydown', function (e) {
    if (
      e.target.tagName === 'INPUT' ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.tagName === 'SELECT'
    ) {
      return;
    }
    if (e.keyCode !== 38 && e.keyCode !== 40) {
      return;
    }
    var nodes = document.querySelectorAll('a,button,input,select,textarea'),
      i;
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i] === document.activeElement) {
        var next = nodes[i + (e.keyCode === 40 ? 1 : -1)];
        if (next) {
          e.preventDefault();
          next.focus();
        }
        break;
      }
    }
  });
  cacheInspect();
  render();
})();
