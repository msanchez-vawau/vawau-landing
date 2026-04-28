"use client"

export default function SolutionSection() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-6xl mx-auto text-center space-y-8">

              {/* HEADLINE */}
 <h3 className="title !text-[#009aa5] text-3xl sm:text-5xl md:text-6xl font-bold">
  CUIDAMOS TU HOGAR
</h3>

 {/* SUBHEAD */}
        <div className="subtitle text-[#5b5e60] text-lg md:text-xl max-w-2xl mx-auto flex flex-col gap-1">
          <span>Con soluciones técnicas confiables.</span>
          <span>Servicio autorizado de las mejores marcas.</span>
        </div>

{/* STEPS */}
<div className="grid md:grid-cols-3 gap-6">

  {/* CARD 1 */}
  <div className="bg-[#009aa5] p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-white/20 text-center h-full flex flex-col justify-center">
    <div className="text-2xl mb-3">🛠️</div>
    <h3 className="subtitle font-bold !text-white text-lg leading-tight">
      <span className="block">+20 años de</span>
      <span className="block">experiencia</span>
    </h3>
  </div>

  {/* CARD 2 */}
  <div className="bg-[#009aa5] p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-white/20 text-center h-full flex flex-col justify-center">
    <div className="text-2xl mb-3">🔧</div>
    <h3 className="subtitle font-bold !text-white text-lg leading-tight">
      <span className="block">Repuestos originales</span>
      <span className="block">garantizados</span>
    </h3>
  </div>

  {/* CARD 3 */}
  <div className="bg-[#009aa5] p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-white/20 text-center h-full flex flex-col justify-center">
    <div className="text-2xl mb-3">⚡</div>
    <h3 className="subtitle font-bold !text-white text-lg leading-tight">
      <span className="block">Atención</span>
      <span className="block">rápida</span>
    </h3>
  </div>

</div>

{/* CTA */}
<div className="flex justify-center mt-8">
  <a
    href="https://wa.me/50685300201?text=Hola,%20necesito%20reparar%20un%20electrodoméstico.%20¿Me%20pueden%20ayudar?"
    onClick={() => window.trackEvent("whatsapp_click")}
    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-sm md:text-base shadow-xl transition"
  >
    Solicita tu revisión
  </a>
</div>

</div>
    
    </section>
  )
}