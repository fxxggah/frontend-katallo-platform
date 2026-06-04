import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { Sparkles, Star } from "lucide-react";

import { EsterNavbar } from "../components/EsterNavbar";
import { EsterHero } from "../components/EsterHero";
import { EsterFooter } from "../components/EsterFooter";
import { EsterCategoryCard } from "../components/EsterCategoryCard";
import { EsterProductCard } from "../components/EsterProductCard";

type EsterHomeTemplateProps = {
  store: StoreResponse;
  categories: CategoryResponse[];
  productsPage: PagedResponse<ProductResponse>;
};

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  icon: Icon = Sparkles,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-[#E91E8C]" />
        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#E91E8C]">
          {eyebrow}
        </span>
      </div>
      <h2
        className="mt-3 text-4xl font-bold text-[#2D0A1E] sm:text-5xl"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-[#9A5568]">{subtitle}</p>
      )}
    </div>
  );
}

export function EsterHomeTemplate({
  store,
  categories,
  productsPage,
}: EsterHomeTemplateProps) {
  const featuredProducts = productsPage.content.filter(
    (product) => product.featured && product.inStock
  );

  const availableProducts = productsPage.content.filter(
    (product) => product.inStock
  );

  return (
    <div className="min-h-screen bg-white text-[#2D0A1E]">
      <EsterNavbar store={store} />

      <main>
        <EsterHero store={store} />

        {/* Categorias */}
        {categories.length > 0 && (
          <section id="categorias" className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Categorias"
              title="Explore nossas coleções"
              subtitle="Descubra peças cuidadosamente selecionadas para cada ocasião."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <EsterCategoryCard
                  key={category.id}
                  store={store}
                  category={category}
                />
              ))}
            </div>
          </section>
        )}

        {/* Divisor decorativo */}
        {featuredProducts.length > 0 && (
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD9]">
                <Star size={13} className="fill-[#E91E8C] text-[#E91E8C]" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
            </div>
          </div>
        )}

        {/* Destaques */}
        {featuredProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Destaques"
              title="Produtos em destaque"
              subtitle="As peças favoritas das nossas clientes."
              icon={Star}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <EsterProductCard
                  key={product.id}
                  store={store}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

        {/* Banner fé intermediário */}
        <div className="relative mx-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#880E4F] via-[#C2185B] to-[#E91E8C] px-8 py-12 text-center my-8 max-w-full lg:mx-auto lg:max-w-7xl">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }} />
          <div className="relative">
            <p
              className="text-xl font-bold italic text-white/95 sm:text-2xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              "A beleza que vem do Senhor é a mais radiante de todas."
            </p>
            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
              Vista-se com graça e elegância ✦
            </p>
          </div>
        </div>

        {/* Catálogo completo */}
        {availableProducts.length > 0 && (
          <section id="produtos" className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader
              eyebrow="Catálogo"
              title="Todos os produtos"
              subtitle="Navegue por toda a nossa seleção de moda evangélica."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availableProducts.map((product) => (
                <EsterProductCard
                  key={product.id}
                  store={store}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <EsterFooter store={store} />
    </div>
  );
}