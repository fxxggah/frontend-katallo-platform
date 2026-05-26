import Link from "next/link";
import type { CategoryResponse, StoreResponse } from "@/types";
import { ArrowUpRight } from "lucide-react";

type GbGamesCategoryCardProps = {
  store: StoreResponse;
  category: CategoryResponse;
};

export function GbGamesCategoryCard({
  store,
  category,
}: GbGamesCategoryCardProps) {
  return (
    <Link
      href={`/${store.slug}/category/${category.slug}`}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7B2CFF]/40 hover:shadow-[0_0_40px_rgba(123,44,255,0.2)]"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#7B2CFF]/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#A855F7]">
          Categoria
        </span>

        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {category.name}
          </h3>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 group-hover:border-[#7B2CFF]/40 group-hover:bg-[#7B2CFF]/20 group-hover:text-white">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}