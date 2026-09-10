"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

import type {
  ProductResponse,
  StoreResponse,
} from "@/types";

import { formatPrice } from "@/utils/formatPrice";

type DePaulaProductCardProps = {
  store: StoreResponse;
  product: ProductResponse;
};

export function DePaulaProductCard({
  store,
  product,
}: DePaulaProductCardProps) {
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
      <article className="relative overflow-hidden rounded-xl bg-[#111111] border border-[#D4AF37]/15 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40">

        {/* Imagem */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
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
              <Shield size={40} className="text-white/10" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.promotionalPrice && !isOutOfStock && (
            <div className="absolute left-3 top-3 rounded-md bg-[#D4AF37] px-3.5 py-1.5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black">Oferta</span>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute left-3 top-3 rounded-md bg-black/70 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Esgotado</span>
            </div>
          )}

          {!isOutOfStock && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex items-center gap-2 whitespace-nowrap rounded-md bg-[#D4AF37] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                Ver produto
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="line-clamp-2 min-h-[22px] text-[13px] font-bold uppercase leading-snug text-white transition-colors group-hover:text-[#D4AF37]">
            {product.name}
          </h3>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-lg font-black text-[#D4AF37]">
              {formatPrice(product.promotionalPrice ?? product.price)}
            </span>

            {product.promotionalPrice && (
              <span className="mb-0.5 text-xs text-white/30 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="mt-3 h-0.5 w-0 rounded-full bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
        </div>

      </article>
    </Link>
  );
}