import Fastify, { FastifyRequest, HTTPMethods } from 'fastify';
import websocket from '@fastify/websocket';
import { randomUUID } from 'node:crypto';
import { Database, Row } from './database.js';
import { token, digest, passwordHash, passwordMatches } from './auth.js';
type Mail = { email: string; purpose: 'verify' | 'reset'; token: string };
type Options = {
  db: Database;
  sendMail?: (mail: Mail) => Promise<void>;
  origins: string[];
  authLimit?: number;
};
type Context = { actor: Row; body: Row; params: Row; db: Database; req: FastifyRequest };
const text = (max = 64) => ({ type: 'string', minLength: 1, maxLength: max });
const id = text(64),
  password = { type: 'string', minLength: 12, maxLength: 128 },
  email = { type: 'string', maxLength: 254, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' };
function failure(statusCode: number, code: string): never {
  throw Object.assign(new Error(code), { statusCode });
}
export async function createApp(options: Options) {
  const app = Fastify({
    logger: false,
    bodyLimit: 1100000,
    ajv: { customOptions: { removeAdditional: false, coerceTypes: false } }
  });
  await app.register(websocket, { options: { maxPayload: 4096 } });
  const db = options.db,
    limits = new Map<string, { count: number; until: number }>(),
    routes: Row[] = [];
  const dummy = await passwordHash(token());
  app.addHook('onRequest', async (req, reply) => {
    reply.header('Cache-Control', 'no-store').header('X-Content-Type-Options', 'nosniff');
    const origin = req.headers.origin;
    if (origin && !options.origins.includes(origin)) failure(403, 'ORIGIN_DENIED');
    if (origin) reply.header('Access-Control-Allow-Origin', origin).header('Vary', 'Origin');
    if (req.method === 'OPTIONS') {
      reply
        .header('Access-Control-Allow-Headers', 'Authorization,Content-Type')
        .header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
      return reply.code(204).send();
    }
    const now = Date.now();
    for (const [k, v] of limits) if (v.until < now) limits.delete(k);
    const auth = req.url.startsWith('/api/v1/auth/'),
      key = req.ip + (auth ? ':auth' : ':api'),
      max = auth ? (options.authLimit ?? 20) : 240;
    const entry = limits.get(key) ?? { count: 0, until: now + 60000 };
    entry.count++;
    limits.set(key, entry);
    if (entry.count > max) failure(429, 'RATE_LIMITED');
  });
  app.setErrorHandler((err, req, reply) => {
    const e = err as Error & { statusCode?: number; validation?: unknown; code?: string };
    let status = e.validation ? 400 : (e.statusCode ?? 500);
    if (e.code === '23505') status = 409;
    if (e.code === '23503') status = 404;
    const code = e.validation
      ? 'INVALID_INPUT'
      : e.code === '23505'
        ? 'CONFLICT'
        : e.code === '23503'
          ? 'NOT_FOUND'
          : /^[A-Z_]+$/.test(e.message)
            ? e.message
            : 'REQUEST_REJECTED';
    reply
      .code(status)
      .send({
        code: status >= 500 ? 'SERVICE_UNAVAILABLE' : code,
        message: status >= 500 ? 'Request failed' : 'Request rejected',
        requestId: req.id
      });
  });
  async function actor(req: FastifyRequest) {
    const value = req.headers.authorization;
    if (!value?.startsWith('Bearer ')) failure(401, 'UNAUTHENTICATED');
    const rows = await db.query(
      'SELECT u.id,u.role,s.id AS session_id FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.hash=$1 AND s.expires_at>now() AND u.verified=true',
      [digest(value.slice(7))]
    );
    return rows.rows[0] ?? failure(401, 'UNAUTHENTICATED');
  }
  async function blocked(a: string, b: string, tx = db) {
    return (
      (
        await tx.query(
          'SELECT 1 FROM blocks WHERE (actor=$1 AND target=$2) OR (actor=$2 AND target=$1)',
          [a, b]
        )
      ).rows.length > 0
    );
  }
  async function member(conversation: string, user: string, tx = db) {
    const members = (
      await tx.query('SELECT user_id FROM conversation_members WHERE conversation_id=$1', [
        conversation
      ])
    ).rows;
    if (!members.some((m) => m.user_id === user)) failure(404, 'NOT_FOUND');
    for (const m of members)
      if (await blocked(user, m.user_id, tx)) failure(403, 'CONTACT_BLOCKED');
  }
  function route(
    method: HTTPMethods,
    url: string,
    fields: Row | null,
    handler: (ctx: Context) => Promise<unknown>,
    publicRoute = false
  ) {
    const schema = fields
      ? {
          body: {
            type: 'object',
            additionalProperties: false,
            required: Object.keys(fields),
            properties: fields
          }
        }
      : {};
    routes.push({ method, url, schema, authenticated: !publicRoute });
    app.route({
      method,
      url: '/api/v1' + url,
      schema,
      handler: async (req) =>
        handler({
          actor: publicRoute ? {} : await actor(req),
          body: (req.body ?? {}) as Row,
          params: (req.params ?? {}) as Row,
          db,
          req
        })
    });
  }
  app.get('/health/live', async () => ({ live: true }));
  app.get('/health/ready', async () => {
    await db.query('SELECT 1');
    return { ready: true };
  });
  route(
    'GET',
    '/status',
    null,
    async () => ({ service: 'HYPENET', apiVersion: 1, version: '0.1.0-dev' }),
    true
  );
  route(
    'POST',
    '/auth/register',
    { email, password, displayName: text() },
    async ({ body }) => {
      if (!options.sendMail) failure(503, 'MAIL_NOT_CONFIGURED');
      const normalized = body.email.toLowerCase(),
        encoded = await passwordHash(body.password),
        uid = randomUUID(),
        raw = token();
      const created = await db.transaction(async (tx) => {
        const existing = await tx.query('SELECT 1 FROM users WHERE email=$1', [normalized]);
        if (existing.rows.length) return false;
        await tx.query('INSERT INTO users(id,email,password_hash) VALUES($1,$2,$3)', [
          uid,
          normalized,
          encoded
        ]);
        await tx.query('INSERT INTO profiles(user_id,display_name) VALUES($1,$2)', [
          uid,
          body.displayName
        ]);
        await tx.query("INSERT INTO verification_tokens VALUES($1,$2,now()+interval '1 hour')", [
          digest(raw),
          uid
        ]);
        return true;
      });
      if (created) await options.sendMail({ email: normalized, purpose: 'verify', token: raw });
      return { accepted: true };
    },
    true
  );
  route(
    'POST',
    '/auth/verify',
    { token: text(64) },
    async ({ body }) =>
      db.transaction(async (tx) => {
        const r = await tx.query(
          'DELETE FROM verification_tokens WHERE hash=$1 AND expires_at>now() RETURNING user_id',
          [digest(body.token)]
        );
        if (!r.rows[0]) failure(400, 'INVALID_TOKEN');
        await tx.query('UPDATE users SET verified=true WHERE id=$1', [r.rows[0].user_id]);
        return { verified: true };
      }),
    true
  );
  route('POST', '/auth/verify/request', {email}, async ({body}) => {
    if (!options.sendMail) failure(503, 'MAIL_NOT_CONFIGURED');
    const normalized = body.email.toLowerCase();
    const user = (await db.query('SELECT id FROM users WHERE email=$1 AND verified=false', [normalized])).rows[0];
    if (user) {
      const raw = token();
      await db.transaction(async tx => {
        await tx.query('DELETE FROM verification_tokens WHERE user_id=$1', [user.id]);
        await tx.query("INSERT INTO verification_tokens VALUES($1,$2,now()+interval '1 hour')", [digest(raw),user.id]);
      });
      await options.sendMail({email:normalized,purpose:'verify',token:raw});
    }
    return {accepted:true};
  }, true);
  route(
    'POST',
    '/auth/login',
    { email, password },
    async ({ body }) => {
      const u = (await db.query('SELECT * FROM users WHERE email=$1', [body.email.toLowerCase()]))
        .rows[0];
      const valid = await passwordMatches(body.password, u?.password_hash ?? dummy);
      if (!valid || !u?.verified) failure(401, 'INVALID_CREDENTIALS');
      const raw = token();
      await db.query(
        "INSERT INTO sessions(id,hash,user_id,expires_at) VALUES($1,$2,$3,now()+interval '1 hour')",
        [randomUUID(), digest(raw), u.id]
      );
      return { token: raw, expiresIn: 3600 };
    },
    true
  );
  route('POST', '/auth/logout', {}, async ({ actor }) => {
    await db.query('DELETE FROM sessions WHERE id=$1', [actor.session_id]);
    return { revoked: true };
  });
  route(
    'POST',
    '/auth/reset/request',
    { email },
    async ({ body }) => {
      if (!options.sendMail) failure(503, 'MAIL_NOT_CONFIGURED');
      const u = (await db.query('SELECT id FROM users WHERE email=$1', [body.email.toLowerCase()]))
        .rows[0];
      if (u) {
        const raw = token();
        await db.query(
          "INSERT INTO password_reset_tokens VALUES($1,$2,now()+interval '15 minutes')",
          [digest(raw), u.id]
        );
        await options.sendMail({ email: body.email.toLowerCase(), purpose: 'reset', token: raw });
      }
      return { accepted: true };
    },
    true
  );
  route(
    'POST',
    '/auth/reset/confirm',
    { token: text(64), password },
    async ({ body }) => {
      const encoded = await passwordHash(body.password);
      return db.transaction(async (tx) => {
        const r = await tx.query(
          'DELETE FROM password_reset_tokens WHERE hash=$1 AND expires_at>now() RETURNING user_id',
          [digest(body.token)]
        );
        if (!r.rows[0]) failure(400, 'INVALID_TOKEN');
        const uid = r.rows[0].user_id;
        await tx.query('UPDATE users SET password_hash=$1 WHERE id=$2', [encoded, uid]);
        await tx.query('DELETE FROM sessions WHERE user_id=$1', [uid]);
        await tx.query('DELETE FROM password_reset_tokens WHERE user_id=$1', [uid]);
        return { reset: true };
      });
    },
    true
  );
  route(
    'GET',
    '/me',
    null,
    async ({ actor }) =>
      (
        await db.query(
          'SELECT user_id,display_name,presence_visible FROM profiles WHERE user_id=$1',
          [actor.id]
        )
      ).rows[0]
  );
  route(
    'PATCH',
    '/me',
    { displayName: text(), presenceVisible: { type: 'boolean' } },
    async ({ actor, body }) => {
      await db.query('UPDATE profiles SET display_name=$1,presence_visible=$2 WHERE user_id=$3', [
        body.displayName,
        body.presenceVisible,
        actor.id
      ]);
      return { updated: true };
    }
  );
  route('DELETE', '/me', null, async ({ actor }) =>
    db.transaction(async (tx) => {
      await tx.query("UPDATE messages SET body='[deleted]' WHERE sender=$1", [actor.id]);
      await tx.query('DELETE FROM users WHERE id=$1', [actor.id]);
      return { deleted: true };
    })
  );
  route('GET', '/me/sessions', null, async ({ actor }) => ({
    items: (
      await db.query(
        'SELECT id,created_at,expires_at FROM sessions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50',
        [actor.id]
      )
    ).rows
  }));
  route('DELETE', '/me/sessions/:id', null, async ({ actor, params }) => {
    const r = await db.query('DELETE FROM sessions WHERE id=$1 AND user_id=$2 RETURNING id', [
      params.id,
      actor.id
    ]);
    if (!r.rows.length) failure(404, 'NOT_FOUND');
    return { revoked: true };
  });
  route('GET', '/friends', null, async ({ actor }) => ({
    items: (
      await db.query(
        'SELECT p.user_id,p.display_name FROM friendships f JOIN profiles p ON p.user_id=CASE WHEN f.a=$1 THEN f.b ELSE f.a END WHERE (f.a=$1 OR f.b=$1) AND NOT EXISTS(SELECT 1 FROM blocks WHERE (actor=$1 AND target=p.user_id) OR (target=$1 AND actor=p.user_id)) LIMIT 50',
        [actor.id]
      )
    ).rows
  }));
  route('GET', '/friend-requests', null, async ({ actor }) => ({
    items: (await db.query('SELECT * FROM friend_requests WHERE recipient=$1 LIMIT 50', [actor.id]))
      .rows
  }));
  route('POST', '/friend-requests', { userId: id }, async ({ actor, body }) => {
    if (actor.id === body.userId || (await blocked(actor.id, body.userId)))
      failure(403, 'CONTACT_DENIED');
    const r = await db.query(
      'INSERT INTO friend_requests VALUES($1,$2,$3) ON CONFLICT(sender,recipient) DO UPDATE SET sender=EXCLUDED.sender RETURNING id',
      [randomUUID(), actor.id, body.userId]
    );
    return r.rows[0];
  });
  route(
    'POST',
    '/friend-requests/:id/respond',
    { accept: { type: 'boolean' } },
    async ({ actor, params, body }) =>
      db.transaction(async (tx) => {
        const r = await tx.query(
          'DELETE FROM friend_requests WHERE id=$1 AND recipient=$2 RETURNING sender',
          [params.id, actor.id]
        );
        if (!r.rows[0]) failure(404, 'NOT_FOUND');
        if (await blocked(actor.id, r.rows[0].sender, tx)) failure(403, 'CONTACT_BLOCKED');
        if (body.accept) {
          const pair = [actor.id, r.rows[0].sender].sort();
          await tx.query('INSERT INTO friendships VALUES($1,$2) ON CONFLICT DO NOTHING', pair);
        }
        return { accepted: body.accept };
      })
  );
  route('DELETE', '/friends/:id', null, async ({ actor, params }) => {
    await db.query('DELETE FROM friendships WHERE a=$1 AND b=$2', [actor.id, params.id].sort());
    return { removed: true };
  });
  route('PUT', '/blocks/:id', {}, async ({ actor, params }) => {
    if (actor.id === params.id) failure(400, 'INVALID_TARGET');
    await db.transaction(async (tx) => {
      await tx.query('INSERT INTO blocks VALUES($1,$2) ON CONFLICT DO NOTHING', [
        actor.id,
        params.id
      ]);
      await tx.query('DELETE FROM friendships WHERE a=$1 AND b=$2', [actor.id, params.id].sort());
      await tx.query(
        'DELETE FROM friend_requests WHERE (sender=$1 AND recipient=$2) OR (sender=$2 AND recipient=$1)',
        [actor.id, params.id]
      );
    });
    return { blocked: true };
  });
  route('DELETE', '/blocks/:id', null, async ({ actor, params }) => {
    await db.query('DELETE FROM blocks WHERE actor=$1 AND target=$2', [actor.id, params.id]);
    return { removed: true };
  });
  route('POST', '/conversations', { userId: id }, async ({ actor, body }) =>
    db.transaction(async (tx) => {
      if (actor.id === body.userId || (await blocked(actor.id, body.userId, tx)))
        failure(403, 'CONTACT_DENIED');
      const pair = [actor.id, body.userId].sort(),
        friends = await tx.query('SELECT 1 FROM friendships WHERE a=$1 AND b=$2', pair);
      if (!friends.rows.length) failure(403, 'FRIENDSHIP_REQUIRED');
      const r = await tx.query(
        'INSERT INTO conversations(id,pair_key) VALUES($1,$2) ON CONFLICT(pair_key) DO UPDATE SET pair_key=EXCLUDED.pair_key RETURNING id',
        [randomUUID(), pair.join(':')]
      );
      for (const uid of pair)
        await tx.query('INSERT INTO conversation_members VALUES($1,$2) ON CONFLICT DO NOTHING', [
          r.rows[0].id,
          uid
        ]);
      return r.rows[0];
    })
  );
  route('GET', '/conversations', null, async ({ actor }) => ({
    items: (
      await db.query(
        'SELECT conversation_id AS id FROM conversation_members WHERE user_id=$1 LIMIT 50',
        [actor.id]
      )
    ).rows
  }));
  route('GET', '/conversations/:id/messages', null, async ({ actor, params }) => {
    await member(params.id, actor.id);
    return {
      items: (
        await db.query(
          'SELECT id,sender,body,created_at FROM messages WHERE conversation_id=$1 ORDER BY created_at DESC,id DESC LIMIT 50',
          [params.id]
        )
      ).rows
    };
  });
  route(
    'POST',
    '/conversations/:id/messages',
    { body: text(2048) },
    async ({ actor, params, body }) => {
      await member(params.id, actor.id);
      if (Buffer.byteLength(body.body) > 2048) failure(413, 'MESSAGE_TOO_LARGE');
      const r = await db.query(
        'INSERT INTO messages(id,conversation_id,sender,body) VALUES($1,$2,$3,$4) RETURNING id,created_at',
        [randomUUID(), params.id, actor.id, body.body]
      );
      return r.rows[0];
    }
  );
  route('POST', '/reports', { userId: id, reason: text(1000) }, async ({ actor, body }) => {
    const rid = randomUUID();
    await db.query('INSERT INTO reports(id,reporter,target,reason) VALUES($1,$2,$3,$4)', [
      rid,
      actor.id,
      body.userId,
      body.reason
    ]);
    return { id: rid };
  });
  route('GET', '/moderation/reports', null, async ({ actor }) => {
    if (actor.role !== 'moderator') failure(403, 'FORBIDDEN');
    return {
      items: (await db.query('SELECT * FROM reports ORDER BY created_at DESC LIMIT 50')).rows
    };
  });
  route('GET', '/lobbies', null, async ({ actor }) => ({
    items: (
      await db.query(
        'SELECT l.id,l.name,l.capacity FROM lobbies l WHERE NOT EXISTS(SELECT 1 FROM blocks WHERE (actor=$1 AND target=l.owner) OR (target=$1 AND actor=l.owner)) LIMIT 50',
        [actor.id]
      )
    ).rows
  }));
  route(
    'POST',
    '/lobbies',
    { name: text(), capacity: { type: 'integer', minimum: 2, maximum: 8 } },
    async ({ actor, body }) =>
      db.transaction(async (tx) => {
        const lid = randomUUID();
        await tx.query('INSERT INTO lobbies(id,owner,name,capacity) VALUES($1,$2,$3,$4)', [
          lid,
          actor.id,
          body.name,
          body.capacity
        ]);
        await tx.query('INSERT INTO lobby_members VALUES($1,$2)', [lid, actor.id]);
        return { id: lid };
      })
  );
  route('POST', '/lobbies/:id/join', {}, async ({ actor, params }) =>
    db.transaction(async (tx) => {
      const lobby = (await tx.query('SELECT * FROM lobbies WHERE id=$1 FOR UPDATE', [params.id]))
        .rows[0];
      if (!lobby) failure(404, 'NOT_FOUND');
      const members = (
        await tx.query('SELECT user_id FROM lobby_members WHERE lobby_id=$1', [params.id])
      ).rows;
      for (const m of members)
        if (await blocked(actor.id, m.user_id, tx)) failure(403, 'CONTACT_BLOCKED');
      if (members.some((m) => m.user_id === actor.id)) return { joined: true };
      if (members.length >= lobby.capacity) failure(409, 'LOBBY_FULL');
      await tx.query('INSERT INTO lobby_members VALUES($1,$2)', [params.id, actor.id]);
      return { joined: true };
    })
  );
  route('POST', '/lobbies/:id/leave', {}, async ({ actor, params }) => {
    await db.query('DELETE FROM lobby_members WHERE lobby_id=$1 AND user_id=$2', [
      params.id,
      actor.id
    ]);
    return { left: true };
  });
  route('DELETE', '/lobbies/:id', null, async ({ actor, params }) => {
    const r = await db.query('DELETE FROM lobbies WHERE id=$1 AND owner=$2 RETURNING id', [
      params.id,
      actor.id
    ]);
    if (!r.rows.length) failure(404, 'NOT_FOUND');
    return { closed: true };
  });
  route('GET', '/saves', null, async ({ actor }) => ({
    items: (
      await db.query(
        'SELECT app_id,slot,revision,updated_at FROM saves WHERE user_id=$1 LIMIT 50',
        [actor.id]
      )
    ).rows
  }));
  route('GET', '/saves/:appId/:slot', null, async ({ actor, params }) => {
    const r = await db.query(
      'SELECT revision,content FROM saves WHERE user_id=$1 AND app_id=$2 AND slot=$3',
      [actor.id, params.appId, params.slot]
    );
    return r.rows[0] ?? failure(404, 'NOT_FOUND');
  });
  route(
    'PUT',
    '/saves/:appId/:slot',
    { revision: { type: 'integer', minimum: 0 }, content: { type: 'string', maxLength: 1048576 } },
    async ({ actor, params, body }) =>
      db.transaction(async (tx) => {
        if (params.appId !== 'hypeconnect-demo' || !/^[a-zA-Z0-9_-]{1,32}$/.test(params.slot))
          failure(400, 'INVALID_APP_SLOT');
        const bytes = Buffer.byteLength(body.content);
        if (bytes > 1048576) failure(413, 'SAVE_TOO_LARGE');
        await tx.query('SELECT id FROM users WHERE id=$1 FOR UPDATE', [actor.id]);
        const old = (
          await tx.query(
            'SELECT revision,octet_length(content) AS bytes FROM saves WHERE user_id=$1 AND app_id=$2 AND slot=$3',
            [actor.id, params.appId, params.slot]
          )
        ).rows[0];
        if ((old?.revision ?? 0) !== body.revision) failure(409, 'REVISION_CONFLICT');
        const usage = (
          await tx.query(
            'SELECT coalesce(sum(octet_length(content)),0) AS bytes,count(*) AS slots FROM saves WHERE user_id=$1',
            [actor.id]
          )
        ).rows[0];
        if (
          Number(usage.bytes) - (old?.bytes ?? 0) + bytes > 10485760 ||
          (!old && Number(usage.slots) >= 10)
        )
          failure(413, 'QUOTA_EXCEEDED');
        const revision = body.revision + 1;
        await tx.query(
          'INSERT INTO saves(user_id,app_id,slot,revision,content) VALUES($1,$2,$3,$4,$5) ON CONFLICT(user_id,app_id,slot) DO UPDATE SET revision=EXCLUDED.revision,content=EXCLUDED.content,updated_at=now()',
          [actor.id, params.appId, params.slot, revision, body.content]
        );
        return { revision };
      })
  );
  route('DELETE', '/saves/:appId/:slot', null, async ({ actor, params }) => {
    await db.query('DELETE FROM saves WHERE user_id=$1 AND app_id=$2 AND slot=$3', [
      actor.id,
      params.appId,
      params.slot
    ]);
    return { deleted: true };
  });
  route(
    'GET',
    '/catalog',
    null,
    async () => ({
      items: (
        await db.query(
          "SELECT id,name,version,source_url,license,sha256 FROM catalog_items WHERE rights_status='approved' AND evidence_id IS NOT NULL LIMIT 50"
        )
      ).rows
    }),
    true
  );
  route(
    'GET',
    '/catalog/:id',
    null,
    async ({ params }) => {
      const r = await db.query(
        "SELECT id,name,version,source_url,license,sha256 FROM catalog_items WHERE id=$1 AND rights_status='approved' AND evidence_id IS NOT NULL",
        [params.id]
      );
      return r.rows[0] ?? failure(404, 'NOT_FOUND');
    },
    true
  );
  const sockets = new Set<{ socket: any; user: string; session: string; lobby: string | null }>();
  app.get(
    '/api/v1/events',
    {
      websocket: true,
      preValidation: async (req) => {
        await actor(req);
      }
    },
    (socket, req) => {
      const record = { socket, user: '', session: '', lobby: null as string | null };
      sockets.add(record);
      let chain = Promise.resolve(),
        count = 0;
      const ready = actor(req).then((u) => {
        record.user = u.id;
        record.session = u.session_id;
      });
      socket.on('close', () => sockets.delete(record));
      socket.on('message', (raw: Buffer) => {
        chain = chain
          .then(async () => {
            await ready;
            const u = await actor(req);
            if (++count > 120) failure(429, 'RATE_LIMITED');
            const msg = JSON.parse(raw.toString());
            if (!msg || typeof msg.lobbyId !== 'string') failure(400, 'INVALID_EVENT');
            const membership = await db.query(
              'SELECT 1 FROM lobby_members WHERE lobby_id=$1 AND user_id=$2',
              [msg.lobbyId, u.id]
            );
            if (!membership.rows.length) failure(403, 'NOT_MEMBER');
            if (msg.type === 'subscribe') {
              record.lobby = msg.lobbyId;
              socket.send(JSON.stringify({ type: 'subscribed', lobbyId: record.lobby }));
              return;
            }
            if (
              msg.type !== 'demo.move' ||
              !Number.isInteger(msg.x) ||
              !Number.isInteger(msg.y) ||
              Math.abs(msg.x) > 100 ||
              Math.abs(msg.y) > 100
            )
              failure(400, 'INVALID_EVENT');
            const event = {
              eventId: randomUUID(),
              version: 1,
              type: 'demo.move',
              timestamp: new Date().toISOString(),
              payload: { userId: u.id, lobbyId: msg.lobbyId, x: msg.x, y: msg.y }
            };
            for (const peer of sockets) {
              if (peer.lobby !== msg.lobbyId || peer.socket.bufferedAmount > 65536) continue;
              const active = await db.query(
                'SELECT 1 FROM sessions s JOIN lobby_members m ON m.user_id=s.user_id WHERE s.id=$1 AND s.expires_at>now() AND m.lobby_id=$2',
                [peer.session, msg.lobbyId]
              );
              if (active.rows.length && !(await blocked(u.id, peer.user)))
                peer.socket.send(JSON.stringify(event));
            }
          })
          .catch(() => socket.close(1008, 'Request rejected'));
      });
      const timer = setInterval(() => {
        count = 0;
        void actor(req).catch(() => socket.close(1008, 'Session expired'));
        socket.ping();
      }, 30000);
      socket.on('close', () => clearInterval(timer));
    }
  );
  app.addHook('onClose', async () => {
    for (const peer of sockets) peer.socket.close();
  });
  return { app, routes };
}
