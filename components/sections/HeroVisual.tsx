"use client"

import Image from "next/image"
import banner from "@/public/banner.jpg"

export default function HeroVisual() {
  return (
    <section className="w-full">

      {/* IMAGE */}
  
<Image
  src={banner}
  alt="Centro de servicio autorizado"
  priority
  quality={100}
  sizes="100vw"
  className="block h-auto w-full"
/>


  
    </section>
  )
}
