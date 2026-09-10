"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { ShoppingBag, Shield } from "lucide-react";

type DePaulaNavbarProps = {
  store: StoreResponse;
};

export function DePaulaNavbar({ store }: DePaulaNavbarProps) {
  return (
    <>
      {/* Faixa de topo */}
      <div className="relative overflow-hidden bg-[#0A0A0A] py-2 text-center border-b border-[#D4AF37]/20">
        <p className="relative flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E6B800]">
          <Shield size={11} className="text-[#E6B800]" />
          Nova Coleção Disponível
          <Shield size={11} className="text-[#E6B800]" />
        </p>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#D4AF37]/15 bg-[#0A0A0A]/95 backdrop-blur-xl">
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
                className="group relative text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 transition duration-300 hover:text-[#E6B800]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
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
              <div className="flex flex-col items-center leading-none">
                <span
                  className="text-2xl italic tracking-tight text-[#E6B800]"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {store.name}
                </span>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.4em] text-white/50">
                  street wear
                </span>
              </div>
            )}
          </Link>

          {/* Ações Direita */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${store.slug}/cart`}
              className="group relative flex items-center gap-2 overflow-hidden rounded-md border border-[#D4AF37]/40 bg-transparent px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6B800] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline">Carrinho</span>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}