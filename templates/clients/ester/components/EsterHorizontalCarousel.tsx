"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EsterHorizontalCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemClassName?: string;
};

export function EsterHorizontalCarousel<T>({
  items,
  renderItem,
  itemClassName = "w-[220px] flex-none sm:w-[250px] md:w-[270px]",
}: EsterHorizontalCarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  if (!items.length) return null;

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
    <div className="relative">
      <div className="absolute right-0 -top-16 hidden items-center gap-2 md:flex">
        <button
          type="button"
          onClick={scrollLeft}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-[#E91E8C] shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:shadow-md hover:shadow-rose-300/30"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={scrollRight}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white text-[#E91E8C] shadow-sm transition-all duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:shadow-md hover:shadow-rose-300/30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={itemClassName}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}