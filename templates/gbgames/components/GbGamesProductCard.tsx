"use client";

import Link from "next/link";
import type { ProductResponse, StoreResponse } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { ShoppingCart, Zap, Star } from "lucide-react";

type GbGamesProductCardProps = {
  store: StoreResponse;
  product: ProductResponse;
};

export function GbGamesProductCard({ store, product }: GbGamesProductCardProps) {
  const firstImage = product.images?.[0]?.imageUrl;
  const secondImage = product.images?.[1]?.imageUrl;

  const optimizedFirstImage = firstImage
    ? firstImage.replace("/upload/", "/upload/w_700,q_auto,f_auto/")
    : null;

  const optimizedSecondImage = secondImage
    ? secondImage.replace("/upload/", "/upload/w_700,q_auto,f_auto/")
    : null;

  const hasDiscount = !!product.promotionalPrice;
  const discountPct = hasDiscount
    ? Math.round((1 - product.promotionalPrice! / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/${store.slug}/product/${product.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 ${
        product.inStock
          ? "border-white/8 bg-[#0A0818] hover:-translate-y-2 hover:border-[#7B2CFF]/50 hover:shadow-[0_8px_60px_rgba(123,44,255,0.22),0_0_0_1px_rgba(123,44,255,0.1)]"
          : "border-red-900/30 bg-[#0A0818]/70 opacity-75"
      }`}
    >
      {/* Corner accents */}
      <div className="absolute left-0 top-0 z-20 h-4 w-4 border-l-2 border-t-2 border-[#7B2CFF]/30 transition-all duration-500 group-hover:border-[#A855F7]/60 group-hover:h-5 group-hover:w-5" />
      <div className="absolute right-0 top-0 z-20 h-4 w-4 border-r-2 border-t-2 border-[#7B2CFF]/30 transition-all duration-500 group-hover:border-[#A855F7]/60 group-hover:h-5 group-hover:w-5" />

      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Image glow on hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#06040F] via-[#06040F]/10 to-transparent" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(123,44,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {optimizedFirstImage ? (
          <>
            <img
              src={optimizedFirstImage}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                optimizedSecondImage
                  ? "group-hover:opacity-0 group-hover:scale-110"
                  : "group-hover:scale-108"
              } ${!product.inStock ? "grayscale" : ""}`}
            />
            {optimizedSecondImage && (
              <img
                src={optimizedSecondImage}
                alt={product.name}
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-[#0E0820] text-zinc-600">
            <Zap size={36} />
          </div>
        )}

        {/* Badges top row */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 rounded-lg border border-[#7B2CFF]/30 bg-[#06040F]/80 px-2.5 py-1 backdrop-blur-md">
            <Zap size={8} className="text-[#F5C542]" fill="#F5C542" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#C084FC]">
              Gamer
            </span>
          </div>

          {product.featured && product.inStock && (
            <div className="flex items-center gap-1.5 rounded-lg border border-[#F5C542]/30 bg-[#06040F]/80 px-2.5 py-1 backdrop-blur-md">
              <Star size={8} className="text-[#F5C542]" fill="#F5C542" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#F5C542]">
                Destaque
              </span>
            </div>
          )}

          {hasDiscount && product.inStock && (
            <div className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-[#06040F]/80 px-2.5 py-1 backdrop-blur-md">
              <span className="text-[8px] font-black text-emerald-400">
                -{discountPct}%
              </span>
            </div>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute right-3 top-3 z-20 rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-1.5 backdrop-blur-md">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-red-300">
              Esgotado
            </span>
          </div>
        )}

        {/* Add to cart hover button */}
        {product.inStock && (
          <button
            type="button"
            className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-[#7B2CFF]/40 bg-[#06040F]/80 text-[#C084FC] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:border-[#A855F7]/70 hover:bg-[#7B2CFF]/25 hover:shadow-[0_0_20px_rgba(123,44,255,0.4)] hover:scale-110"
          >
            <ShoppingCart size={17} />
          </button>
        )}
      </div>

      {/* Info area */}
      <div className="relative flex flex-1 flex-col p-5">
        {/* Scan line divider */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#7B2CFF]/20 to-transparent" />

        <h3
          className="line-clamp-2 text-base font-bold text-white/90 transition-colors duration-300 group-hover:text-[#E2C4FF]"
          style={{ fontFamily: "'Syne', 'Georgia', serif" }}
        >
          {product.name}
        </h3>

        <div className="mt-auto pt-4 flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-2xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Syne', serif" }}
            >
              {formatPrice(product.promotionalPrice ?? product.price)}
            </span>
            {product.promotionalPrice && (
              <span className="text-xs text-zinc-600 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Status dot */}
          <div className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full ${product.inStock ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.6)]"}`} />
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">
              {product.inStock ? "Disponível" : "Esgotado"}
            </span>
          </div>
        </div>

        {/* Bottom glow line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7B2CFF]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </Link>
  );
}