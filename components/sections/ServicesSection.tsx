"use client"

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-6xl mx-auto text-center space-y-8">

        {/* HEADLINE */}
        <h3 className="title !text-[#009aa5] text-3xl sm:text-5xl md:text-6xl font-bold">
          ¡Estamos listos para ayudarte!
        </h3>

        {/* SUBHEAD */}
        <p className="subtitle text-[#5b5e60] text-lg md:text-xl max-w-2xl mx-auto">
          Soluciones completas para tu tranquilidad
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-4 gap-6 items-stretch">

          {/* CARD BASE REUTILIZABLE */}
          {[
            {
              title1: "Reparación de",
              title2: "Electrodomésticos",
              desc: "Servicio a domicilio con técnicos certificados",
             
            },
            {
              title1: "Venta de Repuestos",
              title2: "Originales",
              desc: "Entrega rápida y con garantía",
             
            },
            {
              title1: "Reciclaje y",
              title2: "Renovación",
              desc: "Damos nueva vida a tus electrodomésticos",
             
            },
            {
              title1: "Centro de Servicio",
              title2: "Autorizado",
              desc: "Respaldo de las principales marcas del mercado",
            
            }
          ].map((card, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-white/20 text-center h-full flex flex-col justify-center overflow-hidden"
            >

{/* MOSAICO */}
<div
  className="absolute inset-0 bg-repeat"
  style={{
  backgroundImage: "url('/mosaico-web-2.png')",
  backgroundSize: "160px"
}}
/>

<div className="absolute inset-0 bg-black/5" />

              {/* CONTENT */}
              <div className="relative z-10 text-white">

                <h3 className="subtitle font-bold text-lg leading-tight">
                  <span className="block">{card.title1}</span>
                  <span className="block">{card.title2}</span>
                </h3>

                <p className="subtitle text-white/90 text-sm mt-2">
                  {card.desc}
                </p>

              </div>

            </div>
          ))}

        </div>
   <a
          href="https://wa.me/50685300201?text=Hola,%20estoy%20buscando%20un%20repuesto%20para%20un%20electrodoméstico"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition"
        >
          Cotiza tu repuesto
        </a>

      </div>
     
  

    </section>
  )
}