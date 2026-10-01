// Ejecutar contra un servidor LOCAL con almacenamiento exclusivo de prueba.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
const endpoint = "http://127.0.0.1:3000/api/instalaciones";
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=", "base64");
function data(token = randomUUID()) {
  const form = new FormData();
  const fields = { fullName: "PRUEBA AUTOMATIZADA", identification: "TEST-0000", phone: "88880000", email: "prueba@example.com", province: "San José", canton: "Goicoechea", district: "Guadalupe", address: "Dirección ficticia de prueba", brand: "Electrolux", equipmentType: "Lavadora", model: "TEST", serial: "TEST-001", store: "Comercio de prueba", purchaseDate: "2026-01-15", onsite: "No", prepared: "No estoy seguro", acceptTerms: "on", acceptData: "on", termsVersion: "v1-2026-09-30", requestToken: token, source: "qr" };
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  form.set("labelPhoto", new File([png], "test.png", { type: "image/png" }));
  form.set("invoice", new File([png], "invoice.png", { type: "image/png" }));
  return form;
}
async function send(form, status, headers = {}) {
  const response = await fetch(endpoint, { method: "POST", body: form, headers });
  const result = await response.json();
  assert.equal(response.status, status, JSON.stringify(result));
  return result;
}
const token = randomUUID();
const first = await send(data(token), 201);
assert.match(first.reference, /^EI-\d{6,}$/);
assert.deepEqual(await send(data(token), 201), first);
const changed = data(token); changed.set("model", "CORREGIDO"); await send(changed, 409);
for (const missing of ["invoice", "labelPhoto", "acceptTerms", "acceptData", "phone", "address"]) { const f = data(); f.delete(missing); await send(f, 400); }
for (const [key, value] of [["purchaseDate", "2099-01-01"], ["purchaseDate", "2026-02-30"], ["brand", "Otra"], ["phone", "--------"], ["mapsUrl", "javascript:alert(1)"], ["termsVersion", "antigua"], ["equipmentType", "Otro"]]) { const f = data(); f.set(key, value); await send(f, 400); }
const other = data(); other.set("equipmentType", "Otro"); other.set("otherEquipment", "Equipo especial"); other.set("brand", "Frigidaire"); await send(other, 201);
const fake = data(); fake.set("invoice", new File(["texto"], "falso.png", { type: "image/png" })); await send(fake, 400);
const oversized = data(); oversized.set("invoice", new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.png", { type: "image/png" })); await send(oversized, 400);
const photos = data(); for (let i = 0; i < 4; i++) photos.append("sitePhotos", new File([png], `test-${i}.png`, { type: "image/png" })); await send(photos, 400);
await send(data(), 403, { Origin: "https://untrusted.example" });
const concurrent = await Promise.all(Array.from({ length: 5 }, () => send(data(), 201)));
assert.equal(new Set(concurrent.map(r => r.reference)).size, 5);
console.log("PASS: envío, reintento idempotente, cambios, obligatorios, fechas, marcas, Otro, archivos, límites, origen y consecutivos concurrentes.");
