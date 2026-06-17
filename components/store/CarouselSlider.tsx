"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselSliderProps<T> = {
  items: T[];
  itemsPerPage?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
};

export function CarouselSlider<T>({
  items,
  itemsPerPage = 4,
  renderItem,
  className = "",
}: CarouselSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + itemsPerPage < items.length;

  const changePage = useCallback(
    (newIndex: number, newDirection: "left" | "right") => {
      if (isAnimating) return;

      setDirection(newDirection);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex(newIndex);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(false);
          });
        });
      }, 180);
    },
    [isAnimating]
  );

  const handlePrev = useCallback(() => {
    if (!canGoPrev) return;

    changePage(
      Math.max(0, currentIndex - itemsPerPage),
      "left"
    );
  }, [canGoPrev, changePage, currentIndex, itemsPerPage]);

  const handleNext = useCallback(() => {
    if (!canGoNext) return;

    changePage(
      Math.min(
        items.length - itemsPerPage,
        currentIndex + itemsPerPage
      ),
      "right"
    );
  }, [
    canGoNext,
    changePage,
    currentIndex,
    items.length,
    itemsPerPage,
  ]);

  const handleDotClick = useCallback(
    (pageIndex: number) => {
      const targetIndex = pageIndex * itemsPerPage;

      changePage(
        targetIndex,
        targetIndex > currentIndex ? "right" : "left"
      );
    },
    [changePage, currentIndex, itemsPerPage]
  );

  const visibleItems = items.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  if (items.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {items.length > itemsPerPage && (
        <>
          <button
            onClick={handlePrev}
            disabled={!canGoPrev || isAnimating}
            aria-label="Anterior"
            className="absolute -left-5 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white shadow-[0_4px_16px_rgba(194,24,91,0.18)] text-[#C2185B] transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:shadow-[0_6px_20px_rgba(233,30,140,0.30)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext || isAnimating}
            aria-label="Próximo"
            className="absolute -right-5 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white shadow-[0_4px_16px_rgba(194,24,91,0.18)] text-[#C2185B] transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:shadow-[0_6px_20px_rgba(233,30,140,0.30)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="overflow-hidden">
        <div
          className={`
            grid gap-5 sm:grid-cols-2 xl:grid-cols-4
            transition-all duration-300 ease-out
            ${
              isAnimating
                ? direction === "right"
                  ? "-translate-x-10 opacity-0 scale-[0.98]"
                  : "translate-x-10 opacity-0 scale-[0.98]"
                : "translate-x-0 opacity-100 scale-100"
            }
          `}
        >
          {visibleItems.map((item, index) => (
            <div
              key={currentIndex + index}
              className="transition-all duration-300"
              style={{
                transitionDelay: isAnimating
                  ? "0ms"
                  : `${index * 40}ms`,
              }}
            >
              {renderItem(item, currentIndex + index)}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handleDotClick(pageIndex)}
              aria-label={`Página ${pageIndex + 1}`}
              className={`transition-all duration-300 ${
                pageIndex === currentPage
                  ? "h-2 w-8 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B] shadow-[0_0_12px_rgba(233,30,140,0.45)]"
                  : "h-2 w-2 rounded-full bg-rose-200 hover:scale-125 hover:bg-rose-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}