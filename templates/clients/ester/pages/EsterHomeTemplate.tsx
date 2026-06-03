import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

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
    <div className="min-h-screen bg-[#FFFDFD] text-[#4B3C40]">
      <EsterNavbar store={store} />

      <main>
        <EsterHero store={store} />

        {categories.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
                Categorias
              </span>

              <h2 className="mt-3 text-4xl font-semibold">
                Explore nossas coleções
              </h2>

              <p className="mt-3 max-w-xl text-[#8D7378]">
                Descubra produtos selecionados para valorizar seu estilo.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

        {featuredProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
                Destaques
              </span>

              <h2 className="mt-3 text-4xl font-semibold">
                Produtos em destaque
              </h2>

              <p className="mt-3 max-w-xl text-[#8D7378]">
                Os favoritos das nossas clientes.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        {availableProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-24">
            <div className="mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
                Catálogo
              </span>

              <h2 className="mt-3 text-4xl font-semibold">
                Todos os produtos
              </h2>

              <p className="mt-3 max-w-xl text-[#8D7378]">
                Navegue por toda a nossa seleção.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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