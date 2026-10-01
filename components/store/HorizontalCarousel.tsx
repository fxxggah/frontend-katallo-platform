"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HorizontalCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemClassName?: string;
  buttonClasses?: string;
};

export function HorizontalCarousel<T>({
  items,
  renderItem,
  itemClassName = "w-[220px] flex-none sm:w-[250px] md:w-[270px]",
  buttonClasses = "border-gray-200 bg-white text-gray-800 hover:bg-gray-100",
}: HorizontalCarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!items.length) return null;

  function scrollLeft() {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <div className="relative group/carousel">
      <div className="absolute right-0 -top-16 hidden items-center gap-2 md:flex">
        <button
          type="button"
          onClick={scrollLeft}
          className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${buttonClasses}`}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={scrollRight}
          className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${buttonClasses}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Padding vertical e horizontal ajustado para evitar corte do box-shadow/glow */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth py-6 px-4 -mx-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div key={index} className={`flex flex-col ${itemClassName}`}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}