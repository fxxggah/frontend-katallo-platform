import Link from "next/link";

import type {
  CategoryResponse,
  StoreResponse,
} from "@/types";

import { ArrowRight, Sparkles } from "lucide-react";

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
      <article className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(233,30,140,0.15)] shadow-[0_4px_16px_rgba(194,24,91,0.06)]">

        {/* Blob de fundo decorativo */}
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD9] transition-transform duration-500 group-hover:scale-125" />
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#E91E8C]/10 to-transparent" />

        <div className="relative z-10">
          {/* Ícone/sparkle */}
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD9] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#E91E8C] group-hover:to-[#C2185B] group-hover:shadow-lg group-hover:shadow-rose-300/40">
            <Sparkles
              size={18}
              className="text-[#C2185B] transition-colors duration-300 group-hover:text-white"
            />
          </div>

          {/* Label */}
          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#E91E8C]/70">
            Categoria
          </span>
          
          <h3
            className="mt-2 text-lg font-bold text-[#2D0A1E] transition-colors group-hover:text-[#C2185B]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {category.name}
          </h3>
        </div>

        {/* Seta */}
        <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-[#E91E8C] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#E91E8C] group-hover:to-[#C2185B] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-rose-300/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowRight size={15} />
        </div>

        {/* Linha de gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E91E8C] to-[#C2185B] scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />

      </article>
    </Link>
  );
}