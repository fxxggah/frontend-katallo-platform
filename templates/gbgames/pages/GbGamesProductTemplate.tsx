"use client";

import { useMemo, useState } from "react";

import type {
  ProductResponse,
  StoreResponse,
} from "@/types";

import { formatPrice } from "@/utils/formatPrice";

import { useCartContext } from "@/contexts/CartContext";

import {
  ShoppingCart,
  Check,
} from "lucide-react";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesRelatedProductsCarousel } from "../components/GbGamesRelatedProductsCarousel";

type GbGamesProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
  relatedProducts?: ProductResponse[];
};

export function GbGamesProductTemplate({
  store,
  product,
  relatedProducts = [],
}: GbGamesProductTemplateProps) {
  const { addToCart, items } = useCartContext();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = product.images ?? [];

  const isOutOfStock = !product.inStock;

  const selectedImage = useMemo(() => {
    return images[selectedImageIndex]?.imageUrl ?? null;
  }, [images, selectedImageIndex]);

  const optimizedImage = selectedImage
    ? selectedImage.replace("/upload/", "/upload/w_1200,q_auto,f_auto/")
    : null;

  const isInCart = items.some(
    (item) => item.productId === product.id
  );

  function handleAddToCart() {
    if (isOutOfStock) return;

    addToCart(product, 1);
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <GbGamesNavbar store={store} />

      <main className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111118]">
            {optimizedImage ? (
              <img
                src={optimizedImage}
                alt={product.name}
                className={`h-full w-full object-cover ${
                  isOutOfStock ? "grayscale opacity-70" : ""
                }`}
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-zinc-500">
                Sem imagem
              </div>
            )}

            {isOutOfStock && (
              <div className="absolute left-6 top-6 rounded-full border border-red-500/40 bg-red-500/20 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-red-200 backdrop-blur-xl">
                Esgotado
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-5 flex gap-3 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    selectedImageIndex === index
                      ? "border-[#7B2CFF]"
                      : "border-white/10"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={product.name}
                    className={`h-24 w-24 object-cover ${
                      isOutOfStock ? "grayscale opacity-70" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="rounded-full border border-[#7B2CFF]/30 bg-[#7B2CFF]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white">
            Gamer Premium
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
            {product.name}
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-5xl font-black tracking-tight">
              {formatPrice(
                product.promotionalPrice ?? product.price
              )}
            </span>

            {product.promotionalPrice && (
              <span className="text-xl text-zinc-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-zinc-400">
              {product.description}
            </p>
          )}

          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="mt-10 flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-[24px] bg-zinc-700 px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-zinc-300"
            >
              Esgotado
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-[24px] bg-gradient-to-r from-[#5A00B1] to-[#7B2CFF] px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_0_50px_rgba(123,44,255,0.35)] transition-all duration-300 hover:scale-[1.02]"
            >
              <ShoppingCart size={20} />

              Adicionar ao Carrinho
            </button>
          )}

          {isInCart && !isOutOfStock && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400">
              <Check size={16} />
              Produto já está no carrinho
            </div>
          )}

          {isOutOfStock && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-300">
              Este produto está indisponível no momento.
            </div>
          )}
        </div>
      </main>

      <GbGamesRelatedProductsCarousel
        store={store}
        products={relatedProducts}
      />

      <GbGamesFooter store={store} />
    </div>
  );
}