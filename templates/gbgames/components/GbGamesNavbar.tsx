"use client";

import Link from "next/link";
import type { StoreResponse } from "@/types";
import { ShoppingCart, Gamepad2 } from "lucide-react";
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div
          className={`relative overflow-hidden rounded-[28px] border border-white/10 transition-all duration-500 ${
            isScrolled
              ? "bg-[#09090B]/75 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              : "bg-[#09090B]/35 shadow-[0_0_30px_rgba(0,0,0,0.20)] backdrop-blur-xl"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,44,255,0.18),transparent_35%)]" />

          <div className="relative flex items-center justify-between px-6 py-4">
            <Link
              href={`/${store.slug}`}
              className="group flex items-center gap-4"
            >
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#5A00B1] to-[#7B2CFF] shadow-[0_0_45px_rgba(123,44,255,0.45)] transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <Gamepad2
                  size={22}
                  className="relative z-10 text-white"
                />
              </div>

              <div className="leading-tight">
                <p className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                  GB GAMES
                </p>

                <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                  Gamer Store
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-3">
              <Link
                href={`/${store.slug}`}
                className="hidden rounded-2xl border border-transparent px-5 py-3 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white md:flex"
              >
                Início
              </Link>

              <Link
                href={`/${store.slug}/cart`}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-[#7B2CFF]/40 hover:bg-[#7B2CFF]/10 hover:shadow-[0_0_40px_rgba(123,44,255,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A00B1]/0 via-[#7B2CFF]/10 to-[#5A00B1]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <ShoppingCart
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                />

                <span className="relative z-10 hidden sm:block">
                  Carrinho
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}