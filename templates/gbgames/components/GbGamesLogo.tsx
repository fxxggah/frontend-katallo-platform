"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";

type GbGamesLogoProps = {
  store: StoreResponse;
};

export function GbGamesLogo({ store }: GbGamesLogoProps) {
  return (
    <Link
      href={`/${store.slug}`}
      className="group flex items-center select-none"
    >
      {/* Container da Logo */}
      <div className="relative flex h-10 items-center justify-center transition-all duration-300 group-hover:scale-105 filter group-hover:drop-shadow-[0_0_15px_rgba(123,44,255,0.6)]">
        {store.logo ? (
          <Image
            src={store.logo}
            alt={store.name}
            width={160} // Espaço para a logo horizontal se esticar perfeitamente
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        ) : (
          // Fallback em texto caso a imagem falhe ou não exista no banco
          <span className="bg-gradient-to-r from-[#7B2CFF] to-[#C084FC] bg-clip-text text-xl font-black text-transparent uppercase tracking-wider">
            {store.name}
          </span>
        )}
      </div>
    </Link>
  );
}