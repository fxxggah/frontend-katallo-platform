import Link from "next/link";
import type { CategoryResponse, StoreResponse } from "@/types";
import { ArrowUpRight, Layers } from "lucide-react";

type GbGamesCategoryCardProps = {
  store: StoreResponse;
  category: CategoryResponse;
};

export function GbGamesCategoryCard({ store, category }: GbGamesCategoryCardProps) {
  return (
    <Link
      href={`/${store.slug}/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#0E0820]/90 to-[#06040F]/90 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#7B2CFF]/50 hover:shadow-[0_0_50px_rgba(123,44,255,0.25),inset_0_0_30px_rgba(123,44,255,0.04)]"
    >
      {/* Corner sci-fi accents */}
      <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#7B2CFF]/40 transition-all duration-500 group-hover:border-[#A855F7]/80 group-hover:h-7 group-hover:w-7" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-[#7B2CFF]/40 transition-all duration-500 group-hover:border-[#A855F7]/80 group-hover:h-7 group-hover:w-7" />

      {/* Glow orb */}
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#7B2CFF]/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-[#7B2CFF]/20" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10">
        {/* Icon container */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#7B2CFF]/25 bg-[#7B2CFF]/10 text-[#A855F7] transition-all duration-300 group-hover:border-[#A855F7]/50 group-hover:bg-[#7B2CFF]/20 group-hover:shadow-[0_0_20px_rgba(123,44,255,0.3)]">
          <Layers size={18} />
        </div>

        <span className="mt-5 block text-[9px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/70">
          Categoria
        </span>

        <div className="mt-2 flex items-end justify-between gap-4">
          <h3
            className="text-xl font-black text-white transition-colors duration-300 group-hover:text-[#E2C4FF]"
            style={{ fontFamily: "'Syne', 'Georgia', serif" }}
          >
            {category.name}
          </h3>

          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-zinc-500 transition-all duration-300 group-hover:border-[#7B2CFF]/50 group-hover:bg-[#7B2CFF]/15 group-hover:text-[#C084FC] group-hover:shadow-[0_0_15px_rgba(123,44,255,0.3)]">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-[#7B2CFF]/30 via-[#A855F7]/20 to-transparent transition-all duration-500 group-hover:from-[#7B2CFF]/60 group-hover:via-[#A855F7]/40" />
      </div>
    </Link>
  );
}