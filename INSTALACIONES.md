# Instalaciones Electrolux / Frigidaire — VAWAU

## Publicación en Vercel y Supabase

1. El proyecto Supabase es `reyppdellnhuwpkxaabu` (Vawau Instalaciones), separado de CORE.
2. Ejecutar primero `supabase/migrations/20261001010000_installations.sql` (ya suministrado como 01). Luego ejecutar `20261001020000_receive_installation.sql` (02). Son reejecutables; no eliminan solicitudes ni reinician consecutivos.
3. En Vercel > vawau-landing > Production, guardar `SUPABASE_URL` y `SUPABASE_SECRET_KEY`. La clave es secreta, solo para servidor; nunca ponerle el prefijo NEXT_PUBLIC_. No se necesita clave pública.
4. Subir esta versión al repositorio conectado a Vercel y desplegar. Un Redeploy del código anterior no incorpora esta integración.
5. Verificar una solicitud ficticia desde el dominio publicado; comprobar la referencia, una fila en installation_requests y sus adjuntos privados. No usar información personal real en la prueba.

Variables actuales del usuario: ya guardadas en Vercel. Esta entrega no incluye claves ni modifica el proyecto remoto. La comprobación real de extremo a extremo queda pendiente de ejecutar 02 y publicar el código.

## Entrada del QR

`https://www.vawau.com/instalacion?origen=qr#condiciones`

Abre directamente condiciones y formulario. `/instalacion` conserva la introducción para quienes llegan desde el landing. Antes de imprimir un QR, comprobar este enlace en producción. Esta entrega no publica ni genera un QR imprimible.

Las condiciones siguen las cuatro secciones suministradas por el usuario. Están en `lib/installation-terms.ts`; actualizar TERMS_VERSION cuando cambien.

## Envío y guardado

La API recibe JSON pequeño (máximo 64 KiB). Primero valida datos, consentimientos, versión y metadatos. El servidor genera enlaces de carga firmados por Supabase, sin permiso para sobrescribir. El navegador carga los archivos directamente al bucket privado: evita el límite de 4.5 MB de las funciones Vercel.

Al finalizar, el servidor comprueba cada archivo descargado: tamaño, SHA-256 y firma JPG/PNG/WEBP/PDF. Solo entonces una función PostgreSQL guarda datos y metadatos de todos los adjuntos en una transacción. Si algo falla, no hay confirmación de recepción. Los campos para técnico, CSA, estado, fechas y referencia CORE están preparados; no hay sincronización CORE ni notificaciones automáticas.

El consecutivo se genera en PostgreSQL como EI-000001. Puede tener saltos por transacciones abortadas; no se reinicia ni se recicla. El token en memoria evita duplicados por reintento mientras la página permanece abierta. Recargar la página inicia otro envío. Las confirmaciones repetidas con el mismo contenido devuelven la referencia original; cambiar un envío ya recibido produce un conflicto.

Las tablas y funciones no son accesibles para anon/authenticated. La API no ofrece lectura pública de solicitudes ni enlaces públicos de descarga. El ticket firmado de finalización dura dos horas y solo vuelve al navegador que realizó el envío; contiene sus propios datos y no debe compartirse ni registrarse en logs.

## Archivos y mantenimiento

- Etiqueta y factura obligatorias; foto del equipo opcional; hasta tres fotos del lugar.
- Máximo 5 MB por archivo y 20 MB en total. Solo factura admite PDF.
- Límite persistente de 10 preparaciones por IP/hora. Se guarda un hash de la IP, no la dirección en claro; los contadores antiguos se depuran al ingresar nuevas solicitudes.
- Una carga abandonada puede dejar objetos privados sin expediente. No se borran automáticamente. Para limpieza operativa, identificar rutas no referenciadas en installation_attachments, esperar al menos 24 horas y usar la API de Storage; nunca borrar filas directamente de storage.objects.
- La validación de firma no sustituye análisis antimalware.
- Provincia, cantón y distrito son listas dependientes, con catálogo local IGN 2026 y validación de la combinación en el servidor. Ver UBICACIONES.md.

## Desarrollo y pruebas

`npm ci`, configurar `.env.local` según `.env.example`, `npm run dev`.

`npm run test:installations` ejecuta pruebas aisladas de API con Supabase simulado y las migraciones completas con PostgreSQL local (PGlite). No contacta producción ni consume consecutivos reales. Verifica archivos faltantes/alterados, tipos, límites, consentimientos, origen, ticket, caída del servicio, reintentos, rollback y permisos.

`npm run build` compila producción. La integración requiere una prueba real en Vercel/Supabase tras publicar; las pruebas locales no verifican las claves guardadas, permisos efectivos ni conectividad de la cuenta.

El ZIP excluye node_modules, .next, .git, variables locales, datos de prueba y cachés. Incluye .env.example, migraciones y pruebas. El diseño aprobado se conserva.
