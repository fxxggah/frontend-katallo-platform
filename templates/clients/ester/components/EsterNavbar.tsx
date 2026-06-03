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
    <header className="sticky top-0 z-50 border-b border-[#EAD593]/20 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href={`/${store.slug}`}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3A2A2E]/70 transition hover:text-[#EB3B6F]"
          >
            Início
          </Link>

          <a
            href="#categorias"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3A2A2E]/70 transition hover:text-[#EB3B6F]"
          >
            Categorias
          </a>
        </nav>

        <Link
          href={`/${store.slug}`}
          className="group flex items-center justify-center"
        >
          {store.logo ? (
            <Image
              src={store.logo}
              alt={store.name}
              width={220}
              height={60}
              className="h-14 w-auto object-contain transition duration-300 group-hover:scale-105"
              priority
            />
          ) : (
            <span className="text-2xl font-black tracking-tight text-[#B52D4F]">
              {store.name}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/ester__moda_evangelica_botu/"
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-[#EB3B6F]/20 bg-[#FFF5F8] text-[#EB3B6F] transition hover:border-[#EB3B6F] hover:bg-[#EB3B6F] hover:text-white md:flex"
          >
            <Instagram size={18} />
          </a>

          <Link
            href={`/${store.slug}/cart`}
            className="group flex items-center gap-2 rounded-full bg-[#EB3B6F] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#EB3B6F]/20 transition-all duration-300 hover:bg-[#B52D4F] hover:shadow-[#B52D4F]/30 active:scale-95"
          >
            <ShoppingBag
              size={16}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />

            <span>Carrinho</span>
          </Link>
        </div>
      </div>
    </header>
  );
}