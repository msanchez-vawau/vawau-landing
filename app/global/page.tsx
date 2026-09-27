import type { Metadata } from "next"
import GlobalProfile from "@/components/global/GlobalProfile"

export const metadata: Metadata = {
  title: "VAWAU® | After-Sales Partner in Costa Rica",
  description:
    "VAWAU supports international appliance manufacturers in Costa Rica with technical service, warranty operations, spare parts, logistics, training and operational technology.",
}

export default function GlobalPage() {
  return <GlobalProfile />
}
