import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesHero } from "../components/GbGamesHero";
import { GbGamesCategoryCard } from "../components/GbGamesCategoryCard";
import { GbGamesProductCard } from "../components/GbGamesProductCard";

type GbGamesHomeTemplateProps = {
  store: StoreResponse;
  categories: CategoryResponse[];
  productsPage: PagedResponse<ProductResponse>;
};

export function GbGamesHomeTemplate({
  store,
  categories,
  productsPage,
}: GbGamesHomeTemplateProps) {
  const featuredProducts = productsPage.content.filter(
    (product) => product.featured && product.inStock
  );

  const availableProducts = productsPage.content.filter(
    (product) => product.inStock
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#09090B] text-white">
      <GbGamesNavbar store={store} />

      <main>
        <GbGamesHero />

        {categories.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-10">
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#A855F7]">
                Explore
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Categorias
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <GbGamesCategoryCard
                  key={category.id}
                  store={store}
                  category={category}
                />
              ))}
            </div>
          </section>
        )}

        {featuredProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#A855F7]">
                Destaques
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Produtos em destaque
              </h2>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Explore os produtos mais vendidos da GB Games.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <GbGamesProductCard
                  key={product.id}
                  store={store}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

        {availableProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-24">
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#A855F7]">
                Estoque
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Produtos disponíveis
              </h2>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Explore todos os produtos disponíveis da GB Games.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {availableProducts.map((product) => (
                <GbGamesProductCard
                  key={product.id}
                  store={store}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <GbGamesFooter store={store} />
    </div>
  );
}