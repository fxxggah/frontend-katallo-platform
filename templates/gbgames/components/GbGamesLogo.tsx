"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";
import { Gamepad2 } from "lucide-react";

type GbGamesLogoProps = {
  store: StoreResponse;
};

export function GbGamesLogo({ store }: GbGamesLogoProps) {
  const hasLogo = !!store.logo;

  return (
    <Link
      href={`/${store.slug}`}
      className="group flex items-center gap-4"
    >
      {hasLogo ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#7B2CFF]/40">
          <Image
            src={store.logo!}
            alt={store.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#5A00B1] to-[#7B2CFF] shadow-[0_0_40px_rgba(123,44,255,0.35)] transition-all duration-300 group-hover:scale-105">
          <Gamepad2 size={24} className="text-white" />
        </div>
      )}

      <div className="leading-tight">
        <p className="text-lg font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#C084FC]">
          {store.name}
        </p>

        <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
          Gamer Store
        </span>
      </div>
    </Link>
  );
}