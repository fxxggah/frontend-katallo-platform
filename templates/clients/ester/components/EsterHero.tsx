"use client";

import { ArrowRight, Heart, Star } from "lucide-react";

export function EsterHero() {
  return (
    <section className="relative min-h-[680px] md:min-h-[760px] w-full overflow-hidden">

      {/* Fundo com gradiente mesh rico */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FCE4EC] via-[#FFF0F5] to-[#FCE4EC]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(233,30,140,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_10%_80%,rgba(194,24,91,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_90%_10%,rgba(255,215,0,0.08),transparent)]" />

      {/* Padrão de pontilhado decorativo */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #C2185B 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      {/* Blob decorativo direito */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#E91E8C]/20 via-[#C2185B]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Blob decorativo inferior */}
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-gradient-to-t from-[#FCE4EC] to-transparent pointer-events-none" />

      {/* Formas orgânicas decorativas */}
      <div className="absolute right-[10%] top-[12%] h-24 w-24 rounded-full border-2 border-[#E91E8C]/20 opacity-60" />
      <div className="absolute right-[14%] top-[18%] h-12 w-12 rounded-full border border-[#C2185B]/30 opacity-60" />
      <div className="absolute right-[6%] bottom-[25%] h-40 w-40 rounded-full border border-[#E91E8C]/15 opacity-50" />

      {/* Ícones flutuantes decorativos */}
      <div className="absolute right-[18%] top-[30%] hidden lg:block">
        <div className="animate-[bounce_3s_ease-in-out_infinite] rounded-2xl bg-white/80 p-3 shadow-lg shadow-rose-200/50 backdrop-blur-sm">
          <Heart size={18} className="fill-[#E91E8C] text-[#E91E8C]" />
        </div>
      </div>
      <div className="absolute right-[8%] top-[55%] hidden lg:block">
        <div className="animate-[bounce_3.5s_ease-in-out_0.5s_infinite] rounded-2xl bg-white/80 p-3 shadow-lg shadow-rose-200/50 backdrop-blur-sm">
          <Star size={16} className="fill-[#FFD700] text-[#FFD700]" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex min-h-[680px] md:min-h-[760px] max-w-7xl items-center px-6 md:px-8">
        <div className="max-w-2xl">

          {/* Pílula de categoria */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/80 px-5 py-2 shadow-md shadow-rose-200/40 backdrop-blur-md border border-rose-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#E91E8C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C2185B]">
              Nova Coleção • 2025
            </span>
          </div>

          {/* Título com serif + gradiente */}
          <h1 className="mt-7 leading-[1.05] tracking-tight text-[#2D0A1E]">
            <span
              className="block text-5xl font-black sm:text-6xl md:text-7xl lg:text-[82px]"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Elegância que
            </span>
            <span
              className="block bg-gradient-to-r from-[#E91E8C] via-[#C2185B] to-[#880E4F] bg-clip-text text-5xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-[82px]"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              transforma.
            </span>
          </h1>

          {/* Linha decorativa */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-[#E91E8C] to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C2185B]/70">
              Moda Feminina Evangélica
            </span>
          </div>

          {/* Descrição */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5A2040]/80 md:text-[17px]">
            Peças cuidadosamente selecionadas para mulheres que expressam sua fé com 
            beleza, graça e autenticidade em cada detalhe.
          </p>

          {/* Botões */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#produtos"
              className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B] px-9 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-rose-400/35 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-rose-400/45"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#C2185B] to-[#880E4F] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">Ver Coleção</span>
              <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#categorias"
              className="flex items-center justify-center rounded-full border-2 border-[#E91E8C]/30 bg-white/60 px-9 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#C2185B] backdrop-blur-sm transition-all duration-300 hover:border-[#E91E8C] hover:bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-200/50"
            >
              Categorias
            </a>
          </div>

        </div>
      </div>

      {/* Onda decorativa na base */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30C360 60 1080 0 1440 30V60H0V30Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}