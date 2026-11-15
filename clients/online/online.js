'use strict';
(() => {
  let token = null,
    locale = 'en',
    socket = null,
    lobby = null,
    seen = new Set();
  const main = document.getElementById('main'),
    status = document.getElementById('status');
  const copy = {
    en: {
      home: 'Online center',
      signin: 'Sign in',
      profile: 'Profile & privacy',
      friends: 'Friends',
      chat: 'Chat',
      lobbies: 'Lobbies',
      saves: 'Cloud saves',
      store: 'Homebrew store',
      service: 'Service status',
      intro:
        'An independent network for original apps. No PSN account, retail-game integration, or HEN activation.',
      signedout: 'Sign in to use this service. Your offline host does not require an account.',
      email: 'Email',
      password: 'Password (12–128 characters)',
      name: 'Display name',
      register: 'Create independent account',
      verify: 'Verify email',
      code: 'Verification or reset token',
      login: 'Sign in',
      logout: 'Sign out',
      save: 'Save',
      delete: 'Delete',
      confirm: 'Confirm this deletion? This cannot be undone.',
      refresh: 'Refresh',
      empty: 'No records.',
      request: 'Send request',
      userid: 'User ID',
      accept: 'Accept',
      decline: 'Decline',
      block: 'Block user',
      open: 'Open',
      message: 'Message',
      send: 'Send',
      report: 'Report',
      reason: 'Reason',
      create: 'Create',
      capacity: 'Capacity (2–8)',
      join: 'Join',
      leave: 'Leave',
      close: 'Close lobby',
      connect: 'Connect original demo',
      move: 'Send demo position',
      slot: 'Save slot',
      content: 'Own-app save content',
      revision: 'Expected revision (0 for new)',
      load: 'Load',
      offline: 'Connection failed or timed out. Service reachability is unknown.',
      ok: 'Server acknowledged the operation.',
      pending:
        'If eligible, a verification message has been sent. Local development delivers it only to the private mail sink.',
      presence: 'Presence visible (true/false)',
      reset: 'Request password reset',
      resetConfirm: 'Set new password',
      sessions: 'Active sessions',
      revoke: 'Revoke',
      unsupported: 'This browser lacks the required secure online capabilities.'
    },
    id: {
      home: 'Pusat daring',
      signin: 'Masuk',
      profile: 'Profil & privasi',
      friends: 'Teman',
      chat: 'Obrolan',
      lobbies: 'Lobi',
      saves: 'Simpanan cloud',
      store: 'Toko homebrew',
      service: 'Status layanan',
      intro:
        'Jaringan independen untuk aplikasi asli. Tanpa akun PSN, integrasi game retail, atau aktivasi HEN.',
      signedout: 'Masuk untuk memakai layanan ini. Host offline tidak memerlukan akun.',
      email: 'Email',
      password: 'Kata sandi (12–128 karakter)',
      name: 'Nama tampilan',
      register: 'Buat akun independen',
      verify: 'Verifikasi email',
      code: 'Token verifikasi atau reset',
      login: 'Masuk',
      logout: 'Keluar',
      save: 'Simpan',
      delete: 'Hapus',
      confirm: 'Konfirmasi penghapusan ini? Tidak dapat dibatalkan.',
      refresh: 'Muat ulang',
      empty: 'Tidak ada data.',
      request: 'Kirim permintaan',
      userid: 'ID pengguna',
      accept: 'Terima',
      decline: 'Tolak',
      block: 'Blokir pengguna',
      open: 'Buka',
      message: 'Pesan',
      send: 'Kirim',
      report: 'Laporkan',
      reason: 'Alasan',
      create: 'Buat',
      capacity: 'Kapasitas (2–8)',
      join: 'Gabung',
      leave: 'Tinggalkan',
      close: 'Tutup lobi',
      connect: 'Hubungkan demo asli',
      move: 'Kirim posisi demo',
      slot: 'Slot simpanan',
      content: 'Isi simpanan aplikasi sendiri',
      revision: 'Revisi yang diharapkan (0 untuk baru)',
      load: 'Muat',
      offline: 'Koneksi gagal atau waktu habis. Keterjangkauan layanan tidak diketahui.',
      ok: 'Server mengonfirmasi operasi.',
      pending:
        'Jika memenuhi syarat, pesan verifikasi telah dikirim. Pengembangan lokal hanya mengirimnya ke kotak surat uji privat.',
      presence: 'Kehadiran terlihat (true/false)',
      reset: 'Minta reset kata sandi',
      resetConfirm: 'Tetapkan kata sandi baru',
      sessions: 'Sesi aktif',
      revoke: 'Cabut',
      unsupported: 'Browser ini tidak memiliki kemampuan daring aman yang diperlukan.'
    }
  };
  const t = (k) => copy[locale][k] ?? k;
  const el = (tag, text, parent = main) => {
    const node = document.createElement(tag);
    node.textContent = text;
    parent.appendChild(node);
    return node;
  };
  const action = (key, parent, fn) => {
    const b = el('button', t(key), parent);
    b.type = 'button';
    b.onclick = () => Promise.resolve(fn()).catch(showError);
    return b;
  };
  const showError = (e) => {
    status.textContent = e.message || t('offline');
  };
  async function api(method, path, body) {
    const controller = new AbortController(),
      timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch('/api/v1' + path, {
        method,
        headers: {
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...(token ? { Authorization: 'Bearer ' + token } : {})
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });
      const result = await res.json();
      if (res.status === 401) {
        token = null;
        if (socket) socket.close();
      }
      if (!res.ok) throw new Error(result.code);
      return result;
    } catch (e) {
      if (e.name === 'AbortError' || e instanceof TypeError) throw new Error(t('offline'));
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }
  function form(title, fields, submit) {
    const f = el('form', ''),
      heading = el('h2', t(title), f),
      inputs = {};
    void heading;
    for (const [name, key, type, value] of fields) {
      const label = el('label', t(key), f),
        input = el(type === 'textarea' ? 'textarea' : 'input', '', label);
      if (type !== 'textarea') input.type = type || 'text';
      input.value = value ?? '';
      input.required = true;
      if (type === 'password') {
        input.minLength = 12;
        input.maxLength = 128;
        input.autocomplete = 'current-password';
      }
      inputs[name] = input;
    }
    const b = el('button', t(title), f);
    b.type = 'submit';
    f.onsubmit = async (e) => {
      e.preventDefault();
      b.disabled = true;
      try {
        await submit(Object.fromEntries(Object.entries(inputs).map(([k, v]) => [k, v.value])));
        status.textContent = t('ok');
      } catch (err) {
        showError(err);
      } finally {
        b.disabled = false;
      }
    };
    return inputs;
  }
  function list(items, render) {
    const section = el('section', '');
    if (!items.length) el('p', t('empty'), section);
    items.forEach((item) => render(item, el('article', '', section)));
  }
  async function render() {
    if (socket) {
      socket.close();
      socket = null;
    }
    main.textContent = '';
    status.textContent = '';
    const route = location.hash.slice(2) || 'home',
      nav = document.getElementById('nav');
    nav.textContent = '';
    document.documentElement.lang = locale;
    for (const key of [
      'home',
      'signin',
      'profile',
      'friends',
      'chat',
      'lobbies',
      'saves',
      'store',
      'service'
    ]) {
      const a = el('a', t(key), nav);
      a.href = '#/' + key;
      if (key === route) a.setAttribute('aria-current', 'page');
    }
    el('h1', t(route));
    if (!window.fetch || !window.AbortController || !window.isSecureContext) {
      el('p', t('unsupported'));
      return;
    }
    if (route === 'home') {
      el('p', t('intro'));
      el('p', token ? t('ok') : t('signedout'));
      return;
    }
    if (route === 'signin') {
      form(
        'login',
        [
          ['email', 'email', 'email'],
          ['password', 'password', 'password']
        ],
        async (body) => {
          const r = await api('POST', '/auth/login', body);
          token = r.token;
          location.hash = '#/profile';
        }
      );
      form(
        'register',
        [
          ['email', 'email', 'email'],
          ['password', 'password', 'password'],
          ['displayName', 'name', 'text']
        ],
        async (body) => {
          await api('POST', '/auth/register', body);
          el('p', t('pending'));
        }
      );
      form('verify', [['token', 'code', 'text']], (body) => api('POST', '/auth/verify', body));
      form('reset', [['email', 'email', 'email']], (body) =>
        api('POST', '/auth/reset/request', body)
      );
      form(
        'resetConfirm',
        [
          ['token', 'code', 'text'],
          ['password', 'password', 'password']
        ],
        (body) => api('POST', '/auth/reset/confirm', body)
      );
      return;
    }
    if (route === 'store') {
      const r = await api('GET', '/catalog');
      list(r.items, (item, p) => {
        el('strong', item.name + ' ' + item.version, p);
        el('p', item.license, p);
        el('p', item.sha256 ?? '', p);
        el('p', item.source_url, p);
      });
      return;
    }
    if (route === 'service') {
      const r = await api('GET', '/status');
      el('p', r.service + ' · API ' + r.apiVersion + ' · ' + r.version);
      action('refresh', main, render);
      return;
    }
    if (!token) {
      el('p', t('signedout'));
      return;
    }
    action('logout', main, async () => {
      try {
        await api('POST', '/auth/logout', {});
      } finally {
        token = null;
        if (socket) socket.close();
        location.hash = '#/signin';
      }
    });
    if (route === 'profile') {
      const me = await api('GET', '/me');
      el('p', t('userid') + ': ' + me.user_id);
      form(
        'save',
        [
          ['displayName', 'name', 'text', me.display_name],
          ['presence', 'presence', 'text', String(me.presence_visible)]
        ],
        (body) => {
          if (!['true', 'false'].includes(body.presence)) throw new Error('INVALID_INPUT');
          return api('PATCH', '/me', {
            displayName: body.displayName,
            presenceVisible: body.presence === 'true'
          });
        }
      );
      el('h2', t('sessions'));
      list((await api('GET', '/me/sessions')).items, (s, p) => {
        el('p', s.created_at, p);
        action('revoke', p, async () => {
          await api('DELETE', '/me/sessions/' + encodeURIComponent(s.id));
          await render();
        });
      });
      action('delete', main, async () => {
        if (confirm(t('confirm'))) {
          await api('DELETE', '/me');
          token = null;
          location.hash = '#/signin';
        }
      });
    }
    if (route === 'friends') {
      form('request', [['userId', 'userid', 'text']], (body) =>
        api('POST', '/friend-requests', body)
      );
      form('block', [['userId', 'userid', 'text']], (body) =>
        api('PUT', '/blocks/' + encodeURIComponent(body.userId), {})
      );
      list((await api('GET', '/friend-requests')).items, (r, p) => {
        el('p', r.sender, p);
        for (const accept of [true, false])
          action(accept ? 'accept' : 'decline', p, async () => {
            await api('POST', '/friend-requests/' + r.id + '/respond', { accept });
            await render();
          });
      });
      list((await api('GET', '/friends')).items, (r, p) => {
        el('strong', r.display_name, p);
        el('p', r.user_id, p);
        action('delete', p, async () => {
          await api('DELETE', '/friends/' + r.user_id);
          await render();
        });
      });
    }
    if (route === 'chat') {
      form('create', [['userId', 'userid', 'text']], async (body) => {
        await api('POST', '/conversations', body);
        await render();
      });
      list((await api('GET', '/conversations')).items, (c, p) => {
        el('p', c.id, p);
        action('open', p, async () => {
          const messages = await api('GET', '/conversations/' + c.id + '/messages');
          const section = el('section', '');
          messages.items.reverse().forEach((m) => el('p', m.body, section));
          form('send', [['body', 'message', 'textarea']], async (body) => {
            await api('POST', '/conversations/' + c.id + '/messages', body);
            el('p', body.body, section);
          });
        });
      });
      form(
        'report',
        [
          ['userId', 'userid', 'text'],
          ['reason', 'reason', 'textarea']
        ],
        (body) => api('POST', '/reports', body)
      );
    }
    if (route === 'lobbies') {
      form(
        'create',
        [
          ['name', 'name', 'text'],
          ['capacity', 'capacity', 'number', 2]
        ],
        async (body) => {
          await api('POST', '/lobbies', { name: body.name, capacity: Number(body.capacity) });
          await render();
        }
      );
      list((await api('GET', '/lobbies')).items, (r, p) => {
        el('strong', r.name, p);
        el('p', String(r.capacity), p);
        action('join', p, () => api('POST', '/lobbies/' + r.id + '/join', {}));
        action('leave', p, () => api('POST', '/lobbies/' + r.id + '/leave', {}));
        action('close', p, async () => {
          await api('DELETE', '/lobbies/' + r.id);
          await render();
        });
      });
    }
    if (route === 'saves') {
      list((await api('GET', '/saves')).items, (s, p) => {
        el('strong', s.slot + ' · ' + s.revision, p);
        action('load', p, async () => {
          const r = await api('GET', '/saves/' + s.app_id + '/' + s.slot);
          el('pre', r.content, p);
        });
        action('delete', p, async () => {
          if (confirm(t('confirm'))) {
            await api('DELETE', '/saves/' + s.app_id + '/' + s.slot);
            await render();
          }
        });
      });
      form(
        'save',
        [
          ['slot', 'slot', 'text'],
          ['revision', 'revision', 'number', 0],
          ['content', 'content', 'textarea']
        ],
        async (body) => {
          const r = await api('PUT', '/saves/hypeconnect-demo/' + encodeURIComponent(body.slot), {
            revision: Number(body.revision),
            content: body.content
          });
          el('p', t('revision') + ': ' + r.revision);
        }
      );
    }
  }
  document.getElementById('language').onchange = (e) => {
    locale = e.target.value;
    render().catch(showError);
  };
  window.addEventListener('hashchange', () => render().catch(showError));
  render().catch(showError);
})();
