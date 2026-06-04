"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import type { ProductResponse, StoreResponse } from "@/types";
import { GbGamesProductCard } from "./GbGamesProductCard";

type GbGamesRelatedProductsCarouselProps = {
  store: StoreResponse;
  products: ProductResponse[];
};

export function GbGamesRelatedProductsCarousel({ store, products }: GbGamesRelatedProductsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!products.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-24">

      {/* Section top line */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#7B2CFF]/30" />
        <div className="flex items-center gap-2 rounded-full border border-[#7B2CFF]/20 bg-[#7B2CFF]/5 px-4 py-1.5">
          <Zap size={9} className="text-[#F5C542]" fill="#F5C542" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">Recomendados</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#7B2CFF]/30" />
      </div>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2
            className="text-4xl font-black tracking-tight text-white"
            style={{ fontFamily: "'Syne', 'Georgia', serif" }}
          >
            Você também
            <span className="ml-3 bg-gradient-to-r from-[#A855F7] to-[#7B2CFF] bg-clip-text text-transparent">
              pode gostar
            </span>
          </h2>
          <div className="mt-2 h-[1px] w-16 bg-gradient-to-r from-[#7B2CFF] via-[#A855F7] to-transparent" />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={scrollLeft}
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-[#7B2CFF]/25 bg-[#7B2CFF]/5 text-zinc-400 transition-all duration-300 hover:border-[#A855F7]/50 hover:bg-[#7B2CFF]/15 hover:text-white hover:shadow-[0_0_20px_rgba(123,44,255,0.2)]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-[#7B2CFF]/25 bg-[#7B2CFF]/5 text-zinc-400 transition-all duration-300 hover:border-[#A855F7]/50 hover:bg-[#7B2CFF]/15 hover:text-white hover:shadow-[0_0_20px_rgba(123,44,255,0.2)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[260px] flex-none">
            <GbGamesProductCard store={store} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}