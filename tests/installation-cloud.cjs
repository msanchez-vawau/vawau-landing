// Pruebas aisladas: nunca contactan el Supabase de producción.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { createHash, randomUUID } = require('node:crypto');
const { createRequire } = require('node:module');
const root = path.resolve(__dirname, '..');
const modules = new Map();
function load(filename) {
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} }; modules.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const nativeRequire = createRequire(filename);
  new Function('require', 'module', 'exports', source)((id) => {
    if (id === 'server-only') return {};
    if (id.startsWith('@/')) return load(path.join(root, id.slice(2) + '.ts'));
    if (id.endsWith('.json')) return nativeRequire(id);
    if (id.startsWith('.')) return load(path.resolve(path.dirname(filename), id + '.ts'));
    return nativeRequire(id);
  }, module, module.exports);
  return module.exports;
}
process.env.SUPABASE_URL = 'https://test.invalid';
process.env.SUPABASE_SECRET_KEY = 'test-secret-only';
const { POST } = load(path.join(root, 'app/api/instalaciones/route.ts'));
const { TERMS_VERSION } = load(path.join(root, 'lib/installation-terms.ts'));
const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jq4kAAAAASUVORK5CYII=', 'base64');
const sha256 = b => createHash('sha256').update(b).digest('hex');
const fields = { fullName: 'Prueba', identification: '123456789', phone: '88888888', email: 'prueba@example.com', province: 'San José', canton: 'San José', district: 'Carmen', address: 'Dirección ficticia', brand: 'Electrolux', equipmentType: 'Lavadora', model: 'TEST', serial: 'TEST', store: 'Prueba', purchaseDate: '2026-01-01', onsite: 'Sí', prepared: 'Sí', source: 'qr', acceptTerms: 'on', acceptData: 'on', termsVersion: TERMS_VERSION, requestToken: randomUUID() };
const manifest = ['labelPhoto', 'invoice'].map(field => ({ field, name: field + '.png', type: 'image/png', size: bytes.length, sha256: sha256(bytes) }));
const stored = new Map(); const records = new Map(); let quota = true; let databaseDown = false;
global.fetch = async (url, options = {}) => {
  assert.ok(url.startsWith('https://test.invalid/'));
  assert.equal(options.headers.apikey, 'test-secret-only');
  if (url.includes('installation_upload_quota')) return Response.json(quota);
  if (url.includes('/object/upload/sign/')) return Response.json({ url: url.replace('https://test.invalid/storage/v1', '') + '?token=fake' });
  if (url.includes('/object/authenticated/')) { const key = url.split('/installation-documents/')[1]; return stored.has(key) ? new Response(stored.get(key)) : new Response('', { status: 404 }); }
  if (url.includes('/rpc/receive_installation')) {
    if (databaseDown) return Response.json({}, { status: 503 });
    const body = JSON.parse(options.body); const previous = records.get(body.p_token);
    if (previous && previous.hash !== body.p_hash) return Response.json({ message: 'installation_payload_conflict' }, { status: 400 });
    const record = previous || { hash: body.p_hash, reference: 'EI-' + String(records.size + 1).padStart(6, '0'), createdAt: new Date().toISOString() };
    records.set(body.p_token, record); return Response.json({ reference: record.reference, createdAt: record.createdAt });
  }
  throw Error('Unexpected mock endpoint');
};
async function api(body, origin = 'https://landing.test') {
  const response = await POST(new Request('https://landing.test/api/instalaciones', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) }));
  return { status: response.status, body: await response.json() };
}
async function prepare(overrides = {}) { return api({ action: 'prepare', fields, files: manifest, ...overrides }); }
function upload(prepared, content = bytes) { for (const item of prepared.body.uploads) stored.set(new URL(item.url).pathname.split('/installation-documents/')[1], content); }
(async () => {
  const locations = load(path.join(root, 'lib/installation-locations.ts'));
  const catalogue = require('../lib/costa-rica-locations.json');
  assert.equal(catalogue.length, 7);
  assert.equal(catalogue.flatMap(p => p.cantons).length, 84);
  const districts = catalogue.flatMap(p => p.cantons.flatMap(c => c.districts));
  assert.equal(districts.length, 494);
  assert.equal(new Set(districts.map(d => d.code)).size, 494);
  assert.ok(locations.getCantons('Puntarenas').includes('Monteverde'));
  assert.ok(locations.getDistricts('Limón', 'Guácimo').includes('Duacarí'));
  assert.ok(locations.isValidLocation('San José', 'Goicoechea', 'Guadalupe'));
  assert.ok(!locations.isValidLocation('Heredia', 'Goicoechea', 'Guadalupe'));
  assert.deepEqual(locations.getCantons(''), []);
  assert.deepEqual(locations.getDistricts('San José', ''), []);
  assert.equal((await prepare({ fields: { ...fields, canton: 'Goicoechea', district: 'Carmen' } })).status, 400);
  assert.equal((await prepare({ fields: { ...fields, district: '' } })).status, 400);
  assert.equal((await prepare({ fields: { ...fields, acceptData: '' } })).status, 400);
  assert.equal((await prepare({ fields: { ...fields, purchaseDate: '2999-01-01' } })).status, 400);
  assert.equal((await prepare({ files: manifest.slice(0, 1) })).status, 400);
  assert.equal((await prepare({ files: manifest.map(f => ({ ...f, size: 5242881 })) })).status, 400);
  assert.equal((await prepare({ files: manifest.map(f => ({ ...f, type: 'application/javascript' })) })).status, 400);
  assert.equal((await api({ action: 'prepare' }, 'https://foreign.test')).status, 403);
  assert.equal((await api({ action: 'finish', ticket: 'a.b' })).status, 400);
  assert.equal((await api({ action: 'finish', ticket: 'x'.repeat(70000) })).status, 413);
  quota = false; assert.equal((await prepare()).status, 429); quota = true;
  const prepared = await prepare(); assert.equal(prepared.status, 200);
  assert.ok(!JSON.stringify(prepared).includes('test-secret-only'));
  const finish = { action: 'finish', ticket: prepared.body.ticket };
  assert.equal((await api(finish)).status, 409); assert.equal(records.size, 0);
  upload(prepared, Buffer.from('wrong')); assert.equal((await api(finish)).status, 400); assert.equal(records.size, 0);
  upload(prepared); databaseDown = true; assert.equal((await api(finish)).status, 503); assert.equal(records.size, 0); databaseDown = false;
  const first = await api(finish); assert.equal(first.status, 201); assert.equal(first.body.reference, 'EI-000001');
  const retry = await api(finish); assert.deepEqual(retry, first); assert.equal(records.size, 1);
  const changed = await prepare({ fields: { ...fields, fullName: 'Otro' } }); upload(changed);
  assert.equal((await api({ action: 'finish', ticket: changed.body.ticket })).status, 409);
  const fake = await prepare({ fields: { ...fields, requestToken: randomUUID() }, files: manifest.map(f => ({ ...f, size: 5, sha256: sha256(Buffer.from('xxxxx')) })) }); upload(fake, Buffer.from('xxxxx'));
  assert.equal((await api({ action: 'finish', ticket: fake.body.ticket })).status, 400);
  delete process.env.SUPABASE_SECRET_KEY; assert.equal((await prepare()).status, 503);
  console.log('PASS: validación, límites, origen, firma, archivos faltantes/alterados, caída de base, confirmación e idempotencia.');
})().catch(error => { console.error(error); process.exitCode = 1; });
