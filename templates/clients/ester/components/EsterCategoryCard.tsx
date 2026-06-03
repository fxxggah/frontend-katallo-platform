import Link from "next/link";

import type {
  CategoryResponse,
  StoreResponse,
} from "@/types";

import { ArrowRight } from "lucide-react";

type EsterCategoryCardProps = {
  store: StoreResponse;
  category: CategoryResponse;
};

export function EsterCategoryCard({
  store,
  category,
}: EsterCategoryCardProps) {
  return (
    <Link
      href={`/${store.slug}/category/${category.slug}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-[28px] border border-[#F3E8EA] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(231,190,198,0.20)]">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FCECEF]" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
              Categoria
            </span>

            <h3 className="mt-3 text-xl font-semibold text-[#4B3C40]">
              {category.name}
            </h3>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF2F4] text-[#D89CA8] transition-all duration-300 group-hover:bg-[#D89CA8] group-hover:text-white">
            <ArrowRight size={18} />
          </div>
        </div>
      </article>
    </Link>
  );
}