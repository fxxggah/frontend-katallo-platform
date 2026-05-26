import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesProductCard } from "../components/GbGamesProductCard";

type GbGamesCategoryTemplateProps = {
  store: StoreResponse;
  category: CategoryResponse | null;
  productsPage: PagedResponse<ProductResponse>;
};

export function GbGamesCategoryTemplate({
  store,
  category,
  productsPage,
}: GbGamesCategoryTemplateProps) {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <GbGamesNavbar store={store} />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-14">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#A855F7]">
            Categoria
          </span>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            {category?.name ?? "Produtos"}
          </h1>

          <p className="mt-4 text-zinc-400">
            {productsPage.totalElements} produtos encontrados.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {productsPage.content.map((product) => (
            <GbGamesProductCard
              key={product.id}
              store={store}
              product={product}
            />
          ))}
        </div>
      </main>

      <GbGamesFooter store={store} />
    </div>
  );
}