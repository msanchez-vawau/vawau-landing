"use client";

import { useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { brands, equipmentTypes, provinces, preparationOptions, MAX_FILE_BYTES, MAX_TOTAL_BYTES } from "@/lib/installation-options";
import { TERMS_VERSION } from "@/lib/installation-terms";
import Link from "next/link";
import { getCantons, getDistricts } from "@/lib/installation-locations";
import LocationInput from "./LocationInput";

function Field({ label, name, required = false, wide = false, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; wide?: boolean; hint?: string }) {
  return <label className={`installation-field ${wide ? "wide" : ""}`}><span>{label}{required ? " *" : " (opcional)"}</span><input name={name} required={required} maxLength={250} {...props} />{hint && <small>{hint}</small>}</label>;
}
function Select({ label, name, options, onChange, value, disabled = false, placeholder = "Seleccioná una opción" }: { label: string; name: string; options: string[]; onChange?: (value: string) => void; value?: string; disabled?: boolean; placeholder?: string }) {
  return <label className="installation-field"><span>{label} *</span><select name={name} required disabled={disabled} {...(value === undefined ? { defaultValue: "" } : { value })} onChange={e => onChange?.(e.target.value)}><option value="" disabled>{placeholder}</option>{options.map(o => <option key={o}>{o}</option>)}</select></label>;
}
function Group({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <fieldset><legend><b>{number}</b>{title}</legend><div className="installation-field-grid">{children}</div></fieldset>;
}
function Upload({ label, name, required = false, pdf = false, multiple = false }: { label: string; name: string; required?: boolean; pdf?: boolean; multiple?: boolean }) {
  return <Field label={label} name={name} type="file" required={required} wide multiple={multiple} accept={pdf ? "image/jpeg,image/png,image/webp,application/pdf" : "image/jpeg,image/png,image/webp"} hint={`${pdf ? "JPG, PNG, WEBP o PDF" : "JPG, PNG o WEBP"}. Máximo 5 MB por archivo.${multiple ? " Hasta 3 fotografías." : ""}`} />;
}

export default function InstallationForm() {
  const [province, setProvince] = useState("");
  const [canton, setCanton] = useState("");
  const [district, setDistrict] = useState("");
  const [equipment, setEquipment] = useState("");
  const [onsite, setOnsite] = useState("");
  const [prepared, setPrepared] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{ reference: string; createdAt: string } | null>(null);
  const token = useRef("");
  const submitting = useRef(false);
  const pending = useRef<{ fingerprint: string; ticket: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    setError("");
    const files = [...data.values()].filter((v): v is File => v instanceof File && v.size > 0);
    if (files.some(f => f.size > MAX_FILE_BYTES)) { setError("Cada archivo debe pesar como máximo 5 MB."); return; }
    if (files.reduce((s, f) => s + f.size, 0) > MAX_TOTAL_BYTES) { setError("Los archivos adjuntos no deben superar 20 MB en total."); return; }
    if (data.getAll("sitePhotos").filter(f => f instanceof File && f.size).length > 3) { setError("Podés adjuntar hasta 3 fotografías del lugar."); return; }
    token.current ||= crypto.randomUUID();
    data.set("requestToken", token.current);
    data.set("termsVersion", TERMS_VERSION);
    data.set("source", new URLSearchParams(window.location.search).get("origen") === "qr" ? "qr" : "web");
    submitting.current = true;
    setBusy(true);
    try {
      const entries = [...data.entries()].filter((entry): entry is [string, File] => entry[1] instanceof File && entry[1].size > 0);
      const fields = Object.fromEntries([...data.entries()].filter((entry) => typeof entry[1] === "string"));
      const manifest = await Promise.all(entries.map(async ([field, file]) => ({ field, name: file.name, type: file.type, size: file.size, sha256: [...new Uint8Array(await crypto.subtle.digest("SHA-256", await file.arrayBuffer()))].map(b => b.toString(16).padStart(2, "0")).join("") })));
      const fingerprint = JSON.stringify({ fields, files: manifest });
      async function send(body: object) {
        const response = await fetch("/api/instalaciones", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(120000) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "No pudimos guardar la solicitud. Intentá nuevamente.");
        return result;
      }
      if (!pending.current || pending.current.fingerprint !== fingerprint) {
        const prepared = await send({ action: "prepare", fields, files: manifest });
        for (let i = 0; i < entries.length; i++) {
          const file = entries[i][1];
          const upload = await fetch(prepared.uploads[i].url, { method: "PUT", headers: { "Content-Type": file.type, "x-upsert": "false" }, body: file, signal: AbortSignal.timeout(120000) });
          if (!upload.ok) throw new Error("No pudimos cargar todos los archivos. Revisá tu conexión y reintentá.");
        }
        pending.current = { fingerprint, ticket: prepared.ticket };
      }
      let result;
      try { result = await send({ action: "finish", ticket: pending.current.ticket }); }
      catch (error) { if (error instanceof Error && /tiempo para enviar venció/.test(error.message)) pending.current = null; throw error; }
      if (!/^EI-\d{6,}$/.test(result.reference) || !result.createdAt) throw new Error("No se pudo verificar la confirmación. Intentá nuevamente.");
      setReceipt(result);
      requestAnimationFrame(() => document.getElementById("confirmacion")?.focus());
    } catch (err) {
      setError(err instanceof Error && err.name !== "TimeoutError" ? err.message : "No recibimos la confirmación. Revisá tu conexión y reintentá; conservamos la referencia del envío para evitar duplicados.");
    } finally { submitting.current = false; setBusy(false); }
  }

  if (receipt) return <section id="confirmacion" className="installation-success" tabIndex={-1} aria-labelledby="confirmation-title">
    <div className="installation-success-icon" aria-hidden="true">✓</div><p className="installation-eyebrow">GRACIAS POR CONFIAR EN VAWAU®</p>
    <h2 id="confirmation-title" className="title">¡Solicitud recibida!</h2><p>Hemos recibido correctamente tu solicitud de instalación.</p>
    <p className="installation-small">Tu número de solicitud</p><strong className="installation-reference">{receipt.reference}</strong>
    <p className="installation-small">{new Date(receipt.createdAt).toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })}</p>
    <p>Nuestro equipo validará la información suministrada y se pondrá en contacto con vos para coordinar el servicio.</p>
    <p className="installation-small">El envío de esta solicitud no representa la confirmación automática de una fecha de instalación. Conservá este número para consultar por tu servicio.</p>
    <div className="installation-success-actions"><button type="button" className="installation-button" onClick={() => window.print()}>Guardar comprobante</button><Link href="/" className="installation-button installation-secondary">Volver al inicio</Link></div>
  </section>;

  return <section id="solicitud" className="installation-form-layout" aria-labelledby="request-title">
    <aside className="installation-form-intro"><p className="installation-eyebrow">TU NUEVO EQUIPO</p><h2 id="request-title" className="title">Solicitá tu instalación</h2><p>Completá los datos para que podamos validar tu compra y coordinar la visita.</p>
      <ul className="installation-checklist"><li>Tené a mano tu factura.</li><li>Fotografiá la etiqueta del equipo.</li><li>Revisá la dirección y tu teléfono.</li></ul><p>Los campos con * son obligatorios.</p>
    </aside>
    <form className="installation-form" onSubmit={submit} aria-busy={busy}>
      <Group number="01" title="Datos del cliente">
        <Field label="Nombre completo" name="fullName" required wide autoComplete="name" />
        <Field label="Identificación" name="identification" required />
        <Field label="Teléfono principal / WhatsApp" name="phone" type="tel" required autoComplete="tel" pattern={String.raw`[+0-9 \(\)\-]{8,25}`} hint="Incluí el código de país si corresponde." />
        <Field label="Teléfono alternativo" name="alternatePhone" type="tel" pattern={String.raw`[+0-9 \(\)\-]{8,25}`} />
        <Field label="Otro teléfono" name="otherPhone" type="tel" pattern={String.raw`[+0-9 \(\)\-]{8,25}`} />
        <Field label="Correo electrónico" name="email" type="email" required wide autoComplete="email" />
      </Group>
      <Group number="02" title="Lugar de instalación">
        <Select label="Provincia" name="province" options={provinces} value={province} onChange={value => { setProvince(value); setCanton(""); setDistrict(""); }} />
        <Select label="Cantón" name="canton" options={getCantons(province)} value={canton} disabled={!province} placeholder={province ? "Seleccioná un cantón" : "Primero seleccioná una provincia"} onChange={value => { setCanton(value); setDistrict(""); }} />
        <Select label="Distrito" name="district" options={getDistricts(province, canton)} value={district} disabled={!canton} placeholder={canton ? "Seleccioná un distrito" : "Primero seleccioná un cantón"} onChange={setDistrict} />
        <label className="installation-field wide"><span>Dirección exacta *</span><textarea name="address" required maxLength={2000} autoComplete="street-address" placeholder="Barrio, calle, número de casa y señas para llegar." /></label>
        <Field label="Referencia adicional" name="addressReference" wide />
        <LocationInput />
      </Group>
      <Group number="03" title="Información del equipo">
        <Select label="Marca" name="brand" options={brands} />
        <Select label="Tipo de equipo" name="equipmentType" options={equipmentTypes} onChange={setEquipment} />
        {equipment === "Otro" && <Field label="Especificá el tipo de equipo" name="otherEquipment" required wide />}
        <Field label="Modelo" name="model" required /><Field label="Número de serie" name="serial" required />
        <Upload label="Fotografía de la etiqueta del equipo" name="labelPhoto" required />
        <Upload label="Fotografía general del equipo" name="equipmentPhoto" />
      </Group>
      <Group number="04" title="Validación de compra">
        <Field label="Comercio donde adquiriste el equipo" name="store" required wide />
        <Field label="Fecha de compra" name="purchaseDate" type="date" required />
        <Field label="Número de factura" name="invoiceNumber" />
        <Upload label="Factura o comprobante de compra" name="invoice" required pdf />
        <p className="installation-note">El comprobante debe ser legible y permitir identificar el comercio, el producto y la fecha de compra.</p>
      </Group>
      <Group number="05" title="Preparación del sitio">
        <Select label="¿El equipo ya está en el lugar de instalación?" name="onsite" options={["Sí", "No"]} onChange={setOnsite} />
        <Select label="¿El lugar está preparado?" name="prepared" options={preparationOptions} onChange={setPrepared} />
        {(onsite === "No" || prepared === "No" || prepared === "No estoy seguro") && <p className="installation-note" role="status">Podés enviar tu solicitud. Revisaremos con vos la preparación del sitio y la disponibilidad del equipo antes de coordinar la instalación.</p>}
        <label className="installation-field wide"><span>Observaciones o condiciones especiales (opcional)</span><textarea name="observations" maxLength={2000} placeholder="Contanos si hay escaleras, restricciones de acceso u otra condición que debamos conocer." /></label>
        <Upload label="Fotografías del lugar" name="sitePhotos" multiple />
      </Group>
      <fieldset><legend><b>06</b>Condiciones y autorización</legend><div style={{ clear: "both" }}>
        <label className="installation-consent"><input type="checkbox" name="acceptTerms" required /><span>He leído y acepto las <a href="#condiciones" onClick={() => { const details = document.querySelector<HTMLDetailsElement>("#condiciones details"); if (details) details.open = true; }}>Condiciones del Servicio de Instalación</a>. *</span></label>
        <label className="installation-consent"><input type="checkbox" name="acceptData" required /><span>Autorizo el tratamiento de los datos suministrados para validar, coordinar, ejecutar y dar seguimiento a mi solicitud de instalación. *</span></label>
        <div className="installation-honeypot" aria-hidden="true"><label>Dejá este campo vacío<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        {error && <p className="installation-error" role="alert">{error}</p>}
        <button type="submit" className="installation-button installation-submit" disabled={busy}>{busy ? "Enviando solicitud…" : "Solicitar instalación"}<span aria-hidden="true">→</span></button>
        <p className="installation-small" style={{ marginTop: 16, color: "#526174" }}>Después de enviar, recibirás tu número de solicitud. Nuestro equipo te contactará para coordinar; la fecha no se confirma automáticamente.</p>
      </div></fieldset>
    </form>
  </section>;
}
