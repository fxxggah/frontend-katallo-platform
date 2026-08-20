"use client";

export function GbGamesHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-32 md:pt-48 md:pb-44">

      {/* ── Deep background layers ── */}
      <div className="absolute inset-0 bg-[#06040F]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal lines (sci-fi) */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(168,85,247,1) 0px, rgba(168,85,247,1) 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Glows */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#4A0099]/25 blur-[120px]" />
      <div className="absolute -left-20 top-1/3 h-[300px] w-[300px] rounded-full bg-[#1A0050]/60 blur-[80px]" />
      <div className="absolute right-0 bottom-10 h-[250px] w-[400px] rounded-full bg-[#3B0D8C]/20 blur-[100px]" />

      {/* Top ornament line */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
        <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-[#7B2CFF]/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* HUD Badge */}
        <div className="inline-flex items-center gap-3 rounded-full border border-[#7B2CFF]/25 bg-gradient-to-r from-[#1A0050]/80 to-[#0A0020]/80 px-5 py-2.5 backdrop-blur-xl">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A855F7] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A855F7]" />
          </div>

          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C084FC]">
            Sua nova loja gamer de Botucatu
          </span>

          {/* Right accent */}
          <div className="h-px w-6 bg-gradient-to-r from-[#7B2CFF]/60 to-transparent" />
        </div>

        {/* Main title */}
        <h1
          className="mt-10 text-6xl font-black leading-[0.9] tracking-tight text-white sm:text-8xl md:text-[106px]"
          style={{ fontFamily: "'Syne', 'Georgia', serif" }}
        >
          <span className="block text-white/90">
            Seu Setup
          </span>

          <span className="block">
            gamer

            <span
              className="relative ml-4 inline-block bg-gradient-to-br from-[#E2C4FF] via-[#A855F7] to-[#5A00B1] bg-clip-text text-transparent"
            >
              {" "}começa

              {/* Underline accent */}
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#7B2CFF] via-[#A855F7] to-transparent" />
            </span>
          </span>

          <span className="block bg-gradient-to-r from-[#F5C542] via-[#FFDD88] to-[#F5C542] bg-clip-text text-transparent">
            aqui.
          </span>
        </h1>

        {/* Decorative separator */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-[#7B2CFF] to-transparent" />
          <div className="h-1 w-1 rounded-full bg-[#F5C542]" />
          <div className="h-[1px] w-6 bg-[#7B2CFF]/30" />
        </div>

        {/* Description */}
        <p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
          style={{ fontFamily: "'DM Sans', 'sans-serif'" }}
        >
          Descubra periféricos, hardware e acessórios em uma experiência
          moderna, tecnológica e premium. Eleve seu setup ao próximo nível.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">

          {/* Explorar Produtos */}
          <a
            href="#produtos"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#4A0099] to-[#7B2CFF] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(123,44,255,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(123,44,255,0.7)]"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative z-10">
              Explorar Produtos
            </span>
          </a>

          {/* Ver Categorias */}
          <a
            href="#categorias"
            className="group relative overflow-hidden rounded-xl border border-[#7B2CFF]/30 bg-transparent px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-[#7B2CFF]/8 hover:shadow-[0_0_30px_rgba(123,44,255,0.2)]"
          >
            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#7B2CFF]/60" />

            <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#7B2CFF]/60" />

            <span className="relative z-10">
              Ver Categorias
            </span>
          </a>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06040F] to-transparent" />

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="h-[1px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#7B2CFF]/30 to-transparent" />
      </div>

    </section>
  );
}