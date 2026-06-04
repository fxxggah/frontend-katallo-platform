import type { CategoryResponse, PagedResponse, ProductResponse, StoreResponse } from "@/types";
import { Zap, Star, Cpu } from "lucide-react";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesHero } from "../components/GbGamesHero";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesCategoryCard } from "../components/GbGamesCategoryCard";
import { GbGamesProductCard } from "../components/GbGamesProductCard";
import { GbGamesParticles } from "../components/GbGamesParticles";

type GbGamesHomeTemplateProps = {
  store: StoreResponse;
  categories: CategoryResponse[];
  productsPage: PagedResponse<ProductResponse>;
};

// ─────────────────────────────────────────────
// Section Header
// ─────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = "purple",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: "purple" | "gold";
}) {
  const accentColor = accent === "gold" ? "#F5C542" : "#A855F7";

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2.5">
        {accent === "gold" ? (
          <Star size={10} className="text-[#F5C542]" fill="#F5C542" />
        ) : (
          <Zap size={10} className="text-[#F5C542]" fill="#F5C542" />
        )}
        <span
          className="text-[9px] font-black uppercase tracking-[0.45em] font-mono"
          style={{ color: accentColor }}
        >
          {eyebrow}
        </span>
        <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-current to-transparent opacity-20" style={{ color: accentColor }} />
      </div>

      <h2
        className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl"
        style={{ fontFamily: "'Syne', 'Georgia', serif" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">{subtitle}</p>
      )}

      {/* Decorative line */}
      <div className="mt-5 flex items-center gap-2">
        <div className="h-[2px] w-10 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] rounded-full" />
        <div className="h-[2px] w-4 bg-[#A855F7]/30 rounded-full" />
        <div className="h-1 w-1 rounded-full bg-[#F5C542]/60" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Section Divider
// ─────────────────────────────────────────────
function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#7B2CFF]/25 to-transparent" />
        {label && (
          <div className="flex items-center gap-2 rounded-full border border-[#7B2CFF]/15 bg-[#7B2CFF]/5 px-4 py-1.5">
            <Cpu size={8} className="text-[#7B2CFF]/50" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 font-mono">
              {label}
            </span>
          </div>
        )}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#7B2CFF]/25 to-transparent" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Home Template
// ─────────────────────────────────────────────
export function GbGamesHomeTemplate({ store, categories, productsPage }: GbGamesHomeTemplateProps) {
  const featuredProducts = productsPage.content.filter((p) => p.featured && p.inStock);
  const availableProducts = productsPage.content.filter((p) => p.inStock);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06040F] text-white">
      {/* Global particle canvas */}
      <GbGamesParticles />

      <GbGamesNavbar store={store} />

      <main className="relative z-10">
        <GbGamesHero />

        {/* ── Categories ── */}
        {categories.length > 0 && (
          <section id="categorias" className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Explore"
              title="Categorias"
              subtitle="Encontre exatamente o que você precisa para o seu setup."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <GbGamesCategoryCard key={category.id} store={store} category={category} />
              ))}
            </div>
          </section>
        )}

        <SectionDivider label="Sistema Premium" />

        {/* ── Featured ── */}
        {featuredProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Destaques"
              title="Produtos em destaque"
              subtitle="Os mais vendidos e melhores avaliados da GB Games."
              accent="gold"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <GbGamesProductCard key={product.id} store={store} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ── Mid Banner ── */}
        <div className="relative mx-6 my-4 overflow-hidden rounded-2xl border border-[#7B2CFF]/20 bg-gradient-to-r from-[#0A0018] via-[#130028] to-[#0A0018] px-8 py-12 lg:mx-auto lg:max-w-7xl">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Corner accents */}
          <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#7B2CFF]/40 rounded-tl-2xl" />
          <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-[#7B2CFF]/40 rounded-br-2xl" />

          <div className="absolute left-1/2 top-1/2 h-[200px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A0099]/20 blur-3xl" />

          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#F5C542]/60 font-mono">
                Eleve seu setup
              </p>
              <p
                className="mt-2 text-3xl font-black text-white sm:text-4xl"
                style={{ fontFamily: "'Syne', 'Georgia', serif" }}
              >
                Hardware de ponta.
                <span className="block bg-gradient-to-r from-[#A855F7] to-[#7B2CFF] bg-clip-text text-transparent">
                  Preço justo.
                </span>
              </p>
            </div>
            <a
              href="#produtos"
              className="group relative overflow-hidden flex-shrink-0 rounded-xl border border-[#7B2CFF]/35 bg-[#7B2CFF]/10 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-[#7B2CFF]/20 hover:shadow-[0_0_30px_rgba(123,44,255,0.35)] hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Ver todos os produtos</span>
            </a>
          </div>
        </div>

        <SectionDivider label="Catálogo" />

        {/* ── All products ── */}
        {availableProducts.length > 0 && (
          <section id="produtos" className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Estoque"
              title="Produtos disponíveis"
              subtitle="Explore todo o catálogo GB Games."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availableProducts.map((product) => (
                <GbGamesProductCard key={product.id} store={store} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>

      <GbGamesFooter store={store} />
    </div>
  );
}