import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-white text-[#2D0A1E]">
      <EsterNavbar store={store} />

      {/* Header decorativo da categoria */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FCE4EC] via-[#FFF0F5] to-[#FCE4EC] pb-16 pt-16">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, #C2185B 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-bl from-[#E91E8C]/15 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#E91E8C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#E91E8C]">
              Categoria
            </span>
          </div>
          <h1
            className="mt-4 text-5xl font-bold text-[#2D0A1E] sm:text-6xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {category?.name ?? "Produtos"}
          </h1>
          <p className="mt-4 text-[#9A5568]">
            {productsPage.totalElements}{" "}
            {productsPage.totalElements === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        {/* Onda base */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 20C360 40 1080 0 1440 20V40H0V20Z" fill="white" />
          </svg>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-14">
        {productsPage.content.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsPage.content.map((product) => (
              <EsterProductCard
                key={product.id}
                store={store}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-[#FFF0F5] to-white p-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD9]">
              <Sparkles size={24} className="text-[#E91E8C]" />
            </div>
            <h2
              className="text-2xl font-bold text-[#2D0A1E]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Nenhum produto encontrado
            </h2>
            <p className="mt-3 text-[#9A5568]">
              Não existem produtos cadastrados nesta categoria ainda.
            </p>
          </div>
        )}
      </main>

      <EsterFooter store={store} />
    </div>
  );
}