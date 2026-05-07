"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductResponse, StoreResponse } from "@/types";
import { MinimalProductCard } from "./MinimalProductCard";

type MinimalRelatedProductsCarouselProps = {
  store: StoreResponse;
  products: ProductResponse[];
};

export function MinimalRelatedProductsCarousel({
  store,
  products,
}: MinimalRelatedProductsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!products.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-indigo-600">
            Sugestões
          </span>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
            Compre também
          </h2>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
            aria-label="Ver produtos anteriores"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
            aria-label="Ver próximos produtos"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[190px] flex-none sm:w-[220px] md:w-[240px]"
          >
            <MinimalProductCard store={store} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}