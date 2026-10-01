import HeroVisual from "../components/sections/HeroVisual"
import FailureSection from "../components/sections/FailureSection"
import SolutionSection from "../components/sections/SolutionSection"
import SpareParts from "../components/sections/SpareParts"
import Authority from "../components/sections/Authority"
import FinalCTA from "../components/sections/FinalCTA"
import Footer from "../components/sections/Footer"
import MissionSection from "../components/sections/MissionSection"
import ServicesSection from "../components/sections/ServicesSection"
import InstallationEntry from "../components/sections/InstallationEntry"


export default function Home() {
  return (
    <main className="w-full overflow-x-hidden pb-28">

      {/* HERO */}
      <HeroVisual />
      <InstallationEntry />

      {/* PROBLEMA */}
      <FailureSection />

      {/* SOLUCIÓN */}
      <SolutionSection />

      {/* MISION */}
      <MissionSection /> 

       {/* SERVICIO */}
      <ServicesSection />

     {/* AUTORIDAD */}
      <Authority />

      {/* CTA FINAL */}
      <FinalCTA />

      <Footer />

    </main>
  )
}
