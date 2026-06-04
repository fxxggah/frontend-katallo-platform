"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { ShoppingBag, Instagram } from "lucide-react";

type EsterNavbarProps = {
  store: StoreResponse;
};

export function EsterNavbar({ store }: EsterNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EAD593]/20 bg-white/80 backdrop-blur-md transition-all duration-300 shadow-sm shadow-[#3A2A2E]/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        
        {/* Links de Navegação (Esquerda) */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href={`/${store.slug}`}
            className="group relative text-[12px] font-semibold uppercase tracking-[0.15em] text-[#3A2A2E]/80 transition duration-300 hover:text-[#EB3B6F]"
          >
            Início
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#EB3B6F] transition-all duration-300 group-hover:w-full" />
          </Link>

          <a
            href="#categorias"
            className="group relative text-[12px] font-semibold uppercase tracking-[0.15em] text-[#3A2A2E]/80 transition duration-300 hover:text-[#EB3B6F]"
          >
            Categorias
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#EB3B6F] transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Logo Central */}
        <Link
          href={`/${store.slug}`}
          className="group flex items-center justify-center transition-opacity duration-300 hover:opacity-95"
        >
          {store.logo ? (
            <Image
              src={store.logo}
              alt={store.name}
              width={220}
              height={60}
              className="h-12 w-auto object-contain transition duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105"
              priority
            />
          ) : (
            <span className="bg-gradient-to-r from-[#EB3B6F] to-[#B52D4F] bg-clip-text text-2xl font-black tracking-tight text-transparent transition duration-300 group-hover:brightness-110">
              {store.name}
            </span>
          )}
        </Link>

        {/* Ações (Direita) */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/ester__moda_evangelica_botu/"
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#EB3B6F]/20 bg-[#FFF5F8] text-[#EB3B6F] transition-all duration-300 hover:border-[#EB3B6F] hover:bg-[#EB3B6F] hover:text-white hover:rotate-12 md:flex"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>

          <Link
            href={`/${store.slug}/cart`}
            className="group relative flex items-center gap-2.5 rounded-full bg-[#EB3B6F] px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-[#EB3B6F]/20 transition-all duration-300 hover:bg-[#B52D4F] hover:shadow-lg hover:shadow-[#B52D4F]/30 active:scale-95"
          >
            <ShoppingBag
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
            />
          </Link>
        </div>

      </div>
    </header>
  );
}