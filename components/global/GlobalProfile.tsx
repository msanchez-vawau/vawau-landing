"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  GraduationCap,
  MapPinned,
  Network,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wrench,
  Mail,
  MessageCircle,
} from "lucide-react"

type Language = "en" | "zh" | "es"

type Capability = readonly [string, string]
type Metric = readonly [string, string]

const copy = {
  en: {
    nav: ["Capabilities", "Infrastructure", "Coverage", "Technology"],
    back: "Costa Rica website",
    eyebrow: "COSTA RICA · CENTRAL AMERICA",
    title: "Your After-Sales Partner in Costa Rica",
    intro:
      "VAWAU helps international appliance manufacturers build and operate the local infrastructure that begins after the sale.",
    primary: "Explore our capabilities",
    contact: "Start a conversation",
    proof: "Operational experience since 2002",
    sectionKicker: "ONE LOCAL OPERATING PARTNER",
    sectionTitle: "You manufacture. We support what happens after the sale.",
    sectionBody:
      "Technical execution, warranty workflows, spare parts, logistics, training and operational visibility — coordinated through one Costa Rican operation.",
    capabilities: [
      ["Technical & Warranty Service", "In-home and workshop service, installations, maintenance and manufacturer-aligned warranty workflows."],
      ["Spare Parts Operations", "Import coordination, inventory, dispatch and national distribution with regional experience."],
      ["National Technical Network", "Direct Greater Metropolitan Area operation supported by service allies across Costa Rica."],
      ["Logistics & Reverse Logistics", "Equipment and parts transportation, collections, deliveries and operational documentation."],
      ["Technical Training", "Hands-on product training, workshops, network development and manufacturer-led sessions."],
      ["Technology & Traceability", "Case history, SLA control, evidence, parts workflows and operational reporting through VAWAU CORE®."],
    ] as const satisfies readonly Capability[],
    numbersTitle: "A local operation built for manufacturers",
    numbers: [
      ["2002", "Operating since"],
      ["10,000+", "Service cases / year"],
      ["25–30", "Technical network"],
      ["7", "Service allies"],
      ["100%", "Costa Rica reach"],
      ["72 h", "Target SLA · GAM"],
      ["1,200 m²", "Physical infrastructure"],
      ["5,600+", "Spare-parts SKUs"],
      ["550+ / month", "Spare-parts orders"],
      ["10 years", "Parts import & distribution experience"],
      ["8 + FUSO", "Vehicles · 5.7-ton truck"],
      ["300+ / month", "National shipments"],
      ["250+", "Regional shipments"],
      ["4,000+", "Reverse-logistics units processed"],
    ] as const satisfies readonly Metric[],
    infraKicker: "LOCAL INFRASTRUCTURE",
    infraTitle: "More than a service center.",
    infraBody:
      "Our San José operation combines customer support, technical execution, spare-parts handling, training and meeting space for manufacturer teams.",
    headquarters: "VAWAU Headquarters · San José, Costa Rica",
    training: "Technical training center",
    warehouse: "Spare-parts warehouse & dispatch",
    meeting: "Manufacturer meeting space",
    lobby: "Corporate reception & operation",
    coverageKicker: "NATIONAL COVERAGE · LOCAL EXECUTION",
    coverageTitle: "One operating model across Costa Rica.",
    coverageBody:
      "Direct operations in San José, Alajuela, Cartago and Heredia, supported by regional service allies in Guanacaste, Puntarenas and Limón.",
    coverageNote: "Target SLA in the Greater Metropolitan Area: 72 hours",
    coverageCountry: "COSTA RICA",
    techKicker: "TECHNOLOGY & OPERATIONAL VISIBILITY",
    techTitle: "VAWAU CORE®",
    techBody:
      "Our proprietary platform under development is designed to connect customer and asset history, cases, SLA, technical evidence, parts, logistics and operational reporting.",
    coreStatus: "IN DEVELOPMENT",
    coreCards: [["SLA", "CONTROL"], ["CASES", "TRACEABILITY"], ["PARTS", "WORKFLOWS"], ["EVIDENCE", "HISTORY"]] as const satisfies readonly Metric[],
    partnerKicker: "WHY VAWAU",
    partnerTitle: "Built to adapt to your after-sales model.",
    partnerBody:
      "Every manufacturer operates differently. VAWAU can align workflows, documentation, service levels and operational processes to the requirements of each brand.",
    ctaTitle: "Let’s discuss your after-sales operation in Costa Rica.",
    ctaBody: "Talk directly with our Executive Director.",
    executiveName: "Marco Sanchez Zeledon",
    executiveRole: "Executive Director · VAWAU",
    executiveFocus: "International Business & Manufacturer Partnerships",
    emailMarco: "Email Marco",
    whatsapp: "WhatsApp",
    wechat: "WeChat · Marco Sanchez Zeledon",
    wechatNote: "Connect directly with Marco on WeChat.",
    general: "General Inquiries",
    website: "Visit vawau.com",
    footer: "Soluciones Técnicas Vawau S.A. · San José, Costa Rica",
  },
  zh: {
    nav: ["服务能力", "基础设施", "全国覆盖", "技术平台"],
    back: "哥斯达黎加官网",
    eyebrow: "哥斯达黎加 · 中美洲",
    title: "您在哥斯达黎加的售后服务合作伙伴",
    intro: "VAWAU帮助国际家电制造商建立并运营产品销售后的本地售后服务体系。",
    primary: "了解我们的服务能力",
    contact: "洽谈合作",
    proof: "自2002年持续运营",
    sectionKicker: "一站式本地运营合作伙伴",
    sectionTitle: "您专注于制造，我们负责本地售后服务。",
    sectionBody: "技术服务、保修流程、零配件、物流、培训及运营可视化，由哥斯达黎加本地团队统一协调。",
    capabilities: [
      ["技术与保修服务", "提供上门及维修中心服务、安装、维护，并配合制造商的保修流程。"],
      ["零配件运营", "进口协调、库存管理、出库配送，并具备区域运营经验。"],
      ["全国技术服务网络", "大都会区直营服务，并由哥斯达黎加各地区服务合作伙伴提供支持。"],
      ["物流与逆向物流", "设备及零配件运输、收取、配送以及相关运营文件管理。"],
      ["技术培训", "产品实操培训、技术研讨、服务网络发展及制造商主导培训。"],
      ["技术与运营追踪", "通过VAWAU CORE®管理服务记录、SLA、技术证据、零配件流程及运营报告。"],
    ] as const satisfies readonly Capability[],
    numbersTitle: "为制造商打造的本地运营能力",
    numbers: [
      ["2002", "开始运营"],
      ["10,000+", "年度服务案例"],
      ["25–30", "技术服务网络"],
      ["7", "服务合作伙伴"],
      ["100%", "哥斯达黎加覆盖"],
      ["72小时", "大都会区目标SLA"],
      ["1,200 m²", "实体基础设施"],
      ["5,600+", "零配件SKU"],
      ["550+ / 月", "零配件订单"],
      ["10年", "零配件进口与分销经验"],
      ["8辆 + FUSO", "车辆 · 5.7吨卡车"],
      ["300+ / 月", "全国配送"],
      ["250+", "区域配送"],
      ["4,000+", "逆向物流处理单位"],
    ] as const satisfies readonly Metric[],
    infraKicker: "本地基础设施",
    infraTitle: "不仅仅是维修中心。",
    infraBody: "我们位于圣何塞的运营中心集客户支持、技术服务、零配件管理、培训及制造商会议空间于一体。",
    headquarters: "VAWAU 总部 · 哥斯达黎加圣何塞",
    training: "技术培训中心",
    warehouse: "零配件仓储与配送",
    meeting: "制造商会议空间",
    lobby: "企业接待与运营中心",
    coverageKicker: "全国覆盖 · 本地执行",
    coverageTitle: "覆盖哥斯达黎加的统一运营模式。",
    coverageBody: "在圣何塞、阿拉胡埃拉、卡塔戈和埃雷迪亚开展直营服务，并由瓜纳卡斯特、蓬塔雷纳斯和利蒙的区域合作伙伴提供支持。",
    coverageNote: "大都会区目标服务时效：72小时",
    coverageCountry: "哥斯达黎加",
    techKicker: "技术与运营可视化",
    techTitle: "VAWAU CORE®",
    techBody: "我们正在开发的自有平台旨在整合客户与设备历史、服务案例、SLA、技术证据、零配件、物流及运营报告。",
    coreStatus: "开发中",
    coreCards: [["SLA", "控制"], ["案例", "可追溯性"], ["配件", "流程"], ["证据", "历史"]] as const satisfies readonly Metric[],
    partnerKicker: "为什么选择VAWAU",
    partnerTitle: "适配您的售后运营模式。",
    partnerBody: "不同制造商拥有不同的运营要求。VAWAU可根据各品牌需求调整工作流程、文件标准、服务水平及运营流程。",
    ctaTitle: "让我们一起探讨您在哥斯达黎加的售后服务运营。",
    ctaBody: "欢迎直接与VAWAU执行董事沟通。",
    executiveName: "Marco Sanchez Zeledon",
    executiveRole: "执行董事 · VAWAU",
    executiveFocus: "国际业务与制造商合作",
    emailMarco: "联系Marco",
    whatsapp: "WhatsApp",
    wechat: "微信 · Marco Sanchez Zeledon",
    wechatNote: "可通过微信直接联系 Marco。",
    general: "一般咨询",
    website: "访问 vawau.com",
    footer: "Soluciones Técnicas Vawau S.A. · 哥斯达黎加圣何塞",
  },
  es: {
    nav: ["Capacidades", "Infraestructura", "Cobertura", "Tecnología"],
    back: "Sitio de Costa Rica",
    eyebrow: "COSTA RICA · CENTROAMÉRICA",
    title: "Su socio de postventa en Costa Rica",
    intro:
      "VAWAU ayuda a fabricantes internacionales de electrodomésticos a construir y operar la infraestructura local que comienza después de la venta.",
    primary: "Conozca nuestras capacidades",
    contact: "Iniciar una conversación",
    proof: "Experiencia operativa desde 2002",
    sectionKicker: "UN SOCIO LOCAL DE OPERACIÓN",
    sectionTitle: "Usted fabrica. Nosotros apoyamos lo que sucede después de la venta.",
    sectionBody:
      "Ejecución técnica, garantías, repuestos, logística, capacitación y visibilidad operacional, coordinados desde una sola operación en Costa Rica.",
    capabilities: [
      ["Servicio técnico y garantías", "Servicio a domicilio y en taller, instalaciones, mantenimiento y gestión de garantías alineada con cada fabricante."],
      ["Operación de repuestos", "Coordinación de importación, inventario, despacho y distribución nacional con experiencia regional."],
      ["Red técnica nacional", "Operación directa en la Gran Área Metropolitana, respaldada por aliados de servicio en todo Costa Rica."],
      ["Logística y logística inversa", "Transporte de equipos y repuestos, recolecciones, entregas y documentación operacional."],
      ["Capacitación técnica", "Capacitación práctica de producto, talleres, desarrollo de red y sesiones dirigidas por fabricantes."],
      ["Tecnología y trazabilidad", "Historial de casos, control de SLA, evidencia técnica, flujos de repuestos y reportes operacionales mediante VAWAU CORE®."],
    ] as const satisfies readonly Capability[],
    numbersTitle: "Una operación local construida para fabricantes",
    numbers: [
      ["2002", "Operando desde"],
      ["10,000+", "Casos de servicio / año"],
      ["25–30", "Red técnica"],
      ["7", "Aliados de servicio"],
      ["100%", "Cobertura Costa Rica"],
      ["72 h", "SLA objetivo · GAM"],
      ["1,200 m²", "Infraestructura física"],
      ["5,600+", "SKU de repuestos"],
      ["550+ / mes", "Pedidos de repuestos"],
      ["10 años", "Experiencia en importación y distribución de repuestos"],
      ["8 + FUSO", "Vehículos · camión de 5.7 toneladas"],
      ["300+ / mes", "Envíos nacionales"],
      ["250+", "Envíos regionales"],
      ["4,000+", "Unidades procesadas en logística inversa"],
    ] as const satisfies readonly Metric[],
    infraKicker: "INFRAESTRUCTURA LOCAL",
    infraTitle: "Más que un centro de servicio.",
    infraBody: "Nuestra operación en San José integra atención, ejecución técnica, repuestos, capacitación y espacios de reunión para equipos de fabricantes.",
    headquarters: "Sede de VAWAU · San José, Costa Rica",
    training: "Centro de capacitación técnica",
    warehouse: "Bodega y despacho de repuestos",
    meeting: "Sala para fabricantes",
    lobby: "Recepción y operación corporativa",
    coverageKicker: "COBERTURA NACIONAL · EJECUCIÓN LOCAL",
    coverageTitle: "Un modelo operativo en todo Costa Rica.",
    coverageBody: "Operación directa en San José, Alajuela, Cartago y Heredia, respaldada por aliados regionales de servicio en Guanacaste, Puntarenas y Limón.",
    coverageNote: "SLA objetivo en la Gran Área Metropolitana: 72 horas",
    coverageCountry: "COSTA RICA",
    techKicker: "TECNOLOGÍA Y VISIBILIDAD OPERACIONAL",
    techTitle: "VAWAU CORE®",
    techBody: "Nuestra plataforma tecnológica propia, actualmente en desarrollo, está diseñada para conectar historial de clientes y activos, casos, SLA, evidencia técnica, repuestos, logística e indicadores operacionales.",
    coreStatus: "EN DESARROLLO",
    coreCards: [["SLA", "CONTROL"], ["CASOS", "TRAZABILIDAD"], ["REPUESTOS", "FLUJOS"], ["EVIDENCIA", "HISTORIAL"]] as const satisfies readonly Metric[],
    partnerKicker: "POR QUÉ VAWAU",
    partnerTitle: "Diseñado para adaptarse a su modelo de postventa.",
    partnerBody: "Cada fabricante opera de manera diferente. VAWAU puede alinear flujos, documentación, niveles de servicio y procesos operativos con los requerimientos de cada marca.",
    ctaTitle: "Conversemos sobre su operación de posventa en Costa Rica.",
    ctaBody: "Hable directamente con nuestro Director Ejecutivo.",
    executiveName: "Marco Sanchez Zeledon",
    executiveRole: "Director Ejecutivo · VAWAU",
    executiveFocus: "Negocios Internacionales y Alianzas con Fabricantes",
    emailMarco: "Contactar a Marco",
    whatsapp: "WhatsApp",
    wechat: "WeChat · Marco Sanchez Zeledon",
    wechatNote: "Conecta directamente con Marco por WeChat.",
    general: "Consultas generales",
    website: "Visitar vawau.com",
    footer: "Soluciones Técnicas Vawau S.A. · San José, Costa Rica",
  },
} as const

const icons = [Wrench, Boxes, Network, Truck, GraduationCap, ShieldCheck]

const languageLabels: Record<Language, string> = {
  en: "EN",
  zh: "中文",
  es: "ES",
}

export default function GlobalProfile() {
  const [lang, setLang] = useState<Language>("en")
  const t = copy[lang]

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang
  }, [lang])

  return (
    <main className="global-page min-h-screen bg-white text-[#17233b]">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:px-8">
          <Link href="/" aria-label="VAWAU home" className="shrink-0">
            <Image src="/logo-horizontal.png" alt="VAWAU" width={174} height={55} className="h-auto w-[122px] sm:w-[145px] md:w-[174px]" priority />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex">
            {t.nav.map((item, index) => (
              <a key={item} href={`#${["capabilities", "infrastructure", "coverage", "technology"][index]}`} className="transition hover:text-[#009aa5]">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center rounded-full border border-slate-200 p-1 text-[11px] font-bold sm:text-xs" aria-label="Language selector">
            {(Object.keys(languageLabels) as Language[]).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLang(language)}
                aria-pressed={lang === language}
                className={`rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 ${lang === language ? "bg-[#183059] text-white" : "text-slate-500"}`}
              >
                {languageLabels[language]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0e2345] text-white">
        <div className="absolute inset-0 opacity-25"><Image src="/global/lobby.png" alt="" fill className="object-cover" priority sizes="100vw" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2345] via-[#0e2345]/95 to-[#0e2345]/45" />
        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center px-5 py-20 sm:min-h-[700px] sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-extrabold tracking-[.18em] text-[#63d3d9] sm:text-sm sm:tracking-[.22em]">{t.eyebrow}</p>
            <h1 className="max-w-4xl text-[2.65rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-7xl">{t.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">{t.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <a href="#capabilities" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#009aa5] px-6 py-3.5 font-bold text-white transition hover:bg-[#208790]">{t.primary}<ArrowRight size={18} /></a>
              <a href="mailto:msanchez@vawau.com" className="inline-flex justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/20">{t.contact}</a>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm font-semibold text-white/65"><CheckCircle2 size={17} className="shrink-0 text-[#63d3d9]" />{t.proof}</p>
          </div>
        </div>
      </section>

      <section id="capabilities" className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-[#009aa5] sm:text-sm sm:tracking-[.18em]">{t.sectionKicker}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#183059] sm:text-4xl md:text-5xl">{t.sectionTitle}</h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.sectionBody}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.capabilities.map(([title, body], index) => {
            const Icon = icons[index]
            return <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(24,48,89,.07)] sm:p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f7f7] text-[#009aa5]"><Icon size={24} /></div><h3 className="text-lg font-extrabold text-[#183059] sm:text-xl">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></article>
          })}
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-[#183059] sm:text-4xl">{t.numbersTitle}</h2>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {t.numbers.map(([value, label]) => <div key={`${value}-${label}`} className="flex min-h-[122px] flex-col justify-center rounded-2xl bg-white px-3 py-6 text-center shadow-sm sm:px-4"><div className="text-2xl font-black leading-tight text-[#273983] sm:text-3xl">{value}</div><div className="mt-2 text-xs font-semibold leading-5 text-slate-500 sm:text-sm">{label}</div></div>)}
          </div>
        </div>
      </section>

      <section id="infrastructure" className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-12">
          <div><p className="text-xs font-extrabold tracking-[.16em] text-[#009aa5] sm:text-sm sm:tracking-[.18em]">{t.infraKicker}</p><h2 className="mt-4 text-3xl font-extrabold text-[#183059] sm:text-4xl md:text-5xl">{t.infraTitle}</h2><p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.infraBody}</p></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <figure className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/global/headquarters.jpg" alt={t.headquarters} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 65vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-14 text-sm font-bold text-white sm:text-base">{t.headquarters}</div>
            </figure>
            {[
              ["/global/training.jpg", t.training],
              ["/global/warehouse.png", t.warehouse],
              ["/global/meeting-room.png", t.meeting],
              ["/global/lobby.png", t.lobby],
            ].map(([src, label]) => (
              <figure key={src} className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={src} alt={label} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 50vw, 32vw" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 text-xs font-bold text-white sm:p-5 sm:pt-12 sm:text-base">{label}</div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="coverage" className="bg-[#183059] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          <div><p className="text-xs font-extrabold tracking-[.16em] text-[#63d3d9] sm:text-sm sm:tracking-[.18em]">{t.coverageKicker}</p><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">{t.coverageTitle}</h2><p className="mt-5 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{t.coverageBody}</p><p className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><MapPinned size={18} className="shrink-0 text-[#63d3d9]" />{t.coverageNote}</p></div>
          <div className="rounded-[2rem] border border-white/15 bg-white/5 p-6 sm:p-8 md:p-10"><div className="mx-auto flex aspect-square max-w-[420px] items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle,rgba(0,154,165,.22),transparent_65%)]"><div className="text-center"><MapPinned className="mx-auto text-[#63d3d9]" size={56}/><div className="mt-5 text-5xl font-black sm:text-6xl">100%</div><div className="mt-2 text-xs font-bold tracking-[.18em] text-white/60 sm:text-sm sm:tracking-[.2em]">{t.coverageCountry}</div></div></div></div>
        </div>
      </section>

      <section id="technology" className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-[#f4f7fa] p-6 sm:gap-10 sm:p-8 md:p-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div><p className="text-xs font-extrabold tracking-[.16em] text-[#009aa5] sm:text-sm sm:tracking-[.18em]">{t.techKicker}</p><h2 className="mt-4 text-4xl font-black text-[#183059] sm:text-5xl">{t.techTitle}</h2><p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.techBody}</p></div>
          <div className="rounded-3xl bg-[#0e2345] p-5 text-white shadow-2xl sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><span className="font-bold">VAWAU CORE®</span><span className="rounded-full bg-[#009aa5]/20 px-3 py-1 text-xs font-bold text-[#63d3d9]">{t.coreStatus}</span></div><div className="grid grid-cols-2 gap-3">{t.coreCards.map(([a,b]) => <div key={a} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"><div className="text-xl font-black text-[#63d3d9] sm:text-2xl">{a}</div><div className="mt-1 text-[10px] font-bold tracking-wider text-white/45 sm:text-xs">{b}</div></div>)}</div><div className="mt-4 h-20 rounded-2xl bg-[linear-gradient(135deg,rgba(0,154,165,.2),rgba(39,57,131,.25))] p-4 sm:h-24"><div className="h-full rounded-xl border border-dashed border-white/15" /></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:pb-24 lg:px-8"><div className="rounded-[2rem] border border-slate-200 p-7 sm:p-8 md:p-12"><p className="text-xs font-extrabold tracking-[.16em] text-[#009aa5] sm:text-sm sm:tracking-[.18em]">{t.partnerKicker}</p><h2 className="mt-4 max-w-3xl text-3xl font-extrabold text-[#183059] sm:text-4xl md:text-5xl">{t.partnerTitle}</h2><p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{t.partnerBody}</p><div className="mt-8 flex flex-wrap gap-4 text-sm font-bold text-[#183059]">{[PackageCheck, Truck, GraduationCap, Network].map((Icon,i)=><span key={i} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7f7] text-[#009aa5]"><Icon size={21}/></span>)}</div></div></section>

      <section className="bg-[#009aa5] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{t.ctaBody}</p>
          </div>

          <div className="mx-auto mt-9 overflow-hidden rounded-[2rem] bg-white text-[#183059] shadow-[0_24px_70px_rgba(7,22,44,.16)]">
            <div className="grid lg:grid-cols-[1.25fr_.75fr]">
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#009aa5]">{t.executiveRole}</p>
                    <p className="mt-2 text-2xl font-black sm:text-3xl">{t.executiveName}</p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">{t.executiveFocus}</p>
                  </div>
                  <div className="shrink-0 rounded-full bg-[#e8f7f7] px-4 py-2 text-xs font-extrabold text-[#009aa5]">+506 8358-2995</div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href="mailto:msanchez@vawau.com" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#183059] px-5 py-3.5 font-extrabold text-white transition hover:bg-[#102545]"><Mail size={18} />{t.emailMarco}</a>
                  <a href="https://wa.me/50683582995?text=Hello%20Marco%2C%20I%20found%20VAWAU%20through%20your%20international%20profile%20and%20would%20like%20to%20discuss%20a%20potential%20business%20partnership." target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#183059]/15 px-5 py-3.5 font-extrabold text-[#183059] transition hover:border-[#009aa5] hover:text-[#009aa5]"><MessageCircle size={18} />{t.whatsapp}</a>
                </div>
              </div>

              <div className="grid border-t border-slate-200 lg:border-l lg:border-t-0 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex items-center gap-5 p-6 sm:p-7">
                  <div className="shrink-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                    <Image src="/global/wechat-qr.png" alt="WeChat QR code for Marco Sanchez Zeledon" width={112} height={112} className="h-28 w-28" />
                  </div>
                  <div>
                    <p className="text-lg font-black">{t.wechat}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{t.wechatNote}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center border-t border-slate-200 p-6 sm:p-7 lg:border-t">
                  <p className="text-lg font-black">{t.general}</p>
                  <a href="mailto:info@vawau.com" className="mt-2 w-fit font-bold text-[#009aa5] underline decoration-[#009aa5]/30 underline-offset-4">info@vawau.com</a>
                  <a href="https://www.vawau.com" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#183059]/15 px-5 py-3 text-sm font-extrabold text-[#183059] transition hover:border-[#009aa5] hover:text-[#009aa5]">{t.website}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#07162c] px-5 py-10 text-white"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left"><Image src="/logo-horizontal.png" alt="VAWAU" width={150} height={48} className="brightness-0 invert" /><div><p className="text-sm text-white/60">{t.footer}</p><p className="mt-1 text-sm font-semibold">+506 4000-2829 · info@vawau.com · www.vawau.com</p></div><Link href="/" className="text-sm font-bold text-[#63d3d9]">{t.back} →</Link></div></footer>
    </main>
  )
}
