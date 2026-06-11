"use client";

import Link from "next/link";
import { GbGamesLogo } from "./GbGamesLogo";
import type { StoreResponse } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

type GbGamesNavbarProps = {
  store: StoreResponse;
};

export function GbGamesNavbar({ store }: GbGamesNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* Top scan line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#7B2CFF]/80 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div
          className={`relative overflow-hidden rounded-2xl border transition-all duration-700 ${
            isScrolled
              ? "border-[#7B2CFF]/30 bg-[#06040F]/90 shadow-[0_8px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(123,44,255,0.08)] backdrop-blur-2xl"
              : "border-white/8 bg-[#06040F]/50 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          }`}
        >
          {/* Corner accents */}
          <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#7B2CFF]/60 rounded-tl-2xl" />
          <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[#7B2CFF]/60 rounded-tr-2xl" />

          {/* Radial glow top-right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,44,255,0.12),transparent_60%)]" />

          {/* Bottom scan line */}
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#7B2CFF]/20 to-transparent" />

          <div className="relative flex items-center justify-between px-6 py-3.5">
            <GbGamesLogo store={store} />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4 select-none pointer-events-none">
  <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#7B2CFF]/50 to-transparent" />
  
  <div className="relative flex items-center justify-center">
    <span className="absolute text-[9px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/30 font-mono blur-[2px]">
      Tudo para seu setup
    </span>
    <span className="relative text-[9px] font-black uppercase tracking-[0.4em] text-white/60 font-mono transition-all duration-300 hover:text-white">
      Tudo para seu setup
    </span>
  </div>

  <div className="h-px w-12 bg-gradient-to-l from-transparent via-[#7B2CFF]/50 to-transparent" />
</div>


            <nav className="flex items-center gap-2">
              <Link
                href={`/${store.slug}`}
                className="hidden rounded-xl border border-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all duration-300 hover:border-[#7B2CFF]/30 hover:bg-[#7B2CFF]/8 hover:text-[#C084FC] md:flex"
              >
                Início
              </Link>

              {/* Divider */}
              <div className="hidden md:block h-5 w-px bg-white/10" />

              <Link
                href={`/${store.slug}/cart`}
                className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-[#7B2CFF]/30 bg-gradient-to-br from-[#3B0D8C]/60 to-[#1A0050]/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#A855F7]/60 hover:shadow-[0_0_30px_rgba(123,44,255,0.35)] hover:-translate-y-0.5"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <ShoppingCart size={15} className="relative z-10 transition-transform duration-300 group-hover:scale-110 text-[#C084FC]" />
                <span className="relative z-10 hidden sm:block">Carrinho</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}