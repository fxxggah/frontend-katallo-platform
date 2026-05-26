"use client";

import Link from "next/link";
import type { ProductResponse, StoreResponse } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { ShoppingCart } from "lucide-react";

type GbGamesProductCardProps = {
  store: StoreResponse;
  product: ProductResponse;
};

export function GbGamesProductCard({
  store,
  product,
}: GbGamesProductCardProps) {
  const firstImage = product.images?.[0]?.imageUrl;
  const secondImage = product.images?.[1]?.imageUrl;

  const optimizedFirstImage = firstImage
    ? firstImage.replace("/upload/", "/upload/w_700,q_auto,f_auto/")
    : null;

  const optimizedSecondImage = secondImage
    ? secondImage.replace("/upload/", "/upload/w_700,q_auto,f_auto/")
    : null;

  return (
    <Link
      href={`/${store.slug}/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#111118] transition-all duration-500 hover:-translate-y-2 hover:border-[#7B2CFF]/40 hover:shadow-[0_0_60px_rgba(123,44,255,0.2)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {optimizedFirstImage ? (
          <>
            <img
              src={optimizedFirstImage}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                optimizedSecondImage
                  ? "group-hover:opacity-0 group-hover:scale-110"
                  : "group-hover:scale-110"
              }`}
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
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Sem imagem
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />

        <div className="absolute left-4 top-4 rounded-full border border-[#7B2CFF]/30 bg-[#5A00B1]/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white backdrop-blur-xl">
          Gamer
        </div>

        <button
          type="button"
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 hover:bg-[#7B2CFF]/20"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-[#C084FC]">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-black tracking-tight text-white">
            {formatPrice(product.promotionalPrice ?? product.price)}
          </span>

          {product.promotionalPrice && (
            <span className="text-sm text-zinc-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}