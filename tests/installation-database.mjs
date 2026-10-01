import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const db = new PGlite();
// Solo se simulan las tablas propias de Storage; las migraciones de VAWAU se ejecutan completas.
await db.exec(`create role anon; create role authenticated; create role service_role;
create schema storage;
create table storage.buckets(id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects(bucket_id text, name text);`);
for (let repeat = 0; repeat < 2; repeat++) {
  for (const name of ['20261001010000_installations.sql', '20261001020000_receive_installation.sql']) {
    await db.exec(await readFile(new URL('../supabase/migrations/' + name, import.meta.url), 'utf8'));
  }
}
const fields = { fullName: 'Prueba', identification: '1234', phone: '88888888', email: 'test@example.com', province: 'San José', canton: 'San José', district: 'Carmen', address: 'Prueba', brand: 'Electrolux', equipmentType: 'Lavadora', model: 'TEST', serial: 'TEST', store: 'Test', purchaseDate: '2026-01-01', onsite: 'Sí', prepared: 'Sí', source: 'qr' };
const token = randomUUID();
const files = ['labelPhoto', 'invoice'].map(field => ({ field, slot: 1, path: `${token}/test/${field}`, name: 'test.png', type: 'image/png', size: 20, sha256: 'a'.repeat(64) }));
const call = (hash = 'a'.repeat(64), selected = files, id = token) => db.query('select public.receive_installation($1,$2,$3,$4,$5) as receipt', [id, hash, JSON.stringify(fields), 'v1-2026-09-30', JSON.stringify(selected)]);
await assert.rejects(call(), /installation_missing_object/);
assert.equal((await db.query('select count(*)::integer as n from public.installation_requests')).rows[0].n, 0, 'Rollback when an object is missing');
for (const f of files) await db.query('insert into storage.objects values ($1,$2)', ['installation-documents', f.path]);
const receipt = (await call()).rows[0].receipt;
assert.match(receipt.reference, /^EI-\d{6,}$/);
assert.deepEqual((await call()).rows[0].receipt, receipt);
await assert.rejects(call('b'.repeat(64)), /installation_payload_conflict/);
assert.equal((await db.query('select count(*)::integer as n from public.installation_requests')).rows[0].n, 1);
assert.equal((await db.query('select count(*)::integer as n from public.installation_attachments')).rows[0].n, 2);
for (let i = 0; i < 11; i++) {
  const result = await db.query('select public.installation_upload_quota($1) as allowed', ['b'.repeat(64)]);
  assert.equal(result.rows[0].allowed, i < 10);
}
await db.exec('set role anon');
await assert.rejects(db.query('select * from public.installation_requests'), /permission denied/);
await assert.rejects(db.query('select public.installation_upload_quota($1)', ['b'.repeat(64)]), /permission denied/);
await assert.rejects(call(), /permission denied/);
await db.exec('reset role; set role service_role');
assert.deepEqual((await call()).rows[0].receipt, receipt);
await db.close();
console.log('PASS: migraciones reejecutables, transacción/rollback, idempotencia, consecutivo, cuotas y permisos privados en PostgreSQL local.');
