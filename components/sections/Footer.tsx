import { FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"
import { Wrench } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 text-center">

      {/* COPYRIGHT */}
      <p className="mb-6 text-sm">
        © {new Date().getFullYear()} Vawau® — Servicio técnico profesional
      </p>

      {/* CONTACTO NUEVO */}
      <div className="flex flex-col items-center gap-2 text-white/80 text-sm mb-8">

        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-xs" />
          <span>(506) 4000-2829</span>
        </div>

        <div className="flex items-center gap-2 text-center max-w-xs">
          <FaMapMarkerAlt className="text-xs" />
          <span>
            Costa Rica, San José, Goicoechea, Guadalupe <br />
            500 este de Walmart
          </span>
        </div>

      </div>

     {/* REDES */}
<div className="mt-4 flex justify-center">
  <div className="flex flex-wrap justify-center gap-4">

    <a
      href="https://www.facebook.com/Stvawau"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl text-white text-sm transition"
    >
      <FaFacebookF className="text-lg" />
      Facebook
    </a>

    <a
      href="https://www.instagram.com/stvawau"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl text-white text-sm transition"
    >
      <FaInstagram className="text-lg" />
      Instagram
    </a>

    <a
      href="https://app.vawau.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl text-white text-sm transition"
    >
      <Wrench className="w-4 h-4" />
      Plataforma
    </a>

    {/* GOOGLE MAPS */}
    <a
      href="https://maps.app.goo.gl/JZ4q66zbk2uM7e3z7"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl text-white text-sm transition"
    >
      📍 Google Maps
    </a>

    {/* WHATSAPP */}
    <a
      href="https://wa.me/50685300201"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl text-white text-sm font-semibold transition"
    >
      💬 Whatssapp
    </a>

  </div>
</div>

    </footer>
  )
}