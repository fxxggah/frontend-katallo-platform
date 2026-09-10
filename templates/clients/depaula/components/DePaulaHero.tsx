"use client";

import { ArrowRight, Shield } from "lucide-react";

export function DePaulaHero() {
  return (
    <section className="relative min-h-[680px] md:min-h-[760px] w-full overflow-hidden bg-[#0A0A0A]">

      {/* Fundo texturizado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_30%,rgba(212,175,55,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_10%_80%,rgba(0,104,55,0.15),transparent)]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      {/* Blob dourado */}
      <div className="absolute -right-32 top-1/3 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#D4AF37]/15 via-[#E6B800]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Moldura de brasão decorativa */}
      <div className="absolute right-[8%] top-[20%] hidden lg:block opacity-20">
        <Shield size={220} strokeWidth={0.75} className="text-[#D4AF37]" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex min-h-[680px] md:min-h-[760px] max-w-7xl items-center px-6 md:px-8">
        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2.5 rounded-md border border-[#D4AF37]/40 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E6B800]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E6B800]">
              Nova Coleção • 2026
            </span>
          </div>

          <h1 className="mt-7 leading-[1.02] tracking-tight text-white">
            <span className="block text-5xl font-black uppercase sm:text-6xl md:text-7xl lg:text-[80px]">
              Atitude é
            </span>
            <span className="block text-5xl font-black uppercase text-[#D4AF37] sm:text-6xl md:text-7xl lg:text-[80px]">
              tradição.
            </span>
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              Streetwear & Cultura Urbana
            </span>
          </div>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-[17px]">
            Peças com modelagem street, atitude nas estampas e o brasão que carrega
            nossa história em cada detalhe.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#produtos"
              className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-md bg-[#D4AF37] px-9 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6B800]"
            >
              <span className="relative z-10">Ver Coleção</span>
              <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#categorias"
              className="flex items-center justify-center rounded-md border border-white/20 bg-transparent px-9 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Categorias
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
