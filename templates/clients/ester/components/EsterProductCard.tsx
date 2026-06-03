"use client";

import Link from "next/link";

import type {
  ProductResponse,
  StoreResponse,
} from "@/types";

import { formatPrice } from "@/utils/formatPrice";

type EsterProductCardProps = {
  store: StoreResponse;
  product: ProductResponse;
};

export function EsterProductCard({
  store,
  product,
}: EsterProductCardProps) {
  const image = product.images?.[0]?.imageUrl;

  const optimizedImage = image
    ? image.replace("/upload/", "/upload/w_600,q_auto,f_auto/")
    : null;

  const isOutOfStock = !product.inStock;

  return (
    <Link
      href={`/${store.slug}/product/${product.slug}`}
      className={`group block ${
        isOutOfStock ? "opacity-75" : ""
      }`}
    >
      <article className="overflow-hidden rounded-[28px] border border-[#F3E8EA] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(231,190,198,0.25)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#FFF8F8]">
          {optimizedImage ? (
            <img
              src={optimizedImage}
              alt={product.name}
              className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
                isOutOfStock
                  ? "grayscale"
                  : ""
              }`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#C8A9AF]">
              Sem imagem
            </div>
          )}

          {product.promotionalPrice && !isOutOfStock && (
            <div className="absolute left-4 top-4 rounded-full bg-[#D89CA8] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Oferta
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute left-4 top-4 rounded-full bg-[#A67C84] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Esgotado
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold text-[#4B3C40] transition-colors group-hover:text-[#D89CA8]">
            {product.name}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xl font-bold text-[#2F2528]">
              {formatPrice(
                product.promotionalPrice ??
                  product.price
              )}
            </span>

            {product.promotionalPrice && (
              <span className="text-sm text-[#C8A9AF] line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {!isOutOfStock && (
            <div className="mt-5">
              <span className="inline-flex items-center rounded-full bg-[#FFF2F4] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D89CA8]">
                Ver produto
              </span>
            </div>
          )}

          {isOutOfStock && (
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#B79AA0]">
              Produto indisponível
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}