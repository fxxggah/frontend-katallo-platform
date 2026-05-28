"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoreResponse } from "@/types";

type GbGamesFooterProps = {
  store: StoreResponse;
};

export function GbGamesFooter({ store }: GbGamesFooterProps) {
  return (
    <footer className="mt-32 border-t border-white/10 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          
          {/* Lado Esquerdo: Identidade da Loja */}
          <div className="flex flex-col items-start gap-5">
            <Link
              href={`/${store.slug}`}
              className="group flex items-center select-none"
            >
              {/* Renderiza estritamente a logo por imagem ou fallback de texto */}
              <div className="relative flex h-9 items-center justify-center transition-all duration-300 group-hover:scale-105 filter group-hover:drop-shadow-[0_0_15px_rgba(123,44,255,0.6)]">
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={140}
                    height={36}
                    className="h-9 w-auto object-contain"
                  />
                ) : (
                  <span className="bg-gradient-to-r from-[#7B2CFF] to-[#C084FC] bg-clip-text text-2xl font-black text-transparent uppercase tracking-wider">
                    {store.name}
                  </span>
                )}
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Performance, tecnologia e experiência premium para gamers que
              querem elevar o setup ao próximo nível.
            </p>
          </div>

          {/* Lado Direito: Contato e Copyright */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            {store.whatsappNumber && (
              <a
                href={`https://wa.me/${store.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-[#7B2CFF]/30 bg-[#7B2CFF]/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7B2CFF]/20 hover:border-[#7B2CFF]/50 hover:shadow-[0_0_30px_rgba(123,44,255,0.15)]"
              >
                Falar no WhatsApp
              </a>
            )}

            {/* Localização vinda do banco */}
            {(store.city || store.state) && (
              <div className="text-sm text-zinc-500">
                {store.city}
                {store.city && store.state && " • "}
                {store.state}
              </div>
            )}

            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              © {new Date().getFullYear()} {store.name}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}