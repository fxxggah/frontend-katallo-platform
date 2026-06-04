"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { ShoppingBag, Instagram, Sparkles } from "lucide-react";

type EsterNavbarProps = {
  store: StoreResponse;
};

export function EsterNavbar({ store }: EsterNavbarProps) {
  return (
    <>
      {/* Topo decorativo com versículo */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#C2185B] via-[#E91E8C] to-[#C2185B] py-2 text-center">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==')]" />
        <p className="relative text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90">
          ✦ &nbsp;"A mulher virtuosa, quem a achará?" — Prov. 31:10 &nbsp; ✦
        </p>
      </div>

      <header className="sticky top-0 z-50 border-b border-rose-100/60 bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(194,24,91,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Navegação Esquerda */}
          <nav className="hidden items-center gap-8 lg:flex">
            {[
              { label: "Início", href: `/${store.slug}` },
              { label: "Categorias", href: "#categorias" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A1942] transition duration-300 hover:text-[#E91E8C]"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gradient-to-r from-[#E91E8C] to-[#C2185B] transition-all duration-500 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Logo Central */}
          <Link
            href={`/${store.slug}`}
            className="group flex flex-col items-center gap-0.5"
          >
            {store.logo ? (
              <Image
                src={store.logo}
                alt={store.name}
                width={200}
                height={56}
                className="h-12 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="flex flex-col items-center">
                <span
                  className="bg-gradient-to-br from-[#C2185B] via-[#E91E8C] to-[#880E4F] bg-clip-text text-2xl font-black tracking-tight text-transparent"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {store.name}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#C2185B]/60">
                  <span className="h-px w-4 bg-current" />
                  moda evangelica
                  <span className="h-px w-4 bg-current" />
                </span>
              </div>
            )}
          </Link>

          {/* Ações Direita */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/ester__moda_evangelica_botu/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-[#E91E8C] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-rose-300/40 md:flex"
            >
              <Instagram size={16} />
            </a>

            <Link
              href={`/${store.slug}/cart`}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-rose-400/30 transition-all duration-300 hover:shadow-rose-500/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#C2185B] to-[#880E4F] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <ShoppingBag size={15} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10 hidden sm:inline">Carrinho</span>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}