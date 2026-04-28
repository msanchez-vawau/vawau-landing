"use client"

import Image from "next/image"

export default function HeroVisual() {
  return (
    <section className="relative w-full h-[520px] md:h-[650px] overflow-hidden px-6 md:px-12">

      {/* IMAGE */}
  
<Image
  src="/banner.jpg"
  alt="Centro de servicio autorizado"
  fill
  priority
  quality={100}
  sizes="100vw"
  className="object-cover object-[center_40%]"
/>


  
    </section>
  )
}