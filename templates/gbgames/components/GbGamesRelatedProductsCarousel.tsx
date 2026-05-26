"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductResponse, StoreResponse } from "@/types";
import { GbGamesProductCard } from "./GbGamesProductCard";

type GbGamesRelatedProductsCarouselProps = {
  store: StoreResponse;
  products: ProductResponse[];
};

export function GbGamesRelatedProductsCarousel({
  store,
  products,
}: GbGamesRelatedProductsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!products.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A855F7]">
            Recomendados
          </span>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-white">
            Você também pode gostar
          </h2>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={scrollLeft}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:border-[#7B2CFF]/30 hover:bg-[#7B2CFF]/10"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:border-[#7B2CFF]/30 hover:bg-[#7B2CFF]/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[260px] flex-none"
          >
            <GbGamesProductCard
              store={store}
              product={product}
            />
          </div>
        ))}
      </div>
    </section>
  );
}