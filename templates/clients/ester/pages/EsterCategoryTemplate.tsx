import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { EsterNavbar } from "../components/EsterNavbar";
import { EsterFooter } from "../components/EsterFooter";
import { EsterProductCard } from "../components/EsterProductCard";

type EsterCategoryTemplateProps = {
  store: StoreResponse;
  category: CategoryResponse | null;
  productsPage: PagedResponse<ProductResponse>;
};

export function EsterCategoryTemplate({
  store,
  category,
  productsPage,
}: EsterCategoryTemplateProps) {
  return (
    <div className="min-h-screen bg-[#FFFDFD] text-[#4B3C40]">
      <EsterNavbar store={store} />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
            Categoria
          </span>

          <h1 className="mt-4 text-5xl font-semibold">
            {category?.name ?? "Produtos"}
          </h1>

          <p className="mt-4 text-[#8D7378]">
            {productsPage.totalElements} produtos encontrados.
          </p>
        </div>

        {productsPage.content.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsPage.content.map((product) => (
              <EsterProductCard
                key={product.id}
                store={store}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-[#F3E8EA] bg-white p-16 text-center">
            <h2 className="text-2xl font-semibold text-[#4B3C40]">
              Nenhum produto encontrado
            </h2>

            <p className="mt-3 text-[#8D7378]">
              Não existem produtos cadastrados nesta categoria.
            </p>
          </div>
        )}
      </main>

      <EsterFooter store={store} />
    </div>
  );
}