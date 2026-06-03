"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreResponse } from "@/types";

type EsterLogoProps = {
  store: StoreResponse;
};

export function EsterLogo({ store }: EsterLogoProps) {
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
          <span className="font-serif text-2xl font-semibold tracking-wide text-[#6B4F3A] transition-colors duration-300 group-hover:text-[#8C6A4A]">
            {store.name}
          </span>
        )}
      </div>
    </Link>
  );
}