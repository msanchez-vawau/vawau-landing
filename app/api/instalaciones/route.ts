import { prepareInstallation, finishInstallation, CloudError } from "@/lib/installation-cloud";
import { ValidationError } from "@/lib/installation-validation";

export const runtime = "nodejs";
export const maxDuration = 120;
function reply(body: object, status: number) { return Response.json(body, { status, headers: { "Cache-Control": "no-store" } }); }
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const expectedOrigin = process.env.INSTALLATION_PUBLIC_ORIGIN || `${requestUrl.protocol}//${request.headers.get("host") || requestUrl.host}`;
  if (request.headers.get("origin") && request.headers.get("origin") !== expectedOrigin) return reply({ error: "Origen del envío no permitido." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Formato de solicitud no válido." }, 400);
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new ValidationError("La solicitud está vacía.");
    const chunks: Uint8Array[] = []; let size = 0;
    for (;;) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > 65536) { await reader.cancel(); return reply({ error: "La solicitud supera el tamaño permitido." }, 413); } chunks.push(value); }
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString()); } catch { throw new ValidationError("La solicitud no es válida."); }
    if (!body || typeof body !== "object") throw new ValidationError("La solicitud no es válida.");
    if (body.action === "prepare") {
      // Vercel reemplaza x-forwarded-for con la IP del visitante.
      const ip = process.env.VERCEL ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown" : "local";
      return reply(await prepareInstallation(body, ip), 200);
    }
    if (body.action === "finish") return reply(await finishInstallation(body.ticket), 201);
    throw new ValidationError("La operación no es válida.");
  } catch (error) {
    if (error instanceof ValidationError) return reply({ error: error.message }, 400);
    if (error instanceof CloudError) return reply({ error: error.message }, error.status);
    console.error("installation_cloud_failed");
    return reply({ error: "No pudimos confirmar el envío. Revisá tu conexión y reintentá; conservamos el envío para evitar duplicados." }, 503);
  }
}
