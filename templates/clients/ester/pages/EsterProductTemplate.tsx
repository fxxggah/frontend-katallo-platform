"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, Check, Trash2, Heart, Sparkles } from "lucide-react";

import type { ProductResponse, StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

import { EsterNavbar } from "../components/EsterNavbar";
import { EsterFooter } from "../components/EsterFooter";
import { EsterRelatedProductsCarousel } from "../components/EsterRelatedProductsCarousel";

type EsterProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
  relatedProducts?: ProductResponse[];
};

type PendingCartAction = "add" | "remove" | null;

export function EsterProductTemplate({
  store,
  product,
  relatedProducts = [],
}: EsterProductTemplateProps) {
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
    <div className="min-h-screen bg-white text-[#2D0A1E]">
      <EsterNavbar store={store} />

      <main className="mx-auto grid max-w-7xl gap-14 px-6 py-14 lg:grid-cols-2">

        {/* Galeria */}
        <div>
          {/* Imagem principal */}
          <div className="group overflow-hidden rounded-3xl border border-rose-50 bg-gradient-to-br from-[#FFF0F5] to-[#FCE4EC] shadow-[0_8px_40px_rgba(194,24,91,0.10)]">
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
                <Heart size={56} className="text-rose-200" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 flex-shrink-0 ${
                    selectedImageIndex === index
                      ? "border-[#E91E8C] shadow-md shadow-rose-300/30"
                      : "border-transparent hover:border-rose-200"
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

          {/* Badge coleção */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FCE4EC] to-[#F8BBD9] px-4 py-2 shadow-sm">
            <Sparkles size={11} className="text-[#E91E8C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C2185B]">
              Coleção Ester
            </span>
          </div>

          {/* Nome */}
          <h1
            className="mt-5 text-4xl font-bold leading-tight text-[#2D0A1E] sm:text-5xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {product.name}
          </h1>

          {/* Linha decorativa */}
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B]" />

          {/* Preços */}
          <div className="mt-6 flex items-end gap-4">
            <span
              className="text-4xl font-black text-[#C2185B]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {formatPrice(product.promotionalPrice ?? product.price)}
            </span>
            {product.promotionalPrice && (
              <span className="mb-1 text-lg text-[#B0818E] line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Descrição */}
          {product.description && (
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-[#7A4A5A]">
              {product.description}
            </p>
          )}

          {/* Botão de ação */}
          {isOutOfStock ? (
            <button
              disabled
              className="mt-10 w-full rounded-2xl bg-[#D6C8CB] px-8 py-4.5 text-sm font-bold uppercase tracking-[0.15em] text-white cursor-not-allowed"
            >
              Produto Esgotado
            </button>
          ) : (
            <button
              onClick={openConfirmation}
              className={`group mt-10 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-4.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                isInCart
                  ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-300/30 hover:shadow-red-400/40 hover:shadow-xl"
                  : "bg-gradient-to-r from-[#E91E8C] to-[#C2185B] shadow-lg shadow-rose-400/30 hover:shadow-rose-400/45 hover:shadow-xl"
              }`}
            >
              <span className={`absolute inset-0 transition-opacity duration-300 ${isInCart ? "bg-gradient-to-r from-rose-600 to-red-700 opacity-0 group-hover:opacity-100" : "bg-gradient-to-r from-[#C2185B] to-[#880E4F] opacity-0 group-hover:opacity-100"}`} />
              {isInCart ? (
                <>
                  <Trash2 size={17} className="relative z-10" />
                  <span className="relative z-10">Remover do Carrinho</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={17} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10">Adicionar ao Carrinho</span>
                </>
              )}
            </button>
          )}

          {/* Confirmação no carrinho */}
          {isInCart && (
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#FCE4EC] to-[#FFF0F5] px-5 py-3.5 border border-rose-100">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#E91E8C] to-[#C2185B]">
                <Check size={13} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-[#C2185B]">
                Produto já está no carrinho
              </span>
            </div>
          )}

        </div>
      </main>

      <EsterRelatedProductsCarousel store={store} products={relatedProducts} />
      <EsterFooter store={store} />

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