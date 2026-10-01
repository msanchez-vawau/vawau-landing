import "server-only";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import type { validateInstallation } from "./installation-validation";
import { TERMS_VERSION } from "./installation-terms";

export class StorageConflict extends Error {}
export class StorageUnavailable extends Error {}
type Submission = Awaited<ReturnType<typeof validateInstallation>>;
type Receipt = { reference: string; createdAt: string };
function isExists(error: unknown) { return (error as NodeJS.ErrnoException)?.code === "EEXIST"; }

// Adaptador de disco persistente para una instalación Node. Sustituible por CORE/SQL.
// La reserva atómica de directorios evita consecutivos duplicados entre procesos.
export async function saveInstallation(input: Submission): Promise<Receipt> {
  const configured = process.env.INSTALLATION_STORAGE_DIR;
  if (!configured || !path.isAbsolute(configured)) throw new StorageUnavailable("El servicio de solicitudes aún no está habilitado. Contactanos al 4000-2829.");
  const root = path.resolve(configured);
  const publicRoot = path.resolve(process.cwd(), "public");
  if (root === publicRoot || root.startsWith(publicRoot + path.sep)) throw new StorageUnavailable("No se pudo guardar la solicitud. Contactanos al 4000-2829.");
  const requests = path.join(root, "requests");
  const tokens = path.join(root, "tokens");
  await mkdir(requests, { recursive: true });
  await mkdir(tokens, { recursive: true });
  const hash = createHash("sha256").update(JSON.stringify(input.fields)).update(TERMS_VERSION);
  for (const a of input.attachments) hash.update(a.field).update(a.name).update(a.type).update(a.bytes);
  const digest = hash.digest("hex");
  const tokenDir = path.join(tokens, input.requestToken);
  try { await mkdir(tokenDir); }
  catch (error) {
    if (!isExists(error)) throw error;
    try {
      const existing = JSON.parse(await readFile(path.join(tokenDir, "receipt.json"), "utf8"));
      if (existing.digest !== digest) throw new StorageConflict("Este envío ya fue recibido con otros datos. Conservá tu comprobante y contactanos si necesitás corregirlo.");
      return { reference: existing.reference, createdAt: existing.createdAt };
    } catch (readError) {
      if (readError instanceof StorageConflict) throw readError;
      throw new StorageUnavailable("El envío anterior está en proceso de verificación. Reintentá en unos momentos; si persiste, contactanos al 4000-2829.");
    }
  }
  const names = await readdir(requests);
  let sequence = names.reduce((highest, name) => /^EI-\d{6,}$/.test(name) ? Math.max(highest, Number(name.slice(3))) : highest, 0) + 1;
  let reference: string;
  let folder: string;
  for (;;) {
    reference = `EI-${String(sequence).padStart(6, "0")}`;
    folder = path.join(requests, reference);
    try { await mkdir(folder); break; } catch (error) { if (!isExists(error)) throw error; sequence++; }
  }
  const createdAt = new Date().toISOString();
  // Permite reconciliar envíos interrumpidos sin emitir una confirmación falsa.
  await writeFile(path.join(tokenDir, "reservation.json"), JSON.stringify({ reference, digest, createdAt }), { flag: "wx" });
  const attachments = [];
  for (let index = 0; index < input.attachments.length; index++) {
    const item = input.attachments[index];
    const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" }[item.type];
    const filename = `${item.field}-${index + 1}.${extension}`;
    await writeFile(path.join(folder, filename), item.bytes, { flag: "wx", mode: 0o600 });
    attachments.push({ field: item.field, originalName: item.name, filename, type: item.type, size: item.bytes.length });
  }
  const record = { schemaVersion: 1, reference, createdAt, updatedAt: createdAt, status: "Nueva", customer: input.fields, attachments, consent: { termsAccepted: true, dataAccepted: true, termsVersion: TERMS_VERSION, acceptedAt: createdAt }, assignedTechnician: null, assignedCSA: null, scheduledAt: null, installedAt: null, internalObservations: [], requestToken: input.requestToken };
  await writeFile(path.join(folder, "request.tmp"), JSON.stringify(record, null, 2), { flag: "wx", mode: 0o600 });
  await rename(path.join(folder, "request.tmp"), path.join(folder, "request.json"));
  await writeFile(path.join(tokenDir, "receipt.tmp"), JSON.stringify({ reference, createdAt, digest }), { flag: "wx", mode: 0o600 });
  await rename(path.join(tokenDir, "receipt.tmp"), path.join(tokenDir, "receipt.json"));
  return { reference, createdAt };
}
