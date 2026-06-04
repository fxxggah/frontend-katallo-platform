"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";

type GbGamesLogoProps = {
  store: StoreResponse;
};

export function GbGamesLogo({ store }: GbGamesLogoProps) {
  return (
    <Link href={`/${store.slug}`} className="group flex items-center select-none gap-3">
      <div className="relative flex h-10 items-center justify-center transition-all duration-500 group-hover:scale-105">
        {/* Glow halo behind logo */}
        <div className="absolute inset-0 rounded-xl bg-[#7B2CFF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {store.logo ? (
          <Image
            src={store.logo}
            alt={store.name}
            width={160}
            height={40}
            className="relative h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
            priority
          />
        ) : (
          <div className="relative flex items-center gap-2">
            {/* Sci-fi bracket ornament */}
            <span className="text-[#7B2CFF] font-mono text-lg font-bold leading-none">[</span>
            <span className="bg-gradient-to-r from-[#E2C4FF] via-[#A855F7] to-[#7B2CFF] bg-clip-text text-xl font-black text-transparent uppercase tracking-[0.15em]"
              style={{ fontFamily: "'Syne', 'Georgia', sans-serif" }}
            >
              {store.name}
            </span>
            <span className="text-[#7B2CFF] font-mono text-lg font-bold leading-none">]</span>
          </div>
        )}
      </div>
    </Link>
  );
}