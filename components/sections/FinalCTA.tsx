"use client"

export default function FinalCTA() {
  return (
    <section className="bg-primary text-white py-24 px-6 text-center">

      <div className="max-w-3xl mx-auto">

       
      

        {/* CTA */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

  {/* WHATSAPP */}
  <a
    href="https://wa.me/50685300201?text=Hola,%20necesito%20ayuda%20con%20un%20electrodoméstico"
    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition"
  >
    ¡Estamos listos para ayudarte!
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