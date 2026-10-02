import { PROMOTION_NOTICE } from "./installation-promotion";
// Texto suministrado por VAWAU. Actualizar la versión al modificar condiciones.
export const TERMS_VERSION = "v2-2026-10-02";
export const termsIntroduction = [
  "VAWAU® es responsable de coordinar y ejecutar el servicio de instalación de los equipos Electrolux y Frigidaire comercializados con este beneficio de instalación.",
  "Para solicitar el servicio, el cliente deberá completar el formulario correspondiente, proporcionar la información requerida y aceptar las presentes condiciones.",
];
export const termsSections = [
  { title: "1. Alcance del servicio incluido", paragraphs: [
    "El beneficio corresponde exclusivamente a la mano de obra necesaria para realizar la instalación estándar del equipo.",
    "El procedimiento y los requerimientos de instalación podrán variar según el tipo de producto, modelo, características técnicas y especificaciones de instalación correspondientes.",
    "La instalación se realizará siempre que el lugar destinado para el equipo cuente con las condiciones técnicas, físicas y de seguridad necesarias para ejecutar correctamente el trabajo.",
  ] },
  { title: "2. Elementos y trabajos no incluidos", paragraphs: [
    "El beneficio de instalación no incluye materiales, accesorios, kits de instalación, componentes adicionales, adecuaciones ni trabajos complementarios que puedan ser necesarios para completar la instalación.",
    "Entre otros, no se encuentran incluidos:",
  ], items: [
    "Kits de instalación.", "Accesorios o materiales adicionales.", "Trabajos o modificaciones eléctricas.",
    "Instalación, modificación o reubicación de tomacorrientes.",
    "Instalación o modificación de cableado eléctrico, breakers, centros de carga u otros componentes eléctricos.",
    "Trabajos o modificaciones de fontanería.", "Instalación, modificación o extensión de tuberías o conexiones adicionales.",
    "Trabajos de ebanistería o carpintería.", "Construcción, modificación, ampliación, corte o adaptación de muebles.",
    "Obras civiles.", "Modificaciones estructurales.", "Modificaciones o reparaciones en paredes, pisos, cielos u otras superficies.",
    "Cualquier otro material, accesorio, adecuación o trabajo que no corresponda directamente a la mano de obra de instalación estándar del equipo.",
  ], after: [
    "Cuando sea necesario alguno de estos elementos o trabajos para completar correctamente la instalación, se informará al cliente.",
    "Los materiales, accesorios, adecuaciones o trabajos adicionales podrán ser cotizados y cobrados por separado y requerirán la autorización previa del cliente.",
  ] },
  { title: "3. Condiciones que debe cumplir el cliente", paragraphs: ["Para poder realizar el servicio:"], items: [
    "El equipo deberá encontrarse físicamente en el lugar donde será instalado.",
    "El cliente o una persona adulta autorizada deberá estar presente durante la visita.",
    "El área donde será instalado el equipo deberá encontrarse accesible y disponible para realizar el trabajo.",
    "El cliente deberá facilitar el acceso al inmueble y al área específica de instalación.",
    "El sitio deberá contar con las condiciones eléctricas, hidráulicas, físicas y demás requerimientos necesarios según el tipo de equipo.",
    "Cuando corresponda, el espacio, mueble o área destinada al equipo deberá encontrarse preparado y contar con las condiciones y dimensiones adecuadas para su instalación.",
  ], after: ["Los requerimientos específicos podrán variar de acuerdo con el tipo de producto y sus especificaciones técnicas."] },
  { title: "4. Validación de la solicitud", paragraphs: ["Para gestionar el servicio, el cliente deberá completar el formulario de solicitud y proporcionar la información requerida."] },
  { title: "5. Vigencia del beneficio", paragraphs: [PROMOTION_NOTICE,
    "El plazo se calcula individualmente a partir de la fecha de compra indicada en el comprobante. Por ejemplo, una compra del 30 de noviembre de 2026 permite solicitar el beneficio hasta el 28 de febrero de 2027, inclusive.",
    "La instalación se coordinará dentro de los 90 días posteriores a la compra, sujeto a disponibilidad del taller. Cuando esa disponibilidad impida atender dentro del plazo, podrá realizarse posteriormente sin perder el beneficio, siempre que la solicitud haya sido enviada a tiempo.",
    "El envío de la solicitud no confirma automáticamente una fecha de instalación. VAWAU coordinará la visita con el cliente.",
  ] },
];
