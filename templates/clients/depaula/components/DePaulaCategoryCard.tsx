import Link from "next/link";

import type {
  CategoryResponse,
  StoreResponse,
} from "@/types";

import { ArrowRight, Shield } from "lucide-react";

type DePaulaCategoryCardProps = {
  store: StoreResponse;
  category: CategoryResponse;
};

export function DePaulaCategoryCard({
  store,
  category,
}: DePaulaCategoryCardProps) {
  return (
    <Link
      href={`/${store.slug}/category/${category.slug}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#111111] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/50">

        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#D4AF37]/5 transition-transform duration-500 group-hover:scale-125" />

        <div className="relative z-10">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/5 transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:border-transparent">
            <Shield
              size={18}
              className="text-[#D4AF37] transition-colors duration-300 group-hover:text-black"
            />
          </div>

          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#D4AF37]/60">
            Categoria
          </span>

          <h3 className="mt-2 text-lg font-bold uppercase tracking-tight text-white transition-colors group-hover:text-[#D4AF37]">
            {category.name}
          </h3>
        </div>

        <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-transparent text-[#D4AF37] transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowRight size={15} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />

      </article>
    </Link>
  );
}