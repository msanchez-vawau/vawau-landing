import type { Metadata } from "next"
import WilcorProfile from "@/components/wilcor/WilcorProfile"

export const metadata: Metadata = {
  title: "WILCOR | Electrodomésticos y Refrigeración en Costa Rica",
  description:
    "WILCOR desarrolla una nueva marca costarricense de electrodomésticos y refrigeración, respaldada por experiencia comercial desde 2015, tiendas físicas, bodegas, logística y cobertura técnica nacional.",
}

export default function WilcorPage() {
  return <WilcorProfile />
}
