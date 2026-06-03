"use client";

import { useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type {
  ProductResponse,
  StoreResponse,
} from "@/types";

import { EsterProductCard } from "./EsterProductCard";

type EsterRelatedProductsCarouselProps = {
  store: StoreResponse;
  products: ProductResponse[];
};

export function EsterRelatedProductsCarousel({
  store,
  products,
}: EsterRelatedProductsCarouselProps) {
  const carouselRef =
    useRef<HTMLDivElement | null>(null);

  if (!products.length) {
    return null;
  }

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
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
            Selecionados para você
          </span>

          <h2 className="mt-3 text-3xl font-semibold text-[#4B3C40] sm:text-4xl">
            Você também pode gostar
          </h2>

          <p className="mt-2 text-sm text-[#9A7E84]">
            Produtos escolhidos para combinar com seu estilo.
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F3E8EA] bg-white text-[#D89CA8] transition-all duration-300 hover:bg-[#FFF2F4]"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F3E8EA] bg-white text-[#D89CA8] transition-all duration-300 hover:bg-[#FFF2F4]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[220px] flex-none sm:w-[250px] md:w-[280px]"
          >
            <EsterProductCard
              store={store}
              product={product}
            />
          </div>
        ))}
      </div>
    </section>
  );
}