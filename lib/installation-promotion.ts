export const PURCHASE_START = "2026-10-15";
export const PURCHASE_END = "2026-11-30";
export const PROMOTION_NOTICE = "Aplica para equipos comprados del 15 de octubre al 30 de noviembre de 2026, ambas fechas inclusive. La instalación debe solicitarse dentro de los 90 días posteriores a la fecha de compra. Si por disponibilidad del taller la instalación se realiza después, el beneficio se conserva siempre que la solicitud se haya enviado dentro de ese plazo.";

export function purchaseDateError(value: string, now = new Date()): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) return "Ingresá una fecha de compra válida.";
  if (value < PURCHASE_START || value > PURCHASE_END) return "El beneficio aplica para compras del 15 de octubre al 30 de noviembre de 2026.";
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Costa_Rica" }).format(now);
  if (value > today) return "La fecha de compra no puede ser futura.";
  if (today > installationDeadline(value)) return "El plazo de 90 días para solicitar este beneficio venció para la fecha de compra indicada.";
  return "";
}

export function installationDeadline(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) return "";
  const date = new Date(value + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() + 90);
  return date.toISOString().slice(0, 10);
}

export function formatDeadline(value: string): string {
  const deadline = installationDeadline(value);
  if (!deadline) return "";
  const date = new Date(deadline + "T00:00:00Z");
  return new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}
