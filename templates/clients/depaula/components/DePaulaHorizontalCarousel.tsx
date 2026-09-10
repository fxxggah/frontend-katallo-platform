"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DePaulaHorizontalCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemClassName?: string;
};

export function DePaulaHorizontalCarousel<T>({
  items,
  renderItem,
  itemClassName = "w-[220px] flex-none sm:w-[250px] md:w-[270px]",
}: DePaulaHorizontalCarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!items.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="absolute right-0 -top-16 hidden items-center gap-2 md:flex">
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

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div key={index} className={itemClassName}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}