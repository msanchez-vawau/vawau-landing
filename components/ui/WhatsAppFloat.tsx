"use client"

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/50685300201?text=Hola%2C%20necesito%20ayuda%20con%20un%20electrodom%C3%A9stico.%20%C2%BFMe%20pueden%20asesorar%3F50685300201"
      target="_blank"
      onClick={() => window.trackEvent("whatsapp_float")}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 transition"
    >
      <span className="text-xl">💬</span>
      <span className="hidden sm:block font-semibold">
        ¡Estamos listos para ayudarte!
      </span>
    </a>
  )
}