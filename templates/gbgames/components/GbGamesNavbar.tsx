"use client";

import Link from "next/link";
import type { StoreResponse } from "@/types";
import { ShoppingCart, Gamepad2 } from "lucide-react";

type GbGamesNavbarProps = {
  store: StoreResponse;
};

export function GbGamesNavbar({ store }: GbGamesNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href={`/${store.slug}`}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#5A00B1] to-[#7B2CFF] shadow-[0_0_40px_rgba(123,44,255,0.35)] transition-transform duration-300 group-hover:scale-105">
            <Gamepad2 size={20} className="text-white" />
          </div>

          <div className="leading-tight">
            <p className="text-lg font-black tracking-tight text-white">
              GB GAMES
            </p>

            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Gamer Store
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={`/${store.slug}`}
            className="hidden text-sm font-medium text-zinc-400 transition-colors hover:text-white md:block"
          >
            Início
          </Link>

          <Link
            href={`/${store.slug}/cart`}
            className="group relative flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#7B2CFF]/40 hover:bg-[#7B2CFF]/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#5A00B1]/0 via-[#7B2CFF]/10 to-[#5A00B1]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <ShoppingCart
              size={18}
              className="relative z-10 transition-transform group-hover:scale-110"
            />

            <span className="relative z-10">Carrinho</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}