"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="bg-primary text-white">

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <div className="mb-6">
            <Image
              src="/logo-vawau.png"
              alt="VAWAU"
              width={100}
              height={100}
              priority
            />
          </div>

          <p className="text-sm uppercase tracking-wide text-secondary mb-2">
            Centro de servicio autorizado
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Reparación de electrodomésticos
            <br />
            con respaldo real
          </h1>

          <p className="text-lg text-white/80 mb-6">
            Servicio técnico especializado en línea blanca.
            Atención a domicilio en Costa Rica, repuestos originales
            y garantía en cada reparación.
          </p>

          {/* BENEFICIOS RÁPIDOS */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-white/80">

            <div>✔ Técnicos certificados</div>
            <div>✔ Diagnóstico profesional</div>
            <div>✔ Repuestos originales</div>
            <div>✔ Servicio a domicilio</div>

          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">

            <a
              href="https://wa.me/50685300201?text=Hola%2C%20necesito%20ayuda%20con%20un%20electrodom%C3%A9stico.%20%C2%BFMe%20pueden%20asesorar%3F50685300201"
              target="_blank"
              className="bg-secondary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition text-center"
            >
              WhatsApp
            </a>

            <a
              href="#contacto"
              className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition text-center"
            >
              Agendar servicio
            </a>

          </div>

          {/* TELÉFONO */}
          <p className="mt-6 text-sm text-white/70">
            Atención rápida: <span className="font-bold text-white">8530 0201</span>
          </p>

        </div>

        {/* RIGHT */}
        <div className="bg-darkBlue rounded-2xl p-6 shadow-2xl">
          <Image
            src="/mockup-1-digital.png"
            alt="VAWAU Platform"
            width={800}
            height={600}
            className="rounded-lg"
            priority
          />
        </div>

      </div>

    </section>
  )
}