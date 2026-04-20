"use client"

export default function CTA() {
  return (
    <section className="bg-primary text-white py-28 px-6 text-center">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Repará hoy.
          <br />
          <span className="text-secondary">Dormí tranquilo esta noche.</span>
        </h2>

        <p className="text-lg text-white/80 mb-10">
          Atención rápida, diagnóstico claro y respaldo real en cada reparación.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/50685300201?text=Hola%2C%20necesito%20ayuda%20con%20un%20electrodom%C3%A9stico.%20%C2%BFMe%20pueden%20asesorar%3F50685300201"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Escribinos por WhatsApp
          </a>

          {/* AGENDAR */}
          <a
            href="#contacto"
            className="border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:text-primary transition"
          >
            Agendar servicio
          </a>

        </div>

      </div>

    </section>
  )
}