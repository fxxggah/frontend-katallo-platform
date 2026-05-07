"use client";

import { useMemo, useState } from "react";
import type { ProductResponse, StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { MinimalRelatedProductsCarousel } from "../components/MinimalRelatedProductsCarousel";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";
import { formatPrice } from "@/utils/formatPrice";
import { useCartContext } from "@/contexts/CartContext";
import { Check, Plus, Trash2 } from "lucide-react";

type MinimalProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
  relatedProducts?: ProductResponse[];
};

type PendingCartAction = "add" | "remove" | null;

export function MinimalProductTemplate({
  store,
  product,
  relatedProducts = [],
}: MinimalProductTemplateProps) {
  const { items, addToCart, removeFromCart } = useCartContext();

  const images = product.images ?? [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pendingCartAction, setPendingCartAction] =
    useState<PendingCartAction>(null);

  const isProductInCart = items.some((item) => item.productId === product.id);

  const selectedImage = useMemo(() => {
    return images[selectedImageIndex]?.imageUrl ?? null;
  }, [images, selectedImageIndex]);

  const optimizedSelectedImage = selectedImage
    ? selectedImage.replace("/upload/", "/upload/w_1000,q_auto,f_auto/")
    : null;

  function openCartConfirmation() {
    setPendingCartAction(isProductInCart ? "remove" : "add");
  }

  function closeCartConfirmation() {
    setPendingCartAction(null);
  }

  function handleConfirmCartAction() {
    if (pendingCartAction === "add") {
      addToCart(product, 1);
    }

    if (pendingCartAction === "remove") {
      removeFromCart(product.id);
    }

    closeCartConfirmation();
  }

  const confirmDialogTitle =
    pendingCartAction === "remove"
      ? "Remover do carrinho?"
      : "Adicionar ao carrinho?";

  const confirmDialogDescription =
    pendingCartAction === "remove"
      ? `Você está prestes a remover "${product.name}" do carrinho.`
      : `Você está prestes a adicionar "${product.name}" ao carrinho.`;

  const confirmDialogLabel =
    pendingCartAction === "remove"
      ? "Remover produto"
      : "Adicionar produto";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <MinimalNavbar store={store} />

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <div className="aspect-square overflow-hidden rounded-[40px] border border-zinc-100 bg-white shadow-sm">
            {optimizedSelectedImage ? (
              <img
                src={optimizedSelectedImage}
                alt={product.name}
                className="h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-bold uppercase tracking-widest text-zinc-300">
                Sem imagem
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => {
                const isActive = index === selectedImageIndex;

                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-20 w-20 overflow-hidden rounded-2xl border bg-white transition-all ${
                      isActive
                        ? "border-zinc-900 ring-4 ring-zinc-900/5 shadow-md"
                        : "border-zinc-100 hover:border-zinc-300"
                    }`}
                  >
                    <img
                      src={img.imageUrl.replace(
                        "/upload/",
                        "/upload/w_200,q_auto,f_auto/"
                      )}
                      alt={`${product.name} - imagem ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center rounded-[40px] border border-white bg-white p-8 shadow-2xl shadow-zinc-200/50 sm:p-12 lg:sticky lg:top-32">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">
            PRODUTO
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-10 flex items-center gap-4">
            {product.promotionalPrice ? (
              <>
                <span className="text-4xl font-black text-zinc-950">
                  {formatPrice(product.promotionalPrice)}
                </span>

                <span className="text-lg text-zinc-300 line-through decoration-zinc-200">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-black text-zinc-950">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={openCartConfirmation}
            className={`group mt-10 flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:shadow-xl active:scale-95 ${
              isProductInCart
                ? "bg-rose-600 hover:bg-rose-500"
                : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {isProductInCart ? (
              <>
                <Trash2 size={16} />
                Remover do carrinho
              </>
            ) : (
              <>
                <Plus size={16} />
                Adicionar ao carrinho
              </>
            )}
          </button>

          {isProductInCart && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <Check size={16} />
              Produto já está no carrinho
            </div>
          )}
        </div>
      </main>

      {product.description && (
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="rounded-[32px] border border-zinc-100 bg-white p-8 shadow-sm sm:p-10">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-indigo-600">
              Detalhes
            </span>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-900">
              Descrição do produto
            </h2>

            <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-zinc-500">
              {product.description}
            </p>
          </div>
        </section>
      )}

      <MinimalRelatedProductsCarousel
        store={store}
        products={relatedProducts}
      />

      <MinimalFooter store={store} />

      <CartActionConfirmDialog
        open={pendingCartAction !== null}
        title={confirmDialogTitle}
        description={confirmDialogDescription}
        confirmLabel={confirmDialogLabel}
        variant={pendingCartAction === "remove" ? "remove" : "add"}
        onConfirm={handleConfirmCartAction}
        onClose={closeCartConfirmation}
      />
    </div>
  );
}