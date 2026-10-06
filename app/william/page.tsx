import type { Metadata } from "next"
import WilliamProfile from "@/components/william/WilliamProfile"

export const metadata: Metadata = {
  title: "William Cortés Bolaños | WILCOR",
  description:
    "Director / Business Owner · Private Label · Import · Commercial & Residential Refrigeration",
}

export default function WilliamPage() {
  return <WilliamProfile />
}