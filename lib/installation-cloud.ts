import "server-only";
import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { validateInstallation, validateInstallationFields, ValidationError } from "./installation-validation";
import { MAX_FILE_BYTES, MAX_TOTAL_BYTES } from "./installation-options";
import { TERMS_VERSION } from "./installation-terms";

type Manifest = { field: string; name: string; type: string; size: number; sha256: string; path: string; slot: number };
type Ticket = { fields: Record<string, string>; requestToken: string; files: Manifest[]; expires: number; hash: string };
export class CloudError extends Error { constructor(message: string, public status = 503) { super(message); } }
const bucket = "installation-documents";
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new CloudError("El servicio de solicitudes aún no está habilitado. Contactanos al 4000-2829.");
  return { url, key };
}
async function cloud(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  return fetch(url + path, { ...init, headers: { apikey: key, "Content-Type": "application/json", ...init.headers }, cache: "no-store", signal: AbortSignal.timeout(20000) });
}
function sign(payload: string) { return createHmac("sha256", config().key).update("installation-ticket-v1:" + payload).digest("hex"); }
function encode(ticket: Ticket) { const payload = Buffer.from(JSON.stringify(ticket)).toString("base64url"); return payload + "." + sign(payload); }
function decode(value: unknown): Ticket {
  if (typeof value !== "string" || value.length > 50000) throw new ValidationError("El envío no es válido.");
  const [payload, signature, extra] = value.split(".");
  if (extra || !signature || !/^[a-f0-9]{64}$/.test(signature) || !timingSafeEqual(Buffer.from(sign(payload)), Buffer.from(signature))) throw new ValidationError("El envío no es válido. Reintentá desde el formulario.");
  const ticket = JSON.parse(Buffer.from(payload, "base64url").toString()) as Ticket;
  if (ticket.expires < Date.now()) throw new ValidationError("El tiempo para enviar venció. Volvé a solicitar el envío.");
  return ticket;
}
function toForm(fields: Record<string, string>, requestToken: string) {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  form.set("requestToken", requestToken); form.set("termsVersion", TERMS_VERSION);
  form.set("acceptTerms", "on"); form.set("acceptData", "on");
  return form;
}
export async function prepareInstallation(body: Record<string, unknown>, clientIp: string) {
  if (!body.fields || typeof body.fields !== "object" || Array.isArray(body.fields)) throw new ValidationError("Revisá los datos del formulario.");
  const form = new FormData();
  for (const [key, value] of Object.entries(body.fields)) {
    if (typeof value !== "string") throw new ValidationError("Revisá los datos del formulario.");
    form.set(key, value);
  }
  const { fields, requestToken } = validateInstallationFields(form);
  if (!Array.isArray(body.files) || body.files.length < 2 || body.files.length > 6) throw new ValidationError("Adjuntá la etiqueta y el comprobante de compra.");
  const counts: Record<string, number> = {};
  const folder = `${requestToken}/${randomUUID()}`;
  const files: Manifest[] = body.files.map((file: Record<string, unknown>) => {
    if (!file || typeof file !== "object") throw new ValidationError("Archivo no válido.");
    const { field, name, type, size, sha256 } = file;
    if (typeof field !== "string" || !["labelPhoto", "invoice", "equipmentPhoto", "sitePhotos"].includes(field) || typeof name !== "string" || !name.length || name.length > 250 || typeof type !== "string" || !["image/jpeg", "image/png", "image/webp", ...(field === "invoice" ? ["application/pdf"] : [])].includes(type) || typeof size !== "number" || !Number.isInteger(size) || size < 1 || size > MAX_FILE_BYTES || typeof sha256 !== "string" || !/^[a-f0-9]{64}$/.test(sha256)) throw new ValidationError("Revisá los adjuntos: JPG, PNG, WEBP o factura PDF de hasta 5 MB.");
    const slot = counts[field] = (counts[field] || 0) + 1;
    if (slot > (field === "sitePhotos" ? 3 : 1)) throw new ValidationError("Revisá la cantidad de archivos adjuntos.");
    return { field, name, type, size, sha256, slot, path: `${folder}/${field}-${slot}` };
  });
  if (!counts.labelPhoto || !counts.invoice || files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) throw new ValidationError("Adjuntá la etiqueta y la factura, con un máximo total de 20 MB.");
  const quota = await cloud("/rest/v1/rpc/installation_upload_quota", { method: "POST", body: JSON.stringify({ p_key: createHmac("sha256", config().key).update(clientIp).digest("hex") }) });
  if (!quota.ok) {
    const detail = await quota.json().catch(() => ({}));
    // Solo estado y código técnico; nunca claves, datos del formulario o texto del proveedor.
    const code = typeof detail.code === "string" && /^[A-Z0-9_]{1,32}$/.test(detail.code) ? detail.code : "unknown";
    console.error("installation_quota_failed", { status: quota.status, code });
    throw new CloudError(`No pudimos habilitar la carga. Contactanos al 4000-2829 e indicá el código CARGA-${quota.status}.`);
  }
  if (await quota.json() !== true) throw new CloudError("Alcanzaste el límite de intentos. Intentá de nuevo dentro de una hora.", 429);
  const hash = digest(JSON.stringify({ fields, terms: TERMS_VERSION, files: files.map(({ field, name, type, size, sha256, slot }) => ({ field, name, type, size, sha256, slot })) }));
  const uploads = [];
  for (const file of files) {
    const res = await cloud(`/storage/v1/object/upload/sign/${bucket}/${file.path}`, { method: "POST", body: "{}" });
    if (!res.ok) throw new CloudError("No pudimos preparar los archivos. Intentá nuevamente.");
    const data = await res.json();
    const signedUrl = new URL(config().url + "/storage/v1" + data.url);
    if (signedUrl.origin !== new URL(config().url).origin || !signedUrl.searchParams.has("token")) throw new CloudError("No pudimos preparar los archivos.");
    uploads.push({ url: signedUrl.href });
  }
  return { ticket: encode({ fields, requestToken, files, hash, expires: Date.now() + 2 * 60 * 60 * 1000 }), uploads };
}
export async function finishInstallation(value: unknown) {
  const ticket = decode(value);
  const form = toForm(ticket.fields, ticket.requestToken);
  for (const file of ticket.files) {
    const res = await cloud(`/storage/v1/object/authenticated/${bucket}/${file.path}`);
    if (!res.ok) throw new CloudError("Faltan archivos por cargar. Reintentá el envío.", 409);
    // Limitamos también la descarga; nunca confiar solo en el tamaño declarado.
    const reader = res.body!.getReader(); const chunks: Uint8Array[] = []; let size = 0;
    for (;;) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > MAX_FILE_BYTES) { await reader.cancel(); throw new ValidationError("Un archivo supera los 5 MB."); } chunks.push(value); }
    const bytes = Buffer.concat(chunks);
    if (size !== file.size || digest(bytes) !== file.sha256) throw new ValidationError("Un archivo no coincide con el original. Volvé a enviarlo.");
    form.append(file.field, new File([bytes], file.name, { type: file.type }));
  }
  await validateInstallation(form);
  const res = await cloud("/rest/v1/rpc/receive_installation", { method: "POST", body: JSON.stringify({ p_token: ticket.requestToken, p_hash: ticket.hash, p_fields: ticket.fields, p_terms: TERMS_VERSION, p_files: ticket.files }) });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    if (error.message === "installation_payload_conflict") throw new CloudError("Este envío ya fue registrado con otros datos. Recargá la página para iniciar otra solicitud.", 409);
    throw new CloudError("No pudimos confirmar el guardado. Reintentá el envío.");
  }
  return res.json();
}
