import type { Metadata } from "next"
import MarcoProfile from "@/components/marco/MarcoProfile"

export const metadata: Metadata = {
  title: "Marco Sanchez Zeledon | VAWAU",
  description:
    "Executive Director at VAWAU · International Business & Manufacturer Partnerships",
}

export default function MarcoPage() {
  return <MarcoProfile />
}