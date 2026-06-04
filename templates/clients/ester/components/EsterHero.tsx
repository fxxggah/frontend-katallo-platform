"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function EsterHero() {
  return (
    <section className="relative min-h-[620px] md:h-[760px] w-full overflow-hidden bg-[#FFFBFB]">

      {/* Camada de Gradiente Inteligente (Garante contraste e leitura no mobile e desktop) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBFB] via-[#FFFBFB]/95 to-transparent md:via-[#FFFBFB]/90 lg:to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBFB] via-transparent to-transparent lg:hidden z-10" />

      {/* Elementos de Luz Difusa de Fundo (Glow Estúdio) */}
      <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#EB3B6F]/8 blur-[120px] pointer-events-none z-10" />
      <div className="absolute right-1/4 bottom-10 h-[300px] w-[300px] rounded-full bg-[#EAD593]/20 blur-[100px] pointer-events-none z-10" />

      {/* Conteúdo Principal */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 md:px-8 py-20 md:py-0">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Badge de Destaque Superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EAD593]/40 bg-white/70 px-4 py-1.5 backdrop-blur-md shadow-sm shadow-[#3A2A2E]/5 animate-fade-in">
            <Sparkles size={12} className="text-[#EB3B6F]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B52D4F]">
              Moda Feminina Evangélica
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-[#3A2A2E] sm:text-6xl md:text-7xl lg:text-[80px]">
            Elegância que <br />
            <span className="bg-gradient-to-r from-[#EB3B6F] to-[#B52D4F] bg-clip-text text-transparent">
              valoriza sua essência.
            </span>
          </h1>

          {/* Descrição */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B5560]/90 md:text-lg">
            Vestidos fluidos, conjuntos impecáveis e peças alfaiataria selecionadas para 
            mulheres que prezam pelo conforto, beleza e modéstia em todos os momentos.
          </p>

          {/* Ações / Botões */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4.5">
            <a
              href="#produtos"
              className="group flex items-center justify-center gap-2 rounded-full bg-[#EB3B6F] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-[#EB3B6F]/20 transition-all duration-300 hover:bg-[#B52D4F] hover:shadow-[#B52D4F]/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Ver Coleção</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#categorias"
              className="flex items-center justify-center rounded-full border border-[#EAD593] bg-white/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#3A2A2E] backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-[#EB3B6F]/40 hover:text-[#EB3B6F] hover:-translate-y-0.5 active:translate-y-0"
            >
              Categorias
            </a>
          </div>

        </div>
      </div>
      
    </section>
  );
}