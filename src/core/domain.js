(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.HX = factory();
  }
})(this, function () {
  'use strict';
  var VERSION = '0.1.0-dev';
  function firmware(value) {
    return typeof value === 'string' && /^(?:[1-9]|[1-9][0-9])\.[0-9]{2}$/.test(value);
  }
  function detect(ua) {
    var m =
      typeof ua === 'string' &&
      ua.length <= 2048 &&
      /PlayStation 4[ ;]+([0-9]{1,2}\.[0-9]{2})(?=[; )]|$)/.exec(ua);
    return m && firmware(m[1]) ? m[1] : null;
  }
  function selection(hint, manual) {
    return {
      hint: hint,
      manual: manual,
      value: manual || hint,
      status:
        hint && manual && hint !== manual
          ? 'conflict'
          : manual
            ? 'manual_only'
            : hint
              ? 'detected_hint'
              : 'unknown'
    };
  }
  function guard(context) {
    if (context.selection.status === 'conflict') {
      return { eligible: false, code: 'HX-1004' };
    }
    return { eligible: false, code: 'HX-2001' };
  }
  function transition(state, event) {
    if (event === 'firmware_changed' || event === 'cancel') {
      return 'idle';
    }
    if (event === 'reload' && state !== 'idle') {
      return 'unconfirmed';
    }
    if (event === 'request' && state === 'idle') {
      return 'consent_required';
    }
    if (event === 'accept' && state === 'consent_required') {
      return 'checking';
    }
    if (event === 'unavailable' && state === 'checking') {
      return 'failed';
    }
    if (event === 'handoff' && state === 'checking') {
      return 'awaiting_external_result';
    }
    if (event === 'timeout' && state === 'awaiting_external_result') {
      return 'unconfirmed';
    }
    return state;
  }
  function preferences(raw) {
    var v;
    try {
      v = JSON.parse(raw);
    } catch (e) {
      v = {};
    }
    v = v && typeof v === 'object' ? v : {};
    return {
      locale: v.locale === 'id' ? 'id' : 'en',
      diagnostics: v.diagnostics === true,
      manual: firmware(v.manual) ? v.manual : null,
      largeText: v.largeText === true
    };
  }
  function storage(adapter) {
    var memory = {},
      persistent = true,
      prefix = 'hypehostx:v1:';
    return {
      get: function (key) {
        if (Object.prototype.hasOwnProperty.call(memory, key)) {
          return memory[key];
        }
        try {
          var value = adapter.getItem(prefix + key);
          memory[key] = value;
          return value;
        } catch (e) {
          persistent = false;
          return memory[key] || null;
        }
      },
      set: function (key, value) {
        memory[key] = value;
        try {
          adapter.setItem(prefix + key, value);
        } catch (e) {
          persistent = false;
        }
      },
      remove: function (key) {
        delete memory[key];
        try {
          adapter.removeItem(prefix + key);
        } catch (e) {
          persistent = false;
        }
      },
      persistent: function () {
        return persistent;
      }
    };
  }
  function diagnostics() {
    var events = [],
      truncated = false;
    return {
      record: function (code) {
        if (!/^HX-[0-9]{4}$/.test(code)) {
          code = 'HX-5001';
        }
        events.push({ code: code, version: VERSION, time: new Date().toISOString() });
        if (events.length > 200) {
          events.shift();
          truncated = true;
        }
      },
      restore: function (raw) {
        try {
          var stored = JSON.parse(raw);
          if (!stored || !Array.isArray(stored.events)) {
            return;
          }
          events = stored.events
            .slice(-200)
            .filter(function (e) {
              return (
                e &&
                /^HX-[0-9]{4}$/.test(e.code) &&
                typeof e.time === 'string' &&
                e.time.length <= 30
              );
            })
            .map(function (e) {
              return { code: e.code, time: e.time, version: VERSION };
            });
          truncated = stored.truncated === true || stored.events.length > 200;
        } catch (e) {
          events = [];
        }
      },
      clear: function () {
        events = [];
        truncated = false;
      },
      export: function () {
        return JSON.stringify({ schemaVersion: 1, events: events, truncated: truncated }, null, 2);
      }
    };
  }
  function validateCatalog(data) {
    var seen = {},
      statuses = [
        'reference_listed',
        'under_review',
        'verified',
        'failed',
        'withdrawn',
        'unsupported'
      ];
    if (!data || data.schemaVersion !== 1 || !Array.isArray(data.records)) {
      throw new Error('HX-4002');
    }
    data.records.forEach(function (r) {
      if (
        !firmware(r.firmware) ||
        seen[r.firmware] ||
        statuses.indexOf(r.status) < 0 ||
        !Array.isArray(r.evidenceIds)
      ) {
        throw new Error('HX-4002');
      }
      if (r.status === 'verified' && (!r.evidenceIds.length || !r.reviewer || !r.reviewedAt)) {
        throw new Error('HX-4002');
      }
      seen[r.firmware] = true;
    });
    return true;
  }
  return {
    version: VERSION,
    firmware: firmware,
    detect: detect,
    selection: selection,
    guard: guard,
    transition: transition,
    preferences: preferences,
    storage: storage,
    diagnostics: diagnostics,
    validateCatalog: validateCatalog
  };
});
