"use client"

import Image from "next/image"

export default function Authority() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Centro de servicio autorizado
        </h2>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Trabajamos con marcas reconocidas y repuestos originales. 
          Tu equipo está en manos profesionales.
        </p>

        {/* AUTORIZADAS */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 mb-6">
            Marcas autorizadas
          </p>

 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-12 gap-x-10 items-center justify-items-center">

  {/* FILA 1 */}
  <Image src="/brands/electrolux.png" alt="Electrolux" width={160} height={80} className="object-contain max-h-[70px]" />
  <Image src="/brands/whirlpool.png" alt="Whirlpool" width={160} height={80} className="object-contain max-h-[70px]" />
  <Image src="/brands/frigidaire.png" alt="Frigidaire" width={160} height={80} className="object-contain max-h-[70px]" />
  <Image src="/brands/panasonic.png" alt="Panasonic" width={160} height={80} className="object-contain max-h-[70px]" />
  <Image src="/brands/oster.png" alt="Oster" width={160} height={80} className="object-contain max-h-[70px]" />
  <Image src="/brands/acros.png" alt="Acros" width={160} height={80} className="object-contain max-h-[70px]" />

  {/* FILA 2 (centrada debajo del medio) */}
  <div className="hidden md:block" /> {/* espacio vacío */}
  <div className="hidden md:block" /> {/* espacio vacío */}

  <Image 
    src="/brands/white-westinghouse.png" 
    alt="White Westinghouse" 
    width={160} 
    height={80} 
    className="object-contain max-h-[70px]" 
  />

  <Image 
    src="/brands/kitchen-aid.png" 
    alt="KitchenAid" 
    width={160} 
    height={80} 
    className="object-contain max-h-[70px]" 
  />

  <div className="hidden md:block" /> {/* espacio vacío */}
  <div className="hidden md:block" /> {/* espacio vacío */}
</div>
        </div>

        {/* EXPERIENCIA */}
        <div>
          <p className="text-sm text-gray-400 mb-6">
            Experiencia con otras marcas
          </p>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-6 opacity-40 hover:opacity-80 transition justify-items-center">

  {/* FILA 1 */}
  <Image src="/brands/bosch.png" alt="Bosch" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/mabe.png" alt="Mabe" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/lg.png" alt="LG" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/ge.png" alt="GE" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/cafe.png" alt="Cafe" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/monogram.png" alt="Monogram" width={110} height={50} className="object-contain max-h-[50px]" />

  {/* FILA 2 */}
  <Image src="/brands/sub-zero.png" alt="SubZero" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/wolf.png" alt="Wolf" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/u-line.png" alt="U-Line" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/smeg.png" alt="Smeg" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/haier.png" alt="Haier" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/faber.png" alt="Faber" width={110} height={50} className="object-contain max-h-[50px]" />

  {/* FILA 3 CENTRADA */}
  <div className="hidden md:block" />
  
  <Image src="/brands/jura.png" alt="Jura" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/coyote.png" alt="Coyote" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/cuisinart.png" alt="Cuisinart" width={110} height={50} className="object-contain max-h-[50px]" />
  <Image src="/brands/thermador.png" alt="Thermador" width={110} height={50} className="object-contain max-h-[50px]" />

  <div className="hidden md:block" />

</div>
        </div>

      </div> {/* 👈 FIX CLAVE */}

    </section>
  )
}