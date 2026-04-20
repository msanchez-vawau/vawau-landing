"use client"

import Image from "next/image"

export default function Authority() {
  return (
    <section className="bg-gray-50 py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
         <h2 className="text-3xl md:text-5xl font-bold">
          Centro de servicio autorizado
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Técnicos certificados, repuestos originales y respaldo real en cada servicio.
        </p>

        {/* AUTORIZADAS */}
        <div className="mb-16">
          <p className="text-sm text-gray-500 mb-8">
            Marcas autorizadas
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-8 justify-items-center items-center">

            <Image src="/brands/electrolux.png" alt="Electrolux" width={140} height={60} />
            <Image src="/brands/whirlpool.png" alt="Whirlpool" width={140} height={60} />
            <Image src="/brands/frigidaire.png" alt="Frigidaire" width={140} height={60} />
            <Image src="/brands/panasonic.png" alt="Panasonic" width={140} height={60} />
            <Image src="/brands/oster.png" alt="Oster" width={140} height={60} />
            <Image src="/brands/acros.png" alt="Acros" width={140} height={60} />

            {/* FILA CENTRADA */}
            <div className="col-span-full flex justify-center gap-16 mt-4">
              <Image src="/brands/white-westinghouse.png" alt="White Westinghouse" width={140} height={60} />
              <Image src="/brands/kitchen-aid.png" alt="Kitchen Aid" width={140} height={60} />
            </div>

          </div>
        </div>

  {/* EXPERIENCIA */}
<div>
  <p className="text-sm text-gray-400 mb-8">
    Experiencia con otras marcas
  </p>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-8 gap-x-6 justify-items-center items-center">

    <Image src="/brands/bosch.png" alt="Bosch" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/mabe.png" alt="Mabe" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/lg.png" alt="LG" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/ge.png" alt="GE" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/cafe.png" alt="Cafe" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/monogram.png" alt="Monogram" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />

    <Image src="/brands/sub-zero.png" alt="SubZero" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/wolf.png" alt="Wolf" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/u-line.png" alt="U-Line" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/smeg.png" alt="Smeg" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/haier.png" alt="Haier" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/faber.png" alt="Faber" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />

    <Image src="/brands/jura.png" alt="Jura" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/coyote.png" alt="Coyote" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/cuisinart.png" alt="Cuisinart" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />
    <Image src="/brands/thermador.png" alt="Thermador" width={110} height={50} className="opacity-40 hover:opacity-100 transition duration-300" />

  </div>
</div>

      </div>
    </section>
  )
}