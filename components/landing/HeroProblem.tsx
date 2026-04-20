import Image from "next/image"

export default function FailureHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">

      {/* IMAGE */}
      <Image
        src="/error-lavadora.png"
        alt="Electrodoméstico fallando"
        fill
        priority
        className="object-cover"
      />

      {/* DARK OVERLAY (más fuerte que el anterior) */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
          CUANDO FALLA...
        </h2>

        <p className="text-white/80 text-lg md:text-xl max-w-xl">
          empieza el estrés, la incertidumbre y los gastos inesperados
        </p>

      </div>

    </section>
  )
}