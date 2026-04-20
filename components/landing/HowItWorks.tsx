export default function HowItWorks() {
  return (
    <section className="bg-gray-50 text-primary">
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Así funciona VAWAU
          </h2>
          <p className="text-grayCustom max-w-2xl mx-auto">
            Sin complicaciones. Un proceso claro para resolver tu problema rápido.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <div className="text-3xl font-bold text-secondary mb-4">1</div>
            <h3 className="font-semibold text-lg mb-2">
              Agendás el servicio
            </h3>
            <p className="text-grayCustom">
              Nos contactás y coordinamos la visita según tu disponibilidad.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <div className="text-3xl font-bold text-secondary mb-4">2</div>
            <h3 className="font-semibold text-lg mb-2">
              Diagnosticamos el equipo
            </h3>
            <p className="text-grayCustom">
              Revisamos el problema y te explicamos claramente la solución.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <div className="text-3xl font-bold text-secondary mb-4">3</div>
            <h3 className="font-semibold text-lg mb-2">
              Solucionamos y damos garantía
            </h3>
            <p className="text-grayCustom">
              Ejecutamos la reparación con respaldo y seguimiento.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}