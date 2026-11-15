const fs = require('node:fs');
const routes = JSON.parse(fs.readFileSync('packages/contracts/routes.json', 'utf8'));
const paths = {};
for (const route of routes) {
  const p = route.url.replace(/:([A-Za-z]+)/g, '{$1}'),
    params = [...p.matchAll(/\{([^}]+)\}/g)].map((m) => ({
      in: 'path',
      name: m[1],
      required: true,
      schema: { type: 'string', maxLength: 64 }
    }));
  (paths[p] ??= {})[route.method.toLowerCase()] = {
    operationId: route.method.toLowerCase() + route.url.replace(/[^a-zA-Z0-9]/g, '_'),
    security: route.authenticated ? [{ bearer: [] }] : [],
    parameters: params,
    ...(route.schema.body
      ? {
          requestBody: {
            required: true,
            content: { 'application/json': { schema: route.schema.body } }
          }
        }
      : {}),
    responses: {
      200: { description: 'Acknowledged result; endpoint-specific JSON' },
      400: { $ref: '#/components/responses/Error' },
      401: { $ref: '#/components/responses/Error' },
      403: { $ref: '#/components/responses/Error' },
      404: { $ref: '#/components/responses/Error' },
      409: { $ref: '#/components/responses/Error' },
      413: { $ref: '#/components/responses/Error' },
      429: { $ref: '#/components/responses/Error' },
      503: { $ref: '#/components/responses/Error' }
    }
  };
}
fs.writeFileSync(
  'packages/contracts/openapi.json',
  JSON.stringify(
    {
      openapi: '3.1.0',
      info: {
        title: 'HYPENET',
        version: '0.1.0-dev',
        description:
          'Independent network; local development only. Response contracts require additional refinement before release.'
      },
      servers: [{ url: 'http://127.0.0.1:3000/api/v1' }],
      paths,
      components: {
        securitySchemes: { bearer: { type: 'http', scheme: 'bearer' } },
        responses: {
          Error: {
            description: 'Request rejected',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['code', 'message', 'requestId'],
                  properties: {
                    code: { type: 'string' },
                    message: { type: 'string' },
                    requestId: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    null,
    2
  ) + '\n'
);
console.log('Generated OpenAPI for ' + routes.length + ' routes');
