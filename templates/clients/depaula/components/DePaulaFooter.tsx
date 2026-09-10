"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { MapPin, Instagram, Shield } from "lucide-react";

type DePaulaFooterProps = {
  store: StoreResponse;
};

export function DePaulaFooter({ store }: DePaulaFooterProps) {
  return (
    <footer className="relative mt-24 bg-[#0A0A0A] text-white border-t border-[#D4AF37]/15">

      {/* Faixa de destaque */}
      <div className="relative overflow-hidden border-b border-[#D4AF37]/15 py-8 text-center">
        <div className="relative mx-auto flex max-w-2xl items-center justify-center gap-3 px-6">
          <Shield size={16} className="text-[#D4AF37]" />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#E6B800]">
            Avaliação 4.9 / 5.0 nas vendas
          </p>
          <Shield size={16} className="text-[#D4AF37]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">

          {/* Logo e descrição */}
          <div>
            <Link href={`/${store.slug}`}>
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={200}
                  height={56}
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <div className="leading-none">
                  <h3
                    className="text-2xl italic text-[#D4AF37]"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {store.name}
                  </h3>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">
                    street wear
                  </div>
                </div>
              )}
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              Moda urbana com atitude, unindo cultura streetwear e elementos
              clássicos de brasão em cada peça.
            </p>
          </div>

          {/* Informações */}
          <div>
            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
              <span className="h-px w-4 bg-[#D4AF37]" />
              Informações
            </h4>

            <div className="mt-6 space-y-5 text-sm text-white/55">
              {(store.street || store.city) && (
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#D4AF37]/10">
                    <MapPin size={14} className="text-[#D4AF37]" />
                  </div>
                  <span className="leading-relaxed">
                    {store.street} {store.number}
                    <br />
                    {store.city} — {store.state}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
              <span className="h-px w-4 bg-[#D4AF37]" />
              Redes Sociais
            </h4>

            <div className="mt-6 flex flex-col gap-3">
              {store.instagram && (
                <a
                  href={store.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 rounded-md border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#D4AF37]/15">
                    <Instagram size={15} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-[12px] font-semibold">Instagram</span>
                </a>
              )}
            </div>
          </div>

        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/8 pt-8 sm:flex-row sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            © {new Date().getFullYear()} {store.name} — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
