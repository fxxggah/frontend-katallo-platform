import type { CategoryResponse, PagedResponse, ProductResponse, StoreResponse } from "@/types";
import { Zap, Cpu } from "lucide-react";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesProductCard } from "../components/GbGamesProductCard";
import { GbGamesParticles } from "../components/GbGamesParticles";

type GbGamesCategoryTemplateProps = {
  store: StoreResponse;
  category: CategoryResponse | null;
  productsPage: PagedResponse<ProductResponse>;
};

export function GbGamesCategoryTemplate({ store, category, productsPage }: GbGamesCategoryTemplateProps) {
  return (
    <div className="relative min-h-screen bg-[#06040F] text-white">
      <GbGamesParticles />
      <GbGamesNavbar store={store} />

      {/* ── Category Header ── */}
      <div className="relative overflow-hidden border-b border-[#7B2CFF]/10 bg-[#06040F] pb-20 pt-32">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(168,85,247,1) 0px, rgba(168,85,247,1) 1px, transparent 1px, transparent 80px)",
          }}
        />

        {/* Glows */}
        <div className="absolute left-1/4 top-1/2 h-[300px] w-[500px] -translate-y-1/2 rounded-full bg-[#4A0099]/18 blur-[100px]" />
        <div className="absolute right-0 top-0 h-[200px] w-[300px] rounded-full bg-[#1A0050]/30 blur-[80px]" />

        {/* Top scan line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7B2CFF]/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6">

          {/* Breadcrumb-style eyebrow */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex items-center gap-2 rounded-lg border border-[#7B2CFF]/20 bg-[#7B2CFF]/5 px-3 py-1.5">
              <Cpu size={9} className="text-[#7B2CFF]/60" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/60 font-mono">
                Categoria
              </span>
            </div>
            <div className="h-px w-6 bg-[#7B2CFF]/20" />
            <Zap size={9} className="text-[#F5C542]/60" fill="#F5C542" />
          </div>

          <h1
            className="text-6xl font-black tracking-tight text-white sm:text-7xl"
            style={{ fontFamily: "'Syne', 'Georgia', serif" }}
          >
            {category?.name ?? "Produtos"}
          </h1>

          {/* Decorative line + count */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] rounded-full" />
            <div className="h-1 w-1 rounded-full bg-[#F5C542]/70" />
            <span className="text-sm text-zinc-500">
              {productsPage.totalElements}{" "}
              {productsPage.totalElements === 1 ? "produto encontrado" : "produtos encontrados"}
            </span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#06040F] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7B2CFF]/20 to-transparent" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {productsPage.content.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsPage.content.map((product) => (
              <GbGamesProductCard key={product.id} store={store} product={product} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-[#7B2CFF]/15 bg-[#0A0818] p-20 text-center">
            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#7B2CFF]/30 rounded-tl-2xl" />
            <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-[#7B2CFF]/30 rounded-br-2xl" />

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7B2CFF]/20 bg-[#7B2CFF]/8 shadow-[0_0_30px_rgba(123,44,255,0.15)]">
              <Zap size={24} className="text-[#A855F7]" />
            </div>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Syne', 'Georgia', serif" }}
            >
              Nenhum produto encontrado
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Não existem produtos cadastrados nesta categoria ainda.
            </p>
          </div>
        )}
      </main>

      <GbGamesFooter store={store} />
    </div>
  );
}