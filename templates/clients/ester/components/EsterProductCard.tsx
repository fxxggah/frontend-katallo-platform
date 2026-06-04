"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

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
      className={`group block ${isOutOfStock ? "opacity-70" : ""}`}
    >
      <article className="relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(233,30,140,0.18)] shadow-[0_4px_20px_rgba(194,24,91,0.08)] border border-rose-50">

        {/* Imagem */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#FFF0F5] to-[#FCE4EC]">
          {optimizedImage ? (
            <img
              src={optimizedImage}
              alt={product.name}
              className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-107 ${
                isOutOfStock ? "grayscale" : ""
              }`}
              style={{ transform: 'scale(1)', transitionProperty: 'transform' }}
              onMouseEnter={e => !isOutOfStock && (e.currentTarget.style.transform = 'scale(1.07)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Heart size={40} className="text-rose-200" />
            </div>
          )}

          {/* Overlay gradiente no hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#880E4F]/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Badge Oferta */}
          {product.promotionalPrice && !isOutOfStock && (
            <div className="absolute left-3 top-3 overflow-hidden rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B] px-3.5 py-1.5 shadow-lg shadow-rose-400/30">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Oferta</span>
            </div>
          )}

          {/* Badge Esgotado */}
          {isOutOfStock && (
            <div className="absolute left-3 top-3 rounded-full bg-[#5A2040]/70 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Esgotado</span>
            </div>
          )}

          {/* Botão ver produto no hover */}
          {!isOutOfStock && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white/95 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#C2185B] shadow-lg backdrop-blur-sm">
                <Heart size={11} className="fill-[#E91E8C] text-[#E91E8C]" />
                Ver produto
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Nome */}
          <h3 className="line-clamp-2 min-h-[44px] text-[13px] font-bold leading-snug text-[#2D0A1E] transition-colors group-hover:text-[#C2185B]">
            {product.name}
          </h3>

          {/* Preços */}
          <div className="mt-3 flex items-end gap-2">
            <span
              className="text-lg font-black text-[#C2185B]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {formatPrice(product.promotionalPrice ?? product.price)}
            </span>

            {product.promotionalPrice && (
              <span className="mb-0.5 text-xs text-[#B0818E] line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Linha decorativa de gradiente */}
          <div className="mt-3 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B] transition-all duration-500 group-hover:w-full" />
        </div>

      </article>
    </Link>
  );
}