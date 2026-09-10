"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";

type DePaulaLogoProps = {
  store: StoreResponse;
};

export function DePaulaLogo({ store }: DePaulaLogoProps) {
  return (
    <Link
      href={`/${store.slug}`}
      className="group flex items-center select-none"
    >
      <div className="relative flex h-12 items-center justify-center transition-all duration-300 group-hover:scale-105">
        {store.logo ? (
          <Image
            src={store.logo}
            alt={store.name}
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        ) : (
          <div className="flex flex-col items-start leading-none">
            <span
              className="text-2xl italic tracking-tight text-[#E6B800]"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {store.name}
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.4em] text-white/50">
              street wear
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}