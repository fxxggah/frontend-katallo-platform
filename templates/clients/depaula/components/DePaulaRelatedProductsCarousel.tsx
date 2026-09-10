"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";

import type {
  ProductResponse,
  StoreResponse,
} from "@/types";

import { DePaulaProductCard } from "./DePaulaProductCard";

type DePaulaRelatedProductsCarouselProps = {
  store: StoreResponse;
  products: ProductResponse[];
};

export function DePaulaRelatedProductsCarousel({
  store,
  products,
}: DePaulaRelatedProductsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!products.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 bg-[#0A0A0A]">

      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield size={13} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">
              Combina com
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-bold uppercase text-white sm:text-4xl">
            Você também pode curtir
          </h2>
          <p className="mt-2 text-sm text-white/40">
            Peças selecionadas pra completar o look.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-[#D4AF37]/30 bg-transparent text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-[#D4AF37]/30 bg-transparent text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"
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
          <div
            key={product.id}
            className="w-[220px] flex-none sm:w-[250px] md:w-[270px]"
          >
            <DePaulaProductCard store={store} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}