import Image from "next/image"

export default function ErrorStory() {
  return (
    <section className="relative">

      <div className="relative h-[500px] md:h-[700px]">

        <Image
          src="/error-lavadora.png"
          alt="Electrodoméstico fallando"
          fill
          className="object-cover"
          priority
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center px-6">

          <div className="max-w-4xl text-white">

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              CUANDO FALLA...
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl text-white/90">
              empieza el estrés, la incertidumbre y los gastos inesperados.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}