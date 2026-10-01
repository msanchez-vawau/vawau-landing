# Catálogo de ubicaciones

El formulario usa un catálogo local: seleccionar provincia habilita sus cantones, seleccionar cantón habilita sus distritos. Cambiar provincia limpia cantón y distrito; cambiar cantón limpia distrito. El servidor verifica la combinación y conserva nombres de texto en el esquema existente de Supabase.

Fuente principal: Instituto Geográfico Nacional, División Territorial Administrativa 2026, tablas de provincias/cantones/distritos (páginas 6–19):
https://www.snitcr.go.cr/pdfs/ign_repositorio/DTA-TABLA%20POR%20PROVINCIA-CANT%C3%93N-DISTRITO%202026.pdf

Se extrajeron los nombres y códigos administrativos, sin áreas ni datos personales. La tabla consultada contiene 493 filas y termina en 70604, aunque declara 494 distritos. Se completó 70605 Duacarí (Guácimo, Limón), verificado con el catálogo del Ministerio de Salud:
https://www.ministeriodesalud.go.cr/fhir/CodeSystem-distritos-cs.json.html

Resultado: 7 provincias, 84 cantones, 494 códigos de distrito únicos. Los nombres se conservan según la tabla fuente. Archivo: lib/costa-rica-locations.json. Revisado el 1 de octubre de 2026.

El catálogo se incluye en el proyecto; no consulta servicios externos durante el llenado. Para actualizarlo, revisar una nueva DTA oficial, conservar la jerarquía de códigos y ejecutar npm run test:installations.
