"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!products.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20">

      {/* Header da seção */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#E91E8C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#E91E8C]">
              Selecionados para você
            </span>
          </div>
          <h2
            className="mt-3 text-3xl font-bold text-[#2D0A1E] sm:text-4xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Você também pode gostar
          </h2>
          <p className="mt-2 text-sm text-[#9A5568]">
            Peças escolhidas a dedo para combinar com seu estilo.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={scrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-[#E91E8C] shadow-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:border-transparent hover:shadow-md hover:shadow-rose-300/30"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-[#E91E8C] shadow-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:border-transparent hover:shadow-md hover:shadow-rose-300/30"
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
            <EsterProductCard store={store} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}