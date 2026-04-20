"use client"

export default function SolutionSection() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-5xl mx-auto text-center">

        {/* TITLE */}
       <h2 className="text-3xl md:text-5xl font-bold">
          Con Vawau® todo es claro, rápido y sin enredos
        </h2>

        {/* SUBTITLE */}
        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Un proceso profesional donde sabés qué pasa, cuánto cuesta y cuándo queda listo.
        </p>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">1. Agendás fácil</h3>
            <p className="text-gray-600 text-sm">
              Coordinamos tu visita rápida por WhatsApp.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">2. Diagnóstico claro</h3>
            <p className="text-gray-600 text-sm">
              Te explicamos el problema y el costo antes de reparar.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">3. Reparación con garantía</h3>
            <p className="text-gray-600 text-sm">
              Trabajo profesional, repuestos originales y respaldo real.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}