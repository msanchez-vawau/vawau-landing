import Image from "next/image"

export default function Brands() {
  return (
    <section className="bg-primary text-white py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Trabajamos con marcas reconocidas
        </h2>

        <p className="text-white/80 mb-12">
          Experiencia con equipos de las principales marcas del mercado.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">

          <Image src="/brands/electrolux.png" alt="Electrolux" width={120} height={60} />
          <Image src="/brands/whirlpool.png" alt="Whirlpool" width={120} height={60} />
          <Image src="/brands/frigidaire.png" alt="Frigidaire" width={120} height={60} />
          <Image src="/brands/panasonic.png" alt="Panasonic" width={120} height={60} />
          <Image src="/brands/bosch.png" alt="Bosch" width={120} height={60} />
          <Image src="/brands/oster.png" alt="Oster" width={120} height={60} />
          <Image src="/brands/thermador.png" alt="Thermador" width={120} height={60} />
          <Image src="/brands/gaggenau.png" alt="Gaggenau" width={120} height={60} />

        </div>

      </div>

    </section>
  )
}