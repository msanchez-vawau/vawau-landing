export default function Trust() {
  return (
    <section className="bg-gray-50 text-primary py-28 px-6">

      <div className="max-w-7xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Estás en manos de profesionales
        </h2>

        <p className="text-grayCustom mb-12 max-w-2xl mx-auto">
          No somos técnicos improvisados. Somos un centro de servicio con procesos, respaldo y experiencia real en el sector.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              +10 años de experiencia
            </h3>
            <p className="text-grayCustom">
              Atendiendo hogares y resolviendo fallas reales.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              Centro de servicio especializado
            </h3>
            <p className="text-grayCustom">
              Procesos claros, técnicos capacitados y respaldo empresarial.
            </p>
          </div>

          <div className="p-6 bg-gray-50 shadow-lg rounded-xl text-left">
            <h3 className="font-semibold text-lg mb-2">
              Garantía en cada servicio
            </h3>
            <p className="text-grayCustom">
              Tu reparación está respaldada, no es un intento más.
            </p>
          </div>

        </div>

      </div>

    </section>
  )
}