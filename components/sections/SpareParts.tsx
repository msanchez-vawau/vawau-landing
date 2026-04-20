"use client"

export default function SpareParts() {
  return (
    <section className="bg-gray-50 py-20 px-6 text-center">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Necesitás un repuesto?
        </h2>

        <p className="text-gray-600 mb-8">
          También contamos con repuestos originales para múltiples marcas.
          Consultanos y te ayudamos a encontrar el correcto sin perder tiempo.
        </p>

        <a
          href="https://wa.me/50685300201?text=Hola,%20estoy%20buscando%20un%20repuesto%20para%20un%20electrodoméstico"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition"
        >
          Consultar repuesto por WhatsApp
        </a>

      </div>

    </section>
  )
}