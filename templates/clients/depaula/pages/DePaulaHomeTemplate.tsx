import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { Shield, Flame } from "lucide-react";

import { DePaulaNavbar } from "../components/DePaulaNavbar";
import { DePaulaHero } from "../components/DePaulaHero";
import { DePaulaFooter } from "../components/DePaulaFooter";
import { DePaulaCategoryCard } from "../components/DePaulaCategoryCard";
import { DePaulaProductCard } from "../components/DePaulaProductCard";
import { DePaulaHorizontalCarousel } from "@/templates/clients/depaula/components/DePaulaHorizontalCarousel";

type DePaulaHomeTemplateProps = {
  store: StoreResponse;
  categories: CategoryResponse[];
  productsPage: PagedResponse<ProductResponse>;
};

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  icon: Icon = Shield,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-[#D4AF37]" />
        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-3 text-4xl font-bold uppercase text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-white/40">{subtitle}</p>
      )}
    </div>
  );
}

export function DePaulaHomeTemplate({
  store,
  categories,
  productsPage,
}: DePaulaHomeTemplateProps) {
  const featuredProducts = productsPage.content.filter(
    (product) => product.featured && product.inStock
  );

  const availableProducts = productsPage.content.filter(
    (product) => product.inStock
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <DePaulaNavbar store={store} />

      <main>
        <DePaulaHero />

        {/* Categorias */}
        {categories.length > 0 && (
          <section id="categorias" className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Categorias"
              title="Explore as coleções"
              subtitle="Cada categoria carrega sua própria atitude."
            />
            <div className="px-6">
              <DePaulaHorizontalCarousel
                items={categories}
                itemClassName="w-[260px] flex-none md:w-[300px]"
                renderItem={(category) => (
                  <DePaulaCategoryCard store={store} category={category} />
                )}
              />
            </div>
          </section>
        )}

        {/* Divisor decorativo */}
        {featuredProducts.length > 0 && (
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <Flame size={13} className="text-[#D4AF37]" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            </div>
          </div>
        )}

        {/* Destaques */}
        {featuredProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Destaques"
              title="Produtos em destaque"
              subtitle="As peças mais procuradas da temporada."
              icon={Flame}
            />
            <div className="px-6">
              <DePaulaHorizontalCarousel
                items={featuredProducts}
                itemClassName="w-[220px] flex-none sm:w-[250px] md:w-[270px]"
                renderItem={(product) => (
                  <DePaulaProductCard store={store} product={product} />
                )}
              />
            </div>
          </section>
        )}

        {/* Banner do brasão */}
        <div className="relative mx-6 overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-[#111111] px-8 py-12 text-center my-8 max-w-full lg:mx-auto lg:max-w-7xl">
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }} />
          <div className="relative">
            <Shield size={28} className="mx-auto mb-4 text-[#D4AF37]" />
            <p className="text-xl font-bold uppercase italic text-white sm:text-2xl">
              Nosso brasão, nossa história.
            </p>
            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Tradição urbana em cada peça ✦
            </p>
          </div>
        </div>

        {/* Catálogo completo */}
        {availableProducts.length > 0 && (
          <section id="produtos" className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Catálogo"
              title="Todos os produtos"
              subtitle="Navegue por toda a coleção De Paula."
            />
            <div className="px-6">
              <DePaulaHorizontalCarousel
                items={availableProducts}
                itemClassName="w-[220px] flex-none sm:w-[250px] md:w-[270px]"
                renderItem={(product) => (
                  <DePaulaProductCard store={store} product={product} />
                )}
              />
            </div>
          </section>
        )}
      </main>

      <DePaulaFooter store={store} />
    </div>
  );
}