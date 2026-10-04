"use client"

import { usePathname } from "next/navigation"

export default function WhatsAppFloat() {
  const pathname = usePathname()

  if (pathname === "/wilcor" || pathname.startsWith("/wilcor/")) {
    return null
  }

  return (
    <a
      href="https://wa.me/50685300201?text=Hola%2C%20necesito%20ayuda%20con%20un%20electrodom%C3%A9stico."
      target="_blank"
      rel="noreferrer"
      onClick={() => window.trackEvent?.("whatsapp_float")}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 transition"
    >
      <span className="text-xl">WA</span>
      <span className="hidden sm:block font-semibold">
        Estamos listos para ayudarte!
      </span>
    </a>
  )
}