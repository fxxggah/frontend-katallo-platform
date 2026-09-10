import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { Shield } from "lucide-react";

import { DePaulaNavbar } from "../components/DePaulaNavbar";
import { DePaulaFooter } from "../components/DePaulaFooter";
import { DePaulaProductCard } from "../components/DePaulaProductCard";
import { DePaulaHorizontalCarousel } from "@/templates/clients/depaula/components/DePaulaHorizontalCarousel";

type DePaulaCategoryTemplateProps = {
  store: StoreResponse;
  category: CategoryResponse | null;
  productsPage: PagedResponse<ProductResponse>;
};

export function DePaulaCategoryTemplate({
  store,
  category,
  productsPage,
}: DePaulaCategoryTemplateProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <DePaulaNavbar store={store} />

      {/* Header decorativo da categoria */}
      <div className="relative overflow-hidden bg-[#111111] pb-16 pt-16 border-b border-[#D4AF37]/15">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2">
            <Shield size={13} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">
              Categoria
            </span>
          </div>
          <h1 className="mt-4 text-5xl font-bold uppercase text-white sm:text-6xl">
            {category?.name ?? "Produtos"}
          </h1>
          <p className="mt-4 text-white/40">
            {productsPage.totalElements}{" "}
            {productsPage.totalElements === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-14">
        {productsPage.content.length > 0 ? (
          <div className="px-6">
            <DePaulaHorizontalCarousel
              items={productsPage.content}
              itemClassName="w-[220px] flex-none sm:w-[250px] md:w-[270px]"
              renderItem={(product) => (
                <DePaulaProductCard store={store} product={product} />
              )}
            />
          </div>
        ) : (
          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] p-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/5">
              <Shield size={24} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-bold uppercase text-white">
              Nenhum produto encontrado
            </h2>
            <p className="mt-3 text-white/40">
              Não existem produtos cadastrados nesta categoria ainda.
            </p>
          </div>
        )}
      </main>

      <DePaulaFooter store={store} />
    </div>
  );
}