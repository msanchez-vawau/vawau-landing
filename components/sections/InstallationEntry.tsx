import Image from "next/image";
import Link from "next/link";
export default function InstallationEntry() {
  return <section className="bg-[#183059] px-6 py-14 text-white sm:px-10 md:py-20 lg:px-16 lg:py-24" aria-labelledby="installation-entry">
    <div className="mx-auto grid max-w-[1600px] items-center gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
      <div><p className="mb-5 text-base font-semibold uppercase tracking-widest text-[#72d6dc] lg:text-lg">Instalación de equipos</p>
        <h2 id="installation-entry" className="title text-4xl leading-[1.08] sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-[80px]">Tu nuevo equipo,<br className="hidden sm:block" /> en buenas manos.</h2>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl xl:text-2xl">¿Tu compra Electrolux o Frigidaire incluye el beneficio de instalación? Consultá las condiciones y solicitá el servicio con VAWAU®.</p>
      </div>
      <div className="w-full max-w-2xl space-y-6 lg:justify-self-end"><div className="grid grid-cols-2 items-center gap-6 rounded-2xl bg-white px-6 py-8 sm:px-8 lg:py-10">
        <Image src="/brands/electrolux.png" alt="Electrolux" width={260} height={100} sizes="(min-width: 1024px) 250px, 40vw" className="h-16 w-full object-contain lg:h-24" />
        <Image src="/brands/frigidaire.png" alt="Frigidaire" width={260} height={100} sizes="(min-width: 1024px) 250px, 40vw" className="h-16 w-full object-contain lg:h-24" />
      </div><Link href="/instalacion" className="block rounded-2xl bg-[#009aa5] px-5 py-6 text-center text-lg font-bold transition hover:bg-[#007b84] sm:text-xl xl:py-7 xl:text-2xl">Solicitar mi instalación →</Link></div>
    </div>
  </section>;
}
