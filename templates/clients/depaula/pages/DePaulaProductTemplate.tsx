"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, Check, Trash2, Shield } from "lucide-react";

import type { ProductResponse, StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

import { DePaulaNavbar } from "../components/DePaulaNavbar";
import { DePaulaFooter } from "../components/DePaulaFooter";
import { DePaulaRelatedProductsCarousel } from "../components/DePaulaRelatedProductsCarousel";

type DePaulaProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
  relatedProducts?: ProductResponse[];
};

type PendingCartAction = "add" | "remove" | null;

export function DePaulaProductTemplate({
  store,
  product,
  relatedProducts = [],
}: DePaulaProductTemplateProps) {
  const { items, addToCart, removeFromCart } = useCartContext();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pendingCartAction, setPendingCartAction] = useState<PendingCartAction>(null);

  const images = product.images ?? [];
  const isOutOfStock = !product.inStock;
  const isInCart = items.some((item) => item.productId === product.id);

  const selectedImage = useMemo(
    () => images[selectedImageIndex]?.imageUrl ?? null,
    [images, selectedImageIndex]
  );

  const optimizedImage = selectedImage
    ? selectedImage.replace("/upload/", "/upload/w_1200,q_auto,f_auto/")
    : null;

  function openConfirmation() {
    if (isOutOfStock) return;
    setPendingCartAction(isInCart ? "remove" : "add");
  }

  function closeConfirmation() {
    setPendingCartAction(null);
  }

  function confirmAction() {
    if (pendingCartAction === "add") addToCart(product, 1);
    if (pendingCartAction === "remove") removeFromCart(product.id);
    closeConfirmation();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <DePaulaNavbar store={store} />

      <main className="mx-auto grid max-w-7xl gap-14 px-6 py-14 lg:grid-cols-2">

        {/* Galeria */}
        <div>
          <div className="group overflow-hidden rounded-xl border border-[#D4AF37]/15 bg-[#111111]">
            {optimizedImage ? (
              <img
                src={optimizedImage}
                alt={product.name}
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                  isOutOfStock ? "grayscale opacity-70" : ""
                }`}
              />
            ) : (
              <div className="flex aspect-square items-center justify-center">
                <Shield size={56} className="text-white/10" />
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`overflow-hidden rounded-md border-2 transition-all duration-300 flex-shrink-0 ${
                    selectedImageIndex === index
                      ? "border-[#D4AF37]"
                      : "border-transparent hover:border-[#D4AF37]/40"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={product.name}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info do produto */}
        <div className="lg:sticky lg:top-28 lg:h-fit">

          <div className="inline-flex items-center gap-2 rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-2">
            <Shield size={11} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
              Coleção De Paula
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#D4AF37]" />

          <div className="mt-6 flex items-end gap-4">
            <span className="text-4xl font-black text-[#D4AF37]">
              {formatPrice(product.promotionalPrice ?? product.price)}
            </span>
            {product.promotionalPrice && (
              <span className="mb-1 text-lg text-white/30 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-white/60">
              {product.description}
            </p>
          )}

          {isOutOfStock ? (
            <button
              disabled
              className="mt-10 w-full rounded-md bg-white/10 px-8 py-4.5 text-sm font-bold uppercase tracking-[0.15em] text-white/40 cursor-not-allowed"
            >
              Produto Esgotado
            </button>
          ) : (
            <button
              onClick={openConfirmation}
              className={`group mt-10 flex w-full items-center justify-center gap-3 overflow-hidden rounded-md px-8 py-4.5 text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                isInCart
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-[#D4AF37] text-black hover:bg-[#E6B800]"
              }`}
            >
              {isInCart ? (
                <>
                  <Trash2 size={17} />
                  <span>Remover do Carrinho</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={17} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>Adicionar ao Carrinho</span>
                </>
              )}
            </button>
          )}

          {isInCart && (
            <div className="mt-4 flex items-center gap-2.5 rounded-md bg-[#D4AF37]/10 px-5 py-3.5 border border-[#D4AF37]/25">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]">
                <Check size={13} className="text-black" />
              </div>
              <span className="text-sm font-semibold text-[#D4AF37]">
                Produto já está no carrinho
              </span>
            </div>
          )}

        </div>
      </main>

      <DePaulaRelatedProductsCarousel store={store} products={relatedProducts} />
      <DePaulaFooter store={store} />

      <CartActionConfirmDialog
        open={pendingCartAction !== null}
        title={pendingCartAction === "remove" ? "Remover do carrinho?" : "Adicionar ao carrinho?"}
        description={
          pendingCartAction === "remove"
            ? `Você está prestes a remover "${product.name}" do carrinho.`
            : `Você está prestes a adicionar "${product.name}" ao carrinho.`
        }
        confirmLabel={pendingCartAction === "remove" ? "Remover produto" : "Adicionar produto"}
        variant={pendingCartAction === "remove" ? "remove" : "add"}
        onConfirm={confirmAction}
        onClose={closeConfirmation}
      />
    </div>
  );
}