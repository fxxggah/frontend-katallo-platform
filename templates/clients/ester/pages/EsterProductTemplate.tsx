"use client";

import { useMemo, useState } from "react";

import type {
  ProductResponse,
  StoreResponse,
} from "@/types";

import { useCartContext } from "@/contexts/CartContext";

import { formatPrice } from "@/utils/formatPrice";

import {
  ShoppingBag,
  Check,
  Trash2,
} from "lucide-react";

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
  const { items, addToCart, removeFromCart } =
    useCartContext();

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const [pendingCartAction, setPendingCartAction] =
    useState<PendingCartAction>(null);

  const images = product.images ?? [];

  const isOutOfStock = !product.inStock;

  const isInCart = items.some(
    (item) => item.productId === product.id
  );

  const selectedImage = useMemo(() => {
    return images[selectedImageIndex]?.imageUrl ?? null;
  }, [images, selectedImageIndex]);

  const optimizedImage = selectedImage
    ? selectedImage.replace(
        "/upload/",
        "/upload/w_1200,q_auto,f_auto/"
      )
    : null;

  function openConfirmation() {
    if (isOutOfStock) return;

    setPendingCartAction(
      isInCart ? "remove" : "add"
    );
  }

  function closeConfirmation() {
    setPendingCartAction(null);
  }

  function confirmAction() {
    if (pendingCartAction === "add") {
      addToCart(product, 1);
    }

    if (pendingCartAction === "remove") {
      removeFromCart(product.id);
    }

    closeConfirmation();
  }

  return (
    <div className="min-h-screen bg-[#FFFDFD] text-[#4B3C40]">
      <EsterNavbar store={store} />

      <main className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-[32px] border border-[#F3E8EA] bg-white">
            {optimizedImage ? (
              <img
                src={optimizedImage}
                alt={product.name}
                className={`h-full w-full object-cover ${
                  isOutOfStock
                    ? "grayscale opacity-70"
                    : ""
                }`}
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-[#B79AA0]">
                Sem imagem
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-5 flex gap-3 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() =>
                    setSelectedImageIndex(index)
                  }
                  className={`overflow-hidden rounded-2xl border ${
                    selectedImageIndex === index
                      ? "border-[#D89CA8]"
                      : "border-[#F3E8EA]"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={product.name}
                    className="h-24 w-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="rounded-full bg-[#FFF2F4] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
            Coleção Ester
          </span>

          <h1 className="mt-6 text-5xl font-semibold">
            {product.name}
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-5xl font-bold">
              {formatPrice(
                product.promotionalPrice ??
                  product.price
              )}
            </span>

            {product.promotionalPrice && (
              <span className="text-xl text-[#B79AA0] line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-[#8D7378]">
              {product.description}
            </p>
          )}

          {isOutOfStock ? (
            <button
              disabled
              className="mt-10 w-full rounded-[24px] bg-[#D6C8CB] px-8 py-5 font-semibold text-white"
            >
              Esgotado
            </button>
          ) : (
            <button
              onClick={openConfirmation}
              className={`mt-10 flex w-full items-center justify-center gap-3 rounded-[24px] px-8 py-5 font-semibold text-white transition-all ${
                isInCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#D89CA8] hover:bg-[#CA8795]"
              }`}
            >
              {isInCart ? (
                <>
                  <Trash2 size={18} />
                  Remover do Carrinho
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  Adicionar ao Carrinho
                </>
              )}
            </button>
          )}

          {isInCart && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#FFF2F4] px-4 py-3 text-[#D89CA8]">
              <Check size={16} />
              Produto já está no carrinho
            </div>
          )}
        </div>
      </main>

      <EsterRelatedProductsCarousel
        store={store}
        products={relatedProducts}
      />

      <EsterFooter store={store} />

      <CartActionConfirmDialog
        open={pendingCartAction !== null}
        title={
          pendingCartAction === "remove"
            ? "Remover do carrinho?"
            : "Adicionar ao carrinho?"
        }
        description={
          pendingCartAction === "remove"
            ? `Você está prestes a remover "${product.name}" do carrinho.`
            : `Você está prestes a adicionar "${product.name}" ao carrinho.`
        }
        confirmLabel={
          pendingCartAction === "remove"
            ? "Remover produto"
            : "Adicionar produto"
        }
        variant={
          pendingCartAction === "remove"
            ? "remove"
            : "add"
        }
        onConfirm={confirmAction}
        onClose={closeConfirmation}
      />
    </div>
  );
}