"use client"

export default function FinalCTA() {
  return (
    <section className="bg-primary text-white py-24 px-6 text-center">

      <div className="max-w-3xl mx-auto">

        {/* HEADLINE */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          ¿Tu electrodoméstico falló?
        </h2>

        {/* SUBHEAD */}
        <p className="text-white/80 text-lg md:text-xl mb-10">
          No esperés a que el problema empeore.  
          Te ayudamos rápido, claro y con garantía real.
        </p>

        {/* CTA */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

  {/* WHATSAPP */}
  <a
    href="https://wa.me/50685300201?text=Hola,%20necesito%20ayuda%20con%20un%20electrodoméstico"
    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition"
  >
    Escribinos ahora por WhatsApp
  </a>

  {/* LLAMADA */}
  <a
    href="tel:+50640002829"
    className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-100 transition"
  >
    Llamar ahora
  </a>

</div>

        {/* MICRO TRUST */}
        <p className="mt-6 text-white/60 text-sm">
          Atención rápida • Diagnóstico claro • Sin enredos
        </p>

      </div>
    </section>
  )
}