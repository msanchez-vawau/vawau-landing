import { purchaseDateError } from "./installation-promotion";
import { brands, equipmentTypes, provinces, preparationOptions, MAX_FILE_BYTES, MAX_TOTAL_BYTES } from "./installation-options";
import { TERMS_VERSION } from "./installation-terms";
import { isValidLocation } from "./installation-locations";

export class ValidationError extends Error {}
export type Attachment = { field: string; name: string; type: string; bytes: Buffer };
export function validateInstallationFields(form: FormData) {
  const fields: Record<string, string> = {};
  const required = ["fullName", "identification", "phone", "email", "province", "canton", "district", "address", "brand", "equipmentType", "model", "serial", "store", "purchaseDate", "onsite", "prepared"];
  const optional = ["alternatePhone", "otherPhone", "addressReference", "mapsUrl", "otherEquipment", "invoiceNumber", "observations", "source"];
  for (const name of [...required, ...optional]) {
    const value = form.get(name);
    if (value !== null && typeof value !== "string") throw new ValidationError("Revisá los datos del formulario.");
    fields[name] = (value ?? "").trim();
    if (required.includes(name) && !fields[name]) throw new ValidationError("Completá todos los campos obligatorios.");
    if (fields[name].length > (["address", "observations"].includes(name) ? 2000 : 250)) throw new ValidationError("Uno de los campos supera el límite de caracteres.");
  }
  for (const [name, options] of Object.entries({ brand: brands, equipmentType: equipmentTypes, province: provinces, onsite: ["Sí", "No"], prepared: preparationOptions })) {
    if (!options.includes(fields[name])) throw new ValidationError("Seleccioná una opción válida en " + name + ".");
  }
  if (fields.equipmentType === "Otro" && !fields.otherEquipment) throw new ValidationError("Especificá el tipo de equipo.");
  if (!isValidLocation(fields.province, fields.canton, fields.district)) throw new ValidationError("Seleccioná un cantón y un distrito correspondientes a la provincia indicada.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) throw new ValidationError("Revisá el correo electrónico.");
  for (const key of ["phone", "alternatePhone", "otherPhone"]) {
    if (fields[key] && (!/^[+\d ()-]{8,25}$/.test(fields[key]) || fields[key].replace(/\D/g, "").length < 8)) throw new ValidationError("Revisá los números de teléfono.");
  }
  const dateError = purchaseDateError(fields.purchaseDate);
  if (dateError) throw new ValidationError(dateError);
  if (fields.mapsUrl) {
    try { const url = new URL(fields.mapsUrl); if (url.protocol !== "https:" || !(["maps.app.goo.gl", "goo.gl", "maps.google.com", "www.google.com", "google.com", "www.google.co.cr", "maps.google.co.cr"].includes(url.hostname))) throw new Error(); }
    catch { throw new ValidationError("Ingresá un enlace HTTPS válido de Google Maps."); }
  }
  if (form.get("acceptTerms") !== "on" || form.get("acceptData") !== "on") throw new ValidationError("Debés aceptar las condiciones y autorizar el tratamiento de los datos.");
  if (form.get("termsVersion") !== TERMS_VERSION) throw new ValidationError("Las condiciones se actualizaron. Recargá la página antes de enviar.");
  const requestToken = form.get("requestToken");
  if (typeof requestToken !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestToken)) throw new ValidationError("Recargá la página y reintentá el envío.");
  if (form.get("website")) throw new ValidationError("No se pudo validar la solicitud.");
  fields.source = fields.source === "qr" ? "qr" : "web";
  return { fields, requestToken };
}

export async function validateInstallation(form: FormData) {
  const { fields, requestToken } = validateInstallationFields(form);
  const attachments: Attachment[] = [];
  for (const [field, max] of Object.entries({ labelPhoto: 1, invoice: 1, equipmentPhoto: 1, sitePhotos: 3 })) {
    const values = form.getAll(field);
    if (values.some(v => typeof v === "string")) throw new ValidationError("Revisá los archivos adjuntos.");
    const files = values.filter((v): v is File => v instanceof File && v.size > 0);
    if ((["labelPhoto", "invoice"].includes(field) && !files.length) || files.length > max) throw new ValidationError("Adjuntá la foto del modelo y número de serie, el comprobante y hasta 3 fotos del lugar.");
    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) throw new ValidationError("Cada archivo debe pesar como máximo 5 MB.");
      const bytes = Buffer.from(await file.arrayBuffer());
      const type = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? "image/png" : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? "image/jpeg" : bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" ? "image/webp" : bytes.toString("ascii", 0, 5) === "%PDF-" ? "application/pdf" : "";
      if (!type || type !== file.type || (type === "application/pdf" && field !== "invoice")) throw new ValidationError("Usá imágenes JPG, PNG o WEBP. La factura también puede ser PDF.");
      attachments.push({ field, name: file.name.slice(0, 200), type, bytes });
    }
  }
  if (attachments.reduce((sum, a) => sum + a.bytes.length, 0) > MAX_TOTAL_BYTES) throw new ValidationError("Los adjuntos superan el límite total de 20 MB.");
  fields.source = fields.source === "qr" ? "qr" : "web";
  return { fields, attachments, requestToken };
}
