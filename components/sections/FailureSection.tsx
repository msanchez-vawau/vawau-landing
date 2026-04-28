"use client"

import Image from "next/image"

export default function BannerSection() {
  return (
<section className="w-full bg-white flex justify-center">

  {/* IMAGE CONTROLADA */}
 
<Image
  src="/banner-web-2.png"
  alt="VAWAU banner"
  width={1920}
  height={900}
  priority
  className="w-full h-auto"
/>


      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        </div>

    </section>
  )
}