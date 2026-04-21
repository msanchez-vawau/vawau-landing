import type { Metadata } from "next"
import { Montserrat, Saira_Stencil_One } from "next/font/google"
import Script from "next/script"
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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JF8B99GGR0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JF8B99GGR0');
          `}
        </Script>

      </body>
    </html>
  )
}