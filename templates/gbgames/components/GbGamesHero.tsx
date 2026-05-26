"use client";

export function GbGamesHero() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#5A00B1]/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B2CFF]/20 bg-[#7B2CFF]/10 px-4 py-2 backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-[#A855F7]" />

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              Gamer Premium Experience
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl md:text-[92px]">
            Performance gamer
            <span className="bg-gradient-to-r from-[#A855F7] to-[#7B2CFF] bg-clip-text text-transparent">
              {" "}
              começa aqui.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Descubra periféricos, hardware e acessórios em uma experiência
            moderna, tecnológica e premium.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-gradient-to-r from-[#5A00B1] to-[#7B2CFF] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(123,44,255,0.4)] transition-all duration-300 hover:scale-105">
              Explorar Produtos
            </button>

            <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-300 hover:border-[#7B2CFF]/30 hover:bg-[#7B2CFF]/10">
              Ver Categorias
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}