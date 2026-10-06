"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Building2,
  Download,
  Globe2,
  Mail,
  MessageCircle,
  Phone,
  Snowflake,
  Store,
  Warehouse,
  Wrench,
} from "lucide-react"

type Language = "es" | "en" | "zh"

const copy = {
  es: {
    role: "Director / Empresario",
    area: "Marca Propia · Importación · Refrigeración Comercial y Residencial",
    save: "Guardar contacto",
    whatsapp: "WhatsApp",
    wechat: "WeChat",
    global: "WILCOR Global",
    email: "Correo",
    call: "Llamar",
    residential: "Refrigeración Residencial",
    commercial: "Refrigeración Comercial",
    privateLabel: "Importación y Marca Propia",
    support: "Servicio Técnico y Soporte",
    since: "Desde",
    stores: "Tiendas Físicas",
    logistics: "Bodegas y Logística Propia",
    coverage: "Cobertura Nacional",
    globalTitle: "Conoce WILCOR Global",
    globalNote: "Productos · categorías · capacidades · desarrollo de marca",
    wechatTitle: "Conectar por WeChat",
    wechatText: "Escanee el código QR para agregarme en WeChat.",
    close: "Cerrar",
    location: "Alajuela y San José, Costa Rica",
  },
  en: {
    role: "Director / Business Owner",
    area: "Private Label · Import · Commercial & Residential Refrigeration",
    save: "Save contact",
    whatsapp: "WhatsApp",
    wechat: "WeChat",
    global: "WILCOR Global",
    email: "Email",
    call: "Call",
    residential: "Residential Refrigeration",
    commercial: "Commercial Refrigeration",
    privateLabel: "Import & Private Label",
    support: "Technical Service & Support",
    since: "Since",
    stores: "Physical Stores",
    logistics: "Warehouses & Own Logistics",
    coverage: "Nationwide Coverage",
    globalTitle: "Discover WILCOR Global",
    globalNote: "Products · categories · capabilities · brand development",
    wechatTitle: "Connect on WeChat",
    wechatText: "Scan the QR code to add me on WeChat.",
    close: "Close",
    location: "Alajuela & San José, Costa Rica",
  },
  zh: {
    role: "董事 / 企业家",
    area: "自有品牌 · 进口 · 商用及家用制冷",
    save: "保存联系人",
    whatsapp: "WhatsApp",
    wechat: "微信",
    global: "WILCOR 全球业务",
    email: "电子邮件",
    call: "拨打电话",
    residential: "家用制冷",
    commercial: "商用制冷",
    privateLabel: "进口与自有品牌",
    support: "技术服务与支持",
    since: "始于",
    stores: "实体门店",
    logistics: "仓储与自有物流",
    coverage: "全国覆盖",
    globalTitle: "了解 WILCOR Global",
    globalNote: "产品 · 品类 · 能力 · 品牌发展",
    wechatTitle: "添加微信",
    wechatText: "扫描二维码添加我的微信。",
    close: "关闭",
    location: "哥斯达黎加 · 阿拉胡埃拉和圣何塞",
  },
} as const

const languages: { code: Language; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
]

export default function WilliamProfile() {
  const [lang, setLang] = useState<Language>("es")
  const [wechatOpen, setWechatOpen] = useState(false)

  const t = copy[lang]

  return (
    <main className="min-h-screen bg-[#eaf6ff] text-[#082a61]">
      <div className="mx-auto w-full max-w-[520px] overflow-hidden bg-white shadow-2xl">
        {/* Hero */}
        <section className="relative h-[390px] overflow-hidden">
          <Image
            src="/wilcor/william-profile.jpg"
            alt="William Cortés Bolaños - WILCOR"
            fill
            priority
            className="object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/95" />

          <div className="absolute right-4 top-4 flex rounded-full border border-white/70 bg-white/90 p-1 shadow-lg backdrop-blur-md">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => setLang(language.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  lang === language.code
                    ? "bg-[#0878d1] text-white"
                    : "text-[#082a61]/70 hover:text-[#082a61]"
                }`}
              >
                {language.label}
              </button>
            ))}
          </div>
        </section>

        {/* Identity */}
        <section className="-mt-9 relative z-10 px-5 pb-5 text-center">
          <h1 className="text-[28px] font-black leading-tight tracking-tight text-[#082a61]">
            William Cortés Bolaños
          </h1>

          <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[#0878d1]">
            {t.role}
          </p>

          <div className="mt-2 text-xl font-black tracking-wide text-[#082a61]">
            WILCOR
          </div>

          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-[#365477]">
            {t.area}
          </p>
        </section>

        {/* Primary actions */}
        <section className="space-y-3 px-5">
          <div className="grid grid-cols-3 gap-2">
            <a
              href="/wilcor/william-cortes.vcf"
              download
              className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#00ad45] px-2 text-center text-xs font-bold text-white shadow-md transition active:scale-[0.98]"
            >
              <Download size={23} />
              {t.save}
            </a>

            <a
              href="https://wa.me/50685833932"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#25D366] px-2 text-center text-xs font-bold text-white shadow-md transition active:scale-[0.98]"
            >
              <MessageCircle size={24} />
              {t.whatsapp}
            </a>

            <button
              type="button"
              onClick={() => setWechatOpen(true)}
              className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#07C160] px-2 text-center text-xs font-bold text-white shadow-md transition active:scale-[0.98]"
            >
              <MessageCircle size={24} />
              {t.wechat}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a
              href="https://wilcor.vawau.com"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#0878d1] px-2 text-center text-xs font-bold text-white transition active:scale-[0.98]"
            >
              <Globe2 size={23} />
              {t.global}
            </a>

            <a
              href="mailto:Williamcortes89@gmail.com"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#0965b7] px-2 text-center text-xs font-bold text-white transition active:scale-[0.98]"
            >
              <Mail size={23} />
              {t.email}
            </a>

            <a
              href="tel:+50685833932"
              className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#082a61] px-2 text-center text-xs font-bold text-white transition active:scale-[0.98]"
            >
              <Phone size={23} />
              {t.call}
            </a>
          </div>
        </section>

        {/* Capabilities */}
        <section className="px-5 pt-5">
          <div className="grid grid-cols-4 overflow-hidden rounded-2xl border border-[#cce8fb] bg-[#f4faff]">
            <Capability icon={<Snowflake size={23} />} label={t.residential} />
            <Capability icon={<Store size={23} />} label={t.commercial} />
            <Capability icon={<Building2 size={23} />} label={t.privateLabel} />
            <Capability icon={<Wrench size={23} />} label={t.support} />
          </div>
        </section>

        {/* Operation */}
        <section className="px-5 pt-4">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#2c6fa8] shadow-lg">
            <Metric value="2015" label={t.since} />
            <Metric value="4" label={t.stores} />
            <Metric
              icon={<Warehouse size={24} />}
              label={t.logistics}
            />
            <Metric
              icon={<Globe2 size={24} />}
              label={t.coverage}
            />
          </div>
        </section>

        {/* WILCOR Global CTA */}
        <section className="px-5 pt-4">
          <a
            href="https://wilcor.vawau.com"
            className="flex min-h-[82px] items-center justify-between rounded-3xl bg-gradient-to-r from-[#0878d1] to-[#082a61] px-5 text-white shadow-xl transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <Globe2 size={29} className="shrink-0 text-[#4dd7ee]" />

              <div className="text-left">
                <div className="font-black">{t.globalTitle}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">
                  {t.globalNote}
                </div>
              </div>
            </div>

            <span className="ml-3 text-3xl">›</span>
          </a>
        </section>

        {/* Contact */}
        <footer className="px-6 pb-8 pt-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-[#365477]">
            <a href="tel:+50685833932">+506 8583 3932</a>
            <span className="text-[#b5c8d9]">|</span>
            <a href="tel:+50661555504">+506 6155 5504</a>
          </div>

          <a
            href="mailto:Williamcortes89@gmail.com"
            className="mt-3 block text-xs font-semibold text-[#365477]"
          >
            Williamcortes89@gmail.com
          </a>

          <p className="mt-3 text-xs text-[#6c86a1]">{t.location}</p>

          <div className="mt-5 text-xl font-black tracking-[0.18em] text-[#082a61]">
            WILCOR
          </div>

          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0878d1]">
            Tu mundo más frío
          </div>
        </footer>
      </div>

      {/* WeChat modal */}
      {wechatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#03152d]/80 p-5 backdrop-blur-sm"
          onClick={() => setWechatOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center text-[#082a61] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-black">{t.wechatTitle}</h2>

            <p className="mt-2 text-sm text-slate-500">{t.wechatText}</p>

            <div className="relative mx-auto mt-5 aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image
                src="/wilcor/wechat-william.jpg"
                alt="William WeChat QR"
                fill
                className="object-contain p-2"
              />
            </div>

            <button
              type="button"
              onClick={() => setWechatOpen(false)}
              className="mt-5 w-full rounded-xl bg-[#082a61] px-5 py-3 font-bold text-white"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

function Capability({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="flex min-h-[105px] flex-col items-center justify-center gap-2 border-r border-[#cce8fb] px-1.5 text-center last:border-r-0">
      <div className="text-[#0878d1]">{icon}</div>
      <div className="text-[10px] font-bold leading-tight text-[#24496f]">
        {label}
      </div>
    </div>
  )
}

function Metric({
  value,
  label,
  icon,
}: {
  value?: string
  label: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex min-h-[88px] items-center justify-center gap-3 bg-[#082f66] px-3 text-white">
      {icon && <div className="text-[#4dd7ee]">{icon}</div>}

      <div className="text-left">
        {value && <div className="text-xl font-black">{value}</div>}
        <div className="text-[11px] font-semibold leading-tight text-white/75">
          {label}
        </div>
      </div>
    </div>
  )
}