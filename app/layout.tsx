import type { Metadata } from "next"
import { Montserrat, Saira_Stencil_One } from "next/font/google"
import "./globals.css"
import WhatsAppFloat from "@/components/ui/WhatsAppFloat"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
})

const saira = Saira_Stencil_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
})

export const metadata: Metadata = {
  title: "Vawau®",
  description: "Reparación de electrodomésticos a domicilio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${saira.variable}`}
    >
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}