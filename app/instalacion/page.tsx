import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import InstallationForm from "@/components/installation/InstallationForm";
import Terms from "@/components/installation/Terms";
import "./installation.css";

export const metadata = { title: "Solicitar instalación | Electrolux y Frigidaire | VAWAU®", description: "Consultá las condiciones y solicitá la instalación de tu equipo Electrolux o Frigidaire con VAWAU®." };

export default async function InstallationPage({ searchParams }: { searchParams: Promise<{ origen?: string }> }) {
  const fromQR = (await searchParams).origen === "qr";
  return <div className="installation-page">
    <a className="installation-skip" href="#solicitud">Ir al formulario</a>
    <header className="installation-header"><div className="installation-container">
      <Link href="/" aria-label="VAWAU — Inicio"><Image src="/logo-horizontal.png" width={190} height={60} alt="VAWAU®" className="installation-logo" priority /></Link>
      <Link href="/">← Volver al inicio</Link>
    </div></header>
    <main>
      {!fromQR && <section className="installation-hero"><div className="installation-container installation-hero-grid">
        <div><p className="installation-eyebrow">ELECTROLUX + FRIGIDAIRE</p><h1 className="title">Estrená tu equipo.<br /><span>Nosotros lo instalamos.</span></h1>
          <p className="installation-lead">Solicitá el beneficio de instalación de tu compra y dejá la coordinación en manos de VAWAU®.</p>
          <a href="#condiciones" className="installation-button">Comenzar solicitud <span aria-hidden="true">→</span></a>
          <p className="installation-small">Sujeto a validación de compra y condiciones del servicio.</p>
        </div>
        <aside className="installation-benefit"><p className="installation-eyebrow">TU INSTALACIÓN CON RESPALDO</p>
          <div className="installation-brands"><Image src="/brands/electrolux.png" alt="Electrolux" width={150} height={56} /><Image src="/brands/frigidaire.png" alt="Frigidaire" width={150} height={56} /></div>
          <h2>Un buen comienzo para tu equipo</h2><p>El beneficio incluye la mano de obra de instalación estándar.</p>
          <div className="installation-divider" /><p className="installation-small">Materiales, accesorios y adecuaciones se cotizan por separado y requieren tu autorización previa.</p>
        </aside>
      </div></section>}
      <div className="installation-container">
        {!fromQR && <ol className="installation-steps" aria-label="Cómo funciona"><li><b>01</b><span>Revisá las condiciones</span></li><li><b>02</b><span>Completá tu solicitud</span></li><li><b>03</b><span>Coordinamos con vos</span></li></ol>}
        <section id="condiciones" className="installation-conditions"><div><p className="installation-eyebrow">ANTES DE COMENZAR</p><h2 className="title">Condiciones del servicio</h2><p>Conocé qué incluye el beneficio y cómo preparar el lugar de instalación.</p></div>
          <details open={fromQR}><summary>Leer Condiciones del Servicio de Instalación <span aria-hidden="true">+</span></summary><Terms /></details>
          {fromQR && <a href="#solicitud" className="installation-button" style={{ marginTop: 20 }}>Continuar al formulario →</a>}
        </section>
        <InstallationForm />
      </div>
    </main><Footer />
  </div>;
}
