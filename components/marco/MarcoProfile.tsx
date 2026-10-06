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
} from "lucide-react"

type Language = "es" | "en" | "zh"

const copy = {
  es: {
    role: "Director Ejecutivo",
    area: "Negocios Internacionales y Alianzas con Fabricantes",
    save: "Guardar contacto",
    whatsapp: "WhatsApp",
    wechat: "WeChat",
    global: "VAWAU Global",
    email: "Correo electrónico",
    website: "Sitio web",
    call: "Llamar",
    globalNote: "Conozca nuestra operación, infraestructura y capacidades",
    wechatTitle: "Conectar por WeChat",
    wechatText: "Escanee el código QR para agregarme en WeChat.",
    close: "Cerrar",
    footer: "After-Sales Service · Spare Parts · Logistics",
    location: "Costa Rica",
  },
  en: {
    role: "Executive Director",
    area: "International Business & Manufacturer Partnerships",
    save: "Save contact",
    whatsapp: "WhatsApp",
    wechat: "WeChat",
    global: "VAWAU Global",
    email: "Email",
    website: "Website",
    call: "Call",
    globalNote: "Explore our operations, infrastructure and capabilities",
    wechatTitle: "Connect on WeChat",
    wechatText: "Scan the QR code to add me on WeChat.",
    close: "Close",
    footer: "After-Sales Service · Spare Parts · Logistics",
    location: "Costa Rica",
  },
  zh: {
    role: "执行董事",
    area: "国际业务与制造商合作",
    save: "保存联系人",
    whatsapp: "WhatsApp",
    wechat: "微信",
    global: "VAWAU 全球业务",
    email: "电子邮件",
    website: "官方网站",
    call: "拨打电话",
    globalNote: "了解我们的运营、基础设施和服务能力",
    wechatTitle: "添加微信",
    wechatText: "扫描二维码添加我的微信。",
    close: "关闭",
    footer: "售后服务 · 零配件 · 物流",
    location: "哥斯达黎加",
  },
} as const

const languages: { code: Language; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
]

export default function MarcoProfile() {
  const [lang, setLang] = useState<Language>("es")
  const [wechatOpen, setWechatOpen] = useState(false)

  const t = copy[lang]

  return (
    <main className="min-h-screen bg-[#08162d] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[520px] bg-[#0b1d3a] shadow-2xl">
        {/* Headquarters hero */}
        <div className="relative h-[220px] overflow-hidden">
          <Image
            src="/marco/vawau-headquarters.jpg"
            alt="VAWAU Headquarters"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#08162d]/10 via-[#08162d]/20 to-[#0b1d3a]" />

          <div className="absolute left-5 top-5">
            <div className="text-[27px] font-black tracking-[0.16em] text-white drop-shadow-lg">
              VAWAU
            </div>
          </div>

          <div className="absolute right-4 top-4 flex rounded-full border border-white/20 bg-[#08162d]/80 p-1 backdrop-blur-md">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => setLang(language.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  lang === language.code
                    ? "bg-[#009aa5] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>

        {/* Identity */}
        <section className="relative px-6 pb-5 text-center">
          <div className="relative mx-auto -mt-14 h-28 w-28 overflow-hidden rounded-full border-4 border-[#0b1d3a] bg-white shadow-xl">
            <Image
              src="/marco/marco-profile.jpg"
              alt="Marco Sanchez Zeledon"
              fill
              priority
              className="object-cover"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Marco Sanchez Zeledon
          </h1>

          <p className="mt-1 font-semibold text-[#54d2d7]">{t.role}</p>

          <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-white/60">
            {t.area}
          </p>
        </section>

        {/* Primary actions */}
        <section className="space-y-3 px-5">
          <a
            href="/marco/marco-sanchez.vcf"
            download
            className="flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#009aa5] px-5 font-bold text-white shadow-lg transition active:scale-[0.98]"
          >
            <Download size={20} />
            {t.save}
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/50683582995"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-3 font-bold text-white transition active:scale-[0.98]"
            >
              <MessageCircle size={20} />
              {t.whatsapp}
            </a>

            <button
              type="button"
              onClick={() => setWechatOpen(true)}
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#07C160] px-3 font-bold text-white transition active:scale-[0.98]"
            >
              <MessageCircle size={20} />
              {t.wechat}
            </button>
          </div>

          <a
            href="/global"
            className="flex min-h-[72px] items-center justify-between rounded-2xl border border-[#009aa5]/40 bg-[#183059] px-5 transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-left">
              <Globe2 className="shrink-0 text-[#54d2d7]" size={24} />

              <div>
                <div className="font-bold">{t.global}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-white/55">
                  {t.globalNote}
                </div>
              </div>
            </div>

            <span className="ml-3 text-xl text-[#54d2d7]">›</span>
          </a>

          <div className="grid grid-cols-3 gap-3">
            <a
              href="mailto:msanchez@vawau.com"
              className="flex min-h-[78px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] text-xs font-semibold text-white/80 transition active:scale-[0.98]"
            >
              <Mail size={21} className="text-[#54d2d7]" />
              {t.email}
            </a>

            <a
              href="https://www.vawau.com"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[78px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] text-xs font-semibold text-white/80 transition active:scale-[0.98]"
            >
              <Building2 size={21} className="text-[#54d2d7]" />
              {t.website}
            </a>

            <a
              href="tel:+50683582995"
              className="flex min-h-[78px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] text-xs font-semibold text-white/80 transition active:scale-[0.98]"
            >
              <Phone size={21} className="text-[#54d2d7]" />
              {t.call}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 pb-8 pt-8 text-center">
          <div className="mx-auto mb-4 h-px max-w-xs bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="text-sm font-semibold tracking-wide text-white/70">
            {t.footer}
          </div>

          <div className="mt-1 text-xs text-white/35">{t.location}</div>

          <div className="mt-5 text-lg font-black tracking-[0.18em] text-white/35">
            VAWAU
          </div>
        </footer>
      </div>

      {/* WeChat modal */}
      {wechatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setWechatOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center text-[#183059] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-bold">{t.wechatTitle}</h2>

            <p className="mt-2 text-sm text-slate-500">{t.wechatText}</p>

            <div className="relative mx-auto mt-5 aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image
                src="/global/wechat-qr.png"
                alt="Marco WeChat QR"
                fill
                className="object-contain p-2"
              />
            </div>

            <button
              type="button"
              onClick={() => setWechatOpen(false)}
              className="mt-5 w-full rounded-xl bg-[#183059] px-5 py-3 font-bold text-white"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}