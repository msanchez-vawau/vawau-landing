import Image from "next/image"

export default function VisualStory() {
  return (
    <section className="relative">

      <div className="relative h-[500px] md:h-[700px]">

        <Image
          src="/hogar-feliz.png"
          alt="Hogar funcionando"
          fill
          className="object-cover"
          priority
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">

          <div className="max-w-4xl text-white">

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              CUANDO TODO FUNCIONA...
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90">
              la familia disfruta sin preocupaciones.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}