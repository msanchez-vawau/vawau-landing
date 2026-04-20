export default function Problem() {
  return (
    <section className="bg-gray-50 text-primary">
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sabemos lo que pasa cuando un electrodoméstico falla
          </h2>
          <p className="text-grayCustom max-w-2xl mx-auto">
            No es solo una reparación. Es el estrés, el tiempo perdido y la incertidumbre de no saber si realmente lo van a solucionar.
          </p>
        </div>

        {/* PROBLEMS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              Técnicos que no responden
            </h3>
            <p className="text-grayCustom">
              Agendás una visita y desaparecen o llegan tarde sin aviso.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              Diagnósticos poco claros
            </h3>
            <p className="text-grayCustom">
              No sabés qué tiene el equipo ni por qué cuesta lo que cuesta.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              Falta de seguimiento
            </h3>
            <p className="text-grayCustom">
              Nadie te da estado del caso ni sabés en qué va la reparación.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              Pérdida de tiempo y dinero
            </h3>
            <p className="text-grayCustom">
              Múltiples visitas sin solución real o trabajos mal hechos.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}