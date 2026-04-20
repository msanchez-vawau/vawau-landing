"use client"

import { useState } from "react"

export default function Contact() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const message = `Hola, mi nombre es ${name}. Necesito ayuda con un electrodoméstico. Mi número es ${phone}.`

    const url = `https://wa.me/50685300201?text=Hola%2C%20necesito%20ayuda%20con%20un%20electrodom%C3%A9stico.%20%C2%BFMe%20pueden%20asesorar%3F50685300201?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  return (
    <section
      id="contacto"
      className="bg-gray-50 text-primary py-24 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Agendá tu servicio ahora
        </h2>

        <p className="text-grayCustom mb-10">
          Dejanos tus datos y te contactamos o escribinos directamente por WhatsApp.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 max-w-md mx-auto"
        >

          <input
            type="text"
            placeholder="Tu nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="tel"
            placeholder="Tu teléfono"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Enviar y contactar
          </button>

        </form>

        {/* WHATSAPP DIRECT */}
        <div className="mt-6">
          <a
            href="https://wa.me/50685300201?text=Hola%2C%20necesito%20ayuda%20con%20un%20electrodom%C3%A9stico.%20%C2%BFMe%20pueden%20asesorar%3F50685300201"
            target="_blank"
            className="text-secondary font-semibold"
          >
            O escribir directamente por WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}