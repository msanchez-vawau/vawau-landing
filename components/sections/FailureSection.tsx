"use client"

import Image from "next/image"

export default function FailureSection() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">

      {/* IMAGE */}
      <Image
        src="/error-lavadora.png"
        alt="Electrodoméstico dañado"
        fill
        className="object-cover object-center"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        {/* HEADLINE */}
        <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold mb-4 max-w-4xl">
          CUANDO FALLA...
        </h2>

        {/* SUBHEAD */}
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
          empieza el estrés, la incertidumbre y los gastos inesperados.
        </p>

        {/* PAIN POINTS */}
        <div className="text-white/80 text-sm md:text-base flex flex-col gap-2">
          <span>❌ Técnicos que no responden</span>
          <span>❌ Diagnósticos poco claros</span>
          <span>❌ Múltiples visitas sin solución</span>
          <span>❌ Dinero perdido</span>
        </div>

      </div>
    </section>
  )
}