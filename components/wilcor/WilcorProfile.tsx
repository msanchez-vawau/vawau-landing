"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Globe2,
  Mail,
  MapPinned,
  MessageCircle,
  PackageCheck,
  Store,
  Truck,
  Warehouse,
  Wrench,
} from "lucide-react"

type Language = "es" | "en" | "zh"

const copy = {
  es: {
    nav: ["Quiénes somos", "WILCOR", "Alianzas", "Cobertura", "Contacto"],
    eyebrow: "COSTA RICA · DESDE 2015",
    titleA: "Soluciones en refrigeración",
    titleB: "y electrodomésticos",
    intro:
      "Experiencia comercial en Costa Rica desde 2015, con tiendas físicas, bodegas y logística propia. Hoy damos el siguiente paso: desarrollar WILCOR como nuestra marca propia.",
    primary: "Conoce WILCOR",
    secondary: "Trabajemos juntos",
    proof: "Experiencia real en el mercado costarricense desde 2015",

    aboutKicker: "QUIÉNES SOMOS",
    aboutTitle: "Experiencia real en el mercado costarricense",
    aboutBody:
      "Nuestro negocio comenzó en Costa Rica en 2015. Hoy contamos con cuatro tiendas físicas ubicadas en San José y Alajuela, además de bodegas y capacidad propia para entrega y logística de mercadería.",
    stores: "4 tiendas físicas",
    warehouses: "Bodegas propias",
    logistics: "Logística y entrega",
    since: "Desde 2015",
    storesTitle: "Operaciones comerciales reales",
    storesBody:
      "Nuestra experiencia nace del contacto directo con el mercado, los productos y los consumidores costarricenses.",
    losAngeles: "Equipo de Frío Los Ángeles",
    corso: "Equipo Frío Corso",
    outlet: "La Bodega Outlet",

    brandKicker: "NUESTRA MARCA",
    brandTitle: "El próximo paso es WILCOR",
    brandBody:
      "Estamos desarrollando WILCOR como nuestra marca propia de electrodomésticos y refrigeración para Costa Rica. Nuestro objetivo es trabajar directamente con fabricantes calificados para desarrollar e importar productos bajo la marca WILCOR.",
    visionNote: "Visualización conceptual de la futura línea WILCOR",
    categoriesTitle: "Una marca pensada para hogar y comercio",
    categories: [
      "Refrigeradoras",
      "Congeladores",
      "Vitrinas y refrigeración comercial",
      "Electrodomésticos para el hogar",
      "Equipos para comercio",
    ],

    partnerKicker: "CANTON FAIR · CHINA",
    partnerTitle: "Buscamos socios fabricantes en China",
    partnerBody:
      "No buscamos únicamente comprar productos. Queremos construir relaciones de largo plazo con fabricantes capaces de acompañar el desarrollo de WILCOR para el mercado costarricense.",
    partnership: [
      "OEM / ODM y marca propia",
      "Desarrollo de productos",
      "Importación directa",
      "Relaciones comerciales a largo plazo",
    ],
    partnerCta: "Conversemos",

    networkKicker: "RESPALDO POSVENTA",
    networkTitle: "Red de servicio técnico en todo Costa Rica",
    networkBody:
      "El desarrollo de WILCOR contempla una estructura de soporte posventa con cobertura nacional para acompañar el producto después de la venta.",
    networkItems: [
      "Servicio técnico",
      "Cobertura nacional",
      "Soporte posventa",
      "Soporte de repuestos",
    ],
    country: "COSTA RICA",
    coverage: "Cobertura técnica nacional",

    contactKicker: "CONTACTO DIRECTO",
    contactTitle: "Construyamos una relación comercial.",
    contactBody:
      "Estamos interesados en conocer fabricantes y desarrollar oportunidades de marca propia para Costa Rica.",
    person: "William Cortés Bolaños",
    role: "Director / Empresario",
    focus: "Desarrollo de WILCOR · Importación · Alianzas con fabricantes",
    whatsapp: "WhatsApp",
    email: "Correo",
    wechat: "WeChat",
    wechatNote: "Escanee el código QR para agregar a William en WeChat.",
    location: "San José y Alajuela · Costa Rica",
    footer: "WILCOR · Home & Commercial Appliances",
  },

  en: {
    nav: ["About us", "WILCOR", "Partnerships", "Coverage", "Contact"],
    eyebrow: "COSTA RICA · SINCE 2015",
    titleA: "Refrigeration solutions",
    titleB: "and home appliances",
    intro:
      "Commercial experience in Costa Rica since 2015, with physical stores, warehouses and our own logistics. Today we are taking the next step: developing WILCOR as our own brand.",
    primary: "Discover WILCOR",
    secondary: "Work with us",
    proof: "Real experience in the Costa Rican market since 2015",

    aboutKicker: "WHO WE ARE",
    aboutTitle: "Built from real market experience",
    aboutBody:
      "Our business began in Costa Rica in 2015. Today we operate four physical stores in San José and Alajuela, supported by warehouse infrastructure and our own delivery and logistics capabilities.",
    stores: "4 physical stores",
    warehouses: "Warehousing",
    logistics: "Own logistics",
    since: "Since 2015",
    storesTitle: "Real commercial operations",
    storesBody:
      "Our experience comes from direct contact with the Costa Rican market, products and consumers.",
    losAngeles: "Equipo de Frío Los Ángeles",
    corso: "Equipo Frío Corso",
    outlet: "La Bodega Outlet",

    brandKicker: "OUR BRAND",
    brandTitle: "Our next step is WILCOR",
    brandBody:
      "We are developing WILCOR as our private-label appliance and refrigeration brand for Costa Rica. Our objective is to work directly with qualified manufacturers to develop and import products under the WILCOR brand.",
    visionNote: "Concept visualization of the future WILCOR product line",
    categoriesTitle: "A brand designed for home and business",
    categories: [
      "Refrigerators",
      "Freezers",
      "Commercial display refrigeration",
      "Home appliances",
      "Commercial equipment",
    ],

    partnerKicker: "CANTON FAIR · CHINA",
    partnerTitle: "We are looking for manufacturing partners in China",
    partnerBody:
      "We are not simply looking to purchase products. We want to build long-term relationships with manufacturers capable of supporting the development of WILCOR for the Costa Rican market.",
    partnership: [
      "OEM / ODM & private label",
      "Product development",
      "Direct import",
      "Long-term business relationships",
    ],
    partnerCta: "Let's talk",

    networkKicker: "AFTER-SALES SUPPORT",
    networkTitle: "Nationwide technical service network",
    networkBody:
      "WILCOR's development includes a nationwide after-sales support structure designed to support products throughout their lifecycle.",
    networkItems: [
      "Technical service",
      "Nationwide coverage",
      "After-sales support",
      "Spare-parts support",
    ],
    country: "COSTA RICA",
    coverage: "Nationwide technical coverage",

    contactKicker: "DIRECT CONTACT",
    contactTitle: "Let's build a business relationship.",
    contactBody:
      "We are interested in meeting manufacturers and developing private-label opportunities for Costa Rica.",
    person: "William Cortés Bolaños",
    role: "Director / Business Owner",
    focus: "WILCOR Development · Import · Manufacturer Partnerships",
    whatsapp: "WhatsApp",
    email: "Email",
    wechat: "WeChat",
    wechatNote: "Scan the QR code to add William on WeChat.",
    location: "San José & Alajuela · Costa Rica",
    footer: "WILCOR · Home & Commercial Appliances",
  },

  zh: {
    nav: ["关于我们", "WILCOR", "合作机会", "服务网络", "联系方式"],
    eyebrow: "哥斯达黎加 · 始于2015年",
    titleA: "制冷解决方案",
    titleB: "与家用电器",
    intro:
      "自2015年以来，我们深耕哥斯达黎加家电市场，拥有实体门店、仓储和自有物流体系。现在，我们正在迈出下一步：发展自有品牌 WILCOR。",
    primary: "了解 WILCOR",
    secondary: "与我们合作",
    proof: "自2015年以来深耕哥斯达黎加市场",

    aboutKicker: "关于我们",
    aboutTitle: "源于真实市场经验",
    aboutBody:
      "我们的业务于2015年在哥斯达黎加开始。目前在圣何塞和阿拉胡埃拉拥有四家实体门店，并拥有仓储、配送和物流能力。",
    stores: "4家实体门店",
    warehouses: "仓储设施",
    logistics: "自有物流配送",
    since: "始于2015年",
    storesTitle: "真实的商业运营",
    storesBody:
      "我们的经验来自与哥斯达黎加市场、产品和消费者的直接接触。",
    losAngeles: "Equipo de Frío Los Ángeles",
    corso: "Equipo Frío Corso",
    outlet: "La Bodega Outlet",

    brandKicker: "我们的品牌",
    brandTitle: "下一步：WILCOR",
    brandBody:
      "我们正在将 WILCOR 打造为面向哥斯达黎加市场的自有家电与制冷品牌。我们的目标是与优质制造商直接合作，以 WILCOR 品牌开发和进口产品。",
    visionNote: "WILCOR 未来产品线概念展示",
    categoriesTitle: "面向家庭与商业市场的品牌",
    categories: [
      "冰箱",
      "冷冻柜",
      "商用展示制冷设备",
      "家用电器",
      "商用设备",
    ],

    partnerKicker: "广交会 · 中国",
    partnerTitle: "我们正在中国寻找制造合作伙伴",
    partnerBody:
      "我们的目标不仅是采购产品，更希望与优秀制造商建立长期合作关系，共同发展 WILCOR 在哥斯达黎加市场的业务。",
    partnership: [
      "OEM / ODM 与自有品牌",
      "产品开发",
      "直接进口",
      "长期商业合作",
    ],
    partnerCta: "洽谈合作",

    networkKicker: "售后支持",
    networkTitle: "覆盖哥斯达黎加全国的技术服务网络",
    networkBody:
      "WILCOR 的发展规划包括全国性的售后支持体系，为产品销售后的整个生命周期提供支持。",
    networkItems: [
      "技术服务",
      "全国覆盖",
      "售后支持",
      "零配件支持",
    ],
    country: "哥斯达黎加",
    coverage: "全国技术服务覆盖",

    contactKicker: "直接联系",
    contactTitle: "让我们建立长期商业合作。",
    contactBody:
      "我们希望与制造商建立联系，并共同开发面向哥斯达黎加市场的自有品牌合作机会。",
    person: "William Cortés Bolaños",
    role: "Director / Business Owner",
    focus: "WILCOR 品牌发展 · 进口 · 制造商合作",
    whatsapp: "WhatsApp",
    email: "电子邮件",
    wechat: "微信",
    wechatNote: "扫描二维码添加 William 的微信。",
    location: "圣何塞和阿拉胡埃拉 · 哥斯达黎加",
    footer: "WILCOR · Home & Commercial Appliances",
  },
} as const

const metricsIcons = [Store, Warehouse, Truck, Building2]
const partnerIcons = [Factory, PackageCheck, Globe2, CheckCircle2]
const networkIcons = [Wrench, MapPinned, CheckCircle2, PackageCheck]

export default function WilcorProfile() {
  const [language, setLanguage] = useState<Language>("es")
  const t = copy[language]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <button
            onClick={() => scrollTo("top")}
            className="flex items-center text-left"
            aria-label="WILCOR"
          >
            <Image
              src="/wilcor/logo-wilcor.png"
              alt="WILCOR"
              width={190}
              height={112}
              priority
              className="h-14 w-auto object-contain"
            />
          </button>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 xl:flex">
            {[
              ["about", t.nav[0]],
              ["brand", t.nav[1]],
              ["partners", t.nav[2]],
              ["coverage", t.nav[3]],
              ["contact", t.nav[4]],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="transition hover:text-[#087ac1]"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center rounded-full bg-slate-100 p-1 text-xs font-black">
            {(["es", "en", "zh"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-3 py-2 transition ${
                  language === lang
                    ? "bg-[#087ac1] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#0756a8]"
                }`}
              >
                {lang === "es" ? "ES" : lang === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#f8fcff_0%,#eaf7ff_48%,#d8f1ff_100%)]"
      >
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#3bbcf1]/15 blur-3xl" />
        <div className="absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-white/80 blur-3xl" />

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-20">
          <div className="relative z-10">
            <p className="text-xs font-black tracking-[.18em] text-[#087ac1] sm:text-sm">
              {t.eyebrow}
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[.98] tracking-tight text-[#083568] sm:text-5xl md:text-6xl">
              {t.titleA}
              <span className="block text-[#25a9e8]">{t.titleB}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {t.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("brand")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#087ac1] px-6 py-3.5 font-extrabold text-white shadow-lg shadow-sky-900/10 transition hover:bg-[#075da0]"
              >
                {t.primary}
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollTo("partners")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#087ac1]/30 bg-white/80 px-6 py-3.5 font-extrabold text-[#0756a8] transition hover:border-[#087ac1]"
              >
                {t.secondary}
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm font-bold text-[#0756a8]/70">
              <CheckCircle2 size={18} className="text-[#25a9e8]" />
              {t.proof}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
            <div className="absolute -inset-5 rounded-[3rem] bg-white/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white shadow-[0_30px_90px_rgba(7,86,168,.16)]">
              <Image
                src="/wilcor/wilcor-concept-1.jpg"
                alt="WILCOR brand concept"
                width={1024}
                height={1536}
                priority
                className="h-[520px] w-full object-cover object-top sm:h-[580px]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052e5e]/95 via-[#052e5e]/45 to-transparent px-6 pb-6 pt-24 text-white">
                <p className="text-xs font-black uppercase tracking-[.16em] text-sky-200">
                  WILCOR
                </p>
                <p className="mt-1 text-2xl font-black">Tu mundo más frío</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black tracking-[.18em] text-[#159bd7] sm:text-sm">
              {t.aboutKicker}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#083568] sm:text-4xl md:text-5xl">
              {t.aboutTitle}
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {t.aboutBody}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[t.stores, t.warehouses, t.logistics, t.since].map(
              (label, index) => {
                const Icon = metricsIcons[index]
                const values = ["4", "✓", "✓", "2015"]

                return (
                  <div
                    key={label}
                    className="rounded-3xl border border-sky-100 bg-[#f6fbff] p-5 text-center"
                  >
                    <Icon size={27} className="mx-auto text-[#159bd7]" />

                    <div className="mt-3 text-2xl font-black text-[#0756a8]">
                      {values[index]}
                    </div>

                    <div className="mt-1 text-xs font-bold leading-5 text-slate-500">
                      {label}
                    </div>
                  </div>
                )
              },
            )}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-black text-[#083568] sm:text-3xl">
            {t.storesTitle}
          </h3>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            {t.storesBody}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["/wilcor/store-los-angeles.jpg", t.losAngeles, "San José"],
              ["/wilcor/store-corso.jpg", t.corso, "Alajuela"],
              ["/wilcor/store-bodega-outlet.jpg", t.outlet, "Alajuela"],
            ].map(([src, label, location]) => (
              <figure
                key={src}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(8,53,104,.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <figcaption className="p-5">
                  <p className="font-black text-[#083568]">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#159bd7]">
                    {location} · Costa Rica
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="brand" className="bg-[#f3faff] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
            <div>
              <p className="text-xs font-black tracking-[.18em] text-[#159bd7] sm:text-sm">
                {t.brandKicker}
              </p>

              <div className="mt-5">
                <Image
                  src="/wilcor/logo-wilcor.png"
                  alt="WILCOR"
                  width={660}
                  height={392}
                  className="h-auto w-full max-w-[340px] object-contain"
                />
              </div>

              <h2 className="mt-8 text-3xl font-black text-[#083568] sm:text-4xl">
                {t.brandTitle}
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {t.brandBody}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "/wilcor/wilcor-concept-1.jpg",
                "/wilcor/wilcor-concept-2.jpg",
              ].map((src) => (
                <figure
                  key={src}
                  className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_20px_60px_rgba(7,86,168,.12)]"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={src}
                      alt={t.visionNote}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 35vw"
                    />
                  </div>
                </figure>
              ))}

              <p className="text-center text-xs font-semibold text-slate-400 sm:col-span-2">
                {t.visionNote}
              </p>
            </div>
          </div>

          <div className="mt-14 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-center text-2xl font-black text-[#083568]">
              {t.categoriesTitle}
            </h3>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {t.categories.map((item) => (
                <div
                  key={item}
                  className="flex min-h-24 items-center justify-center rounded-2xl border border-sky-100 bg-[#f8fcff] px-4 py-5 text-center text-sm font-extrabold text-[#0756a8]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="partners"
        className="relative overflow-hidden bg-[#06376b] py-20 text-white sm:py-24"
      >
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(37,169,232,.22),transparent_68%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-black tracking-[.18em] text-sky-300 sm:text-sm">
              {t.partnerKicker}
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              {t.partnerTitle}
            </h2>

            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {t.partnerBody}
            </p>

            <button
              onClick={() => scrollTo("contact")}
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25a9e8] px-6 py-3.5 font-black text-white transition hover:bg-[#159bd7]"
            >
              {t.partnerCta}
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.partnership.map((item, index) => {
              const Icon = partnerIcons[index]

              return (
                <div
                  key={item}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur"
                >
                  <Icon size={28} className="text-sky-300" />
                  <p className="mt-5 text-lg font-black">{item}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="coverage"
        className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8"
      >
        <div className="grid gap-10 rounded-[2.5rem] bg-[linear-gradient(135deg,#f5fbff,#e4f5ff)] p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-center lg:p-14">
          <div>
            <p className="text-xs font-black tracking-[.18em] text-[#159bd7] sm:text-sm">
              {t.networkKicker}
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-black text-[#083568] sm:text-4xl md:text-5xl">
              {t.networkTitle}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {t.networkBody}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.networkItems.map((item, index) => {
                const Icon = networkIcons[index]

                return (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 font-extrabold text-[#0756a8] shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#159bd7]">
                      <Icon size={20} />
                    </span>
                    {item}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mx-auto flex aspect-square w-full max-w-[390px] items-center justify-center rounded-full border border-sky-200 bg-white shadow-[0_24px_70px_rgba(7,86,168,.1)]">
            <div className="text-center">
              <MapPinned size={58} className="mx-auto text-[#25a9e8]" />

              <p className="mt-5 text-3xl font-black text-[#0756a8] sm:text-4xl">
                {t.country}
              </p>

              <p className="mx-auto mt-3 max-w-[220px] text-sm font-bold leading-6 text-slate-500">
                {t.coverage}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[linear-gradient(135deg,#087ac1,#0756a8)] px-5 py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black tracking-[.18em] text-sky-200">
              {t.contactKicker}
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              {t.contactTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {t.contactBody}
            </p>
          </div>

          <div className="mx-auto mt-10 overflow-hidden rounded-[2rem] bg-white text-[#083568] shadow-[0_24px_70px_rgba(3,32,67,.22)]">
            <div className="grid lg:grid-cols-[1.25fr_.75fr]">
              <div className="p-6 sm:p-8 md:p-10">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#159bd7]">
                  {t.role}
                </p>

                <p className="mt-2 text-2xl font-black sm:text-3xl">
                  {t.person}
                </p>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  {t.focus}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://wa.me/50685833932"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0756a8] px-5 py-3.5 font-black text-white transition hover:bg-[#063f7a]"
                  >
                    <MessageCircle size={18} />
                    {t.whatsapp} · +506 8583 3932
                  </a>

                  <a
                    href="mailto:Williamcortes89@gmail.com"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#0756a8]/15 px-5 py-3.5 font-black text-[#0756a8] transition hover:border-[#25a9e8]"
                  >
                    <Mail size={18} />
                    {t.email}
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
                  <span>+506 8583 3932</span>
                  <span>+506 6155 5504</span>
                  <span>{t.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-5 border-t border-slate-200 p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div className="shrink-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                  <Image
                    src="/wilcor/wechat-william.jpg"
                    alt="WeChat QR code for William Cortés Bolaños"
                    width={130}
                    height={130}
                    className="h-28 w-28 sm:h-32 sm:w-32"
                  />
                </div>

                <div>
                  <p className="text-xl font-black">{t.wechat}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 sm:text-sm">
                    {t.wechatNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#032443] px-5 py-9 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <Image
            src="/wilcor/logo-wilcor.png"
            alt="WILCOR"
            width={170}
            height={101}
            className="h-14 w-auto rounded-md bg-white object-contain px-2"
          />

          <div>
            <p className="text-sm text-white/60">{t.footer}</p>
            <p className="mt-1 text-sm font-semibold">
              Costa Rica · San José · Alajuela
            </p>
          </div>

          <button
            onClick={() => scrollTo("top")}
            className="text-sm font-black text-sky-300"
          >
            WILCOR ↑
          </button>
        </div>
      </footer>
    </main>
  )
}