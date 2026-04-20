export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">

          <div>
            <h3 className="font-bold text-lg mb-2">VAWAU</h3>
            <p className="text-white/70 max-w-sm">
              Servicio técnico especializado en electrodomésticos, con respaldo real y atención profesional.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contacto</h4>
            <p className="text-white/70">(506) 4000-2829</p>
            <p className="text-white/70">info@vawau.com</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Ubicación</h4>
            <p className="text-white/70">
              San José, Goicoechea, Guadalupe
            </p>
          </div>

        </div>

        {/* LEGAL */}
        <div className="border-t border-white/20 pt-6 text-sm text-white/60 text-center">
          © 2025 VAWAU® — Todos los derechos reservados
        </div>

      </div>
    </footer>
  )
}