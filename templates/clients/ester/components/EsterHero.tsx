"use client";

import Image from "next/image";

export function EsterHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8FA]/95 via-[#FFF8FA]/80 to-[#FFF8FA]/30 z-10" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#EB3B6F]/10 blur-[140px]" />

      <div className="relative h-[700px]">

        <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EAD593]/50 bg-white/80 px-5 py-2 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-[#EB3B6F]" />

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B52D4F]">
                Moda feminina evangélica
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-[#3A2A2E] sm:text-7xl lg:text-[88px]">
              Elegância que
              <span className="block text-[#EB3B6F]">
                valoriza sua essência.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#6B5560] md:text-xl">
              Vestidos, conjuntos e peças selecionadas para mulheres
              que buscam beleza, conforto e modéstia em cada detalhe.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#produtos"
                className="rounded-full bg-[#EB3B6F] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-[#EB3B6F]/20 transition-all duration-300 hover:bg-[#B52D4F] hover:scale-105"
              >
                Ver Coleção
              </a>

              <a
                href="#categorias"
                className="rounded-full border border-[#EAD593] bg-white/80 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#B52D4F] backdrop-blur-xl transition-all duration-300 hover:bg-[#FFF4D4]"
              >
                Categorias
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}