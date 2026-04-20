"use client"

import Image from "next/image"

export default function HeroVisual() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">

      {/* IMAGE */}
      <Image
        src="/hogar-feliz2.png"
        alt="Hogar funcionando"
        fill
        priority
        className="object-cover object-[center_30%] md:object-[center_20%]"
      />

      {/* LOGO */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <Image
          src="/logo-horizontal.png"
          alt="Vawau®"
          width={280}
          height={100}
          priority
          className="drop-shadow-2xl"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-28">

        {/* HEADLINE */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mb-5">
          Reparación de electrodomésticos a domicilio, rápida y sin enredos
        </h1>

        {/* SUBHEAD */}
        <p className="text-white/90 text-base md:text-lg max-w-xl mb-7">
          Reparación y repuestos originales para electrodomésticos.  
          Servicio claro, rápido y con garantía real.
        </p>

        {/* CTA */}
        <a
          href="https://wa.me/50685300201?text=Hola,%20necesito%20reparar%20un%20electrodoméstico.%20¿Me%20pueden%20ayudar?"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-base md:text-lg shadow-xl transition"
        >
          Escribinos ahora por WhatsApp
        </a>

        {/* SOCIAL LINKS */}
        <div className="mt-8 flex gap-6 text-white/80 text-sm">

          <a
            href="https://www.facebook.com/Stvawau"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Facebook
          </a>

          <a
            href="https://www.instagram.com/stvawau"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Instagram
          </a>

          <a
            href="https://app.vawau.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Plataforma
          </a>

        </div>

        {/* TRUST */}
        <div className="mt-6 text-white/80 text-xs md:text-sm flex flex-wrap justify-center gap-4">
          <span>✔ Servicio autorizado</span>
          <span>✔ Atención rápida</span>
          <span>✔ Garantía por escrito</span>
        </div>

      </div>

    </section>
  )
}