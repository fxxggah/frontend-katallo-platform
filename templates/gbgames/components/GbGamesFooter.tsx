"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoreResponse } from "@/types";

type GbGamesFooterProps = {
  store: StoreResponse;
};

export function GbGamesFooter({ store }: GbGamesFooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-[#7B2CFF]/15 bg-[#06040F]">

      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7B2CFF]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-96 rounded-full bg-[#3B0D8C]/15 blur-3xl" />

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">

        {/* Top divider ornament */}
        <div className="mb-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#7B2CFF]/20" />
          <div className="flex items-center gap-2 rounded-full border border-[#7B2CFF]/20 bg-[#7B2CFF]/5 px-4 py-1.5">
            <div className="h-1 w-1 rounded-full bg-[#A855F7]" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/60 font-mono">GB GAMES</span>
            <div className="h-1 w-1 rounded-full bg-[#A855F7]" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7B2CFF]/20" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href={`/${store.slug}`} className="group w-fit">
              <div className="relative flex h-10 items-center transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]">
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={160}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[#7B2CFF] font-mono text-lg font-bold">[</span>
                    <span
                      className="bg-gradient-to-r from-[#E2C4FF] via-[#A855F7] to-[#7B2CFF] bg-clip-text text-2xl font-black text-transparent uppercase tracking-widest"
                      style={{ fontFamily: "'Syne', 'Georgia', serif" }}
                    >
                      {store.name}
                    </span>
                    <span className="text-[#7B2CFF] font-mono text-lg font-bold">]</span>
                  </div>
                )}
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              Performance, tecnologia e experiência premium para gamers que querem
              elevar o setup ao próximo nível.
            </p>

            {/* Tech stats row */}
            <div className="flex flex-wrap gap-3 mt-2">
              {["Hardware Premium", "Periféricos Top", "Suporte Rápido"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[#7B2CFF]/15 bg-[#7B2CFF]/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#7B2CFF]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/50">
              Contato
            </span>

            {store.whatsappNumber && (
              <a
                href={`https://wa.me/${store.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>Falar no WhatsApp</span>
                </div>
              </a>
            )}

            {(store.city || store.state) && (
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <div className="h-px w-4 bg-[#7B2CFF]/30" />
                <span>
                  {store.city}
                  {store.city && store.state && " · "}
                  {store.state}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-700 font-mono">
            © {new Date().getFullYear()} {store.name} · All rights reserved
          </p>

          {/* Right decorative */}
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#7B2CFF]/30" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#7B2CFF]/40" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#7B2CFF]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}