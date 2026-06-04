"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Check, Zap, Shield, Truck, Cpu } from "lucide-react";

import type { ProductResponse, StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesRelatedProductsCarousel } from "../components/GbGamesRelatedProductsCarousel";
import { GbGamesParticles } from "../components/GbGamesParticles";

type GbGamesProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
  relatedProducts?: ProductResponse[];
};

type PendingCartAction = "add" | "remove" | null;

export function GbGamesProductTemplate({ store, product, relatedProducts = [] }: GbGamesProductTemplateProps) {
  const { addToCart, removeFromCart, items } = useCartContext();

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

  const hasDiscount = !!product.promotionalPrice;
  const discountPct = hasDiscount
    ? Math.round((1 - product.promotionalPrice! / product.price) * 100)
    : 0;

  return (
    <div className="relative min-h-screen bg-[#06040F] text-white">
      <GbGamesParticles />
      <GbGamesNavbar store={store} />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 pt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px]">

          {/* ── Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#7B2CFF]/15 bg-[#0A0818] shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(123,44,255,0.05)]">
              {/* Corner accents */}
              <div className="absolute left-0 top-0 z-20 h-6 w-6 border-l-2 border-t-2 border-[#7B2CFF]/40 rounded-tl-2xl" />
              <div className="absolute right-0 bottom-0 z-20 h-6 w-6 border-r-2 border-b-2 border-[#7B2CFF]/40 rounded-br-2xl" />

              {optimizedImage ? (
                <>
                  <img
                    src={optimizedImage}
                    alt={product.name}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                  />
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,44,255,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              ) : (
                <div className="flex aspect-square items-center justify-center text-zinc-700">
                  <Zap size={64} />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#06040F]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {isOutOfStock && (
                <div className="absolute left-5 top-5 z-20 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-red-300 backdrop-blur-md">
                  Esgotado
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden flex-shrink-0 rounded-xl border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-[#7B2CFF] shadow-[0_0_20px_rgba(123,44,255,0.5)]"
                        : "border-white/8 hover:border-[#7B2CFF]/40"
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={product.name}
                      className={`h-20 w-20 object-cover ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-[#7B2CFF]/10" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="lg:sticky lg:top-28 lg:h-fit space-y-0">

            {/* Top badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-2 rounded-xl border border-[#7B2CFF]/25 bg-[#7B2CFF]/8 px-4 py-2">
                <Zap size={10} className="text-[#F5C542]" fill="#F5C542" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C084FC]">
                  Gamer Premium
                </span>
              </div>

              {hasDiscount && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">
                    -{discountPct}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Product name */}
            <h1
              className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "'Syne', 'Georgia', serif" }}
            >
              {product.name}
            </h1>

            {/* Decorative line */}
            <div className="mt-5 flex items-center gap-2">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#7B2CFF] via-[#A855F7] to-[#F5C542] rounded-full" />
              <div className="h-[2px] w-4 bg-[#A855F7]/20 rounded-full" />
            </div>

            {/* Price block */}
            <div className="mt-7 rounded-xl border border-[#7B2CFF]/15 bg-[#0A0818]/80 p-5">
              <div className="flex items-end gap-4">
                <span
                  className="text-5xl font-black tracking-tight text-white"
                  style={{ fontFamily: "'Syne', serif" }}
                >
                  {formatPrice(product.promotionalPrice ?? product.price)}
                </span>
                {product.promotionalPrice && (
                  <span className="mb-1.5 text-lg text-zinc-600 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Perks row */}
              <div className="mt-4 flex flex-wrap gap-3 border-t border-white/5 pt-4">
                {[
                  { icon: Truck, label: "Envio rápido" },
                  { icon: Shield, label: "Garantia" },
                  { icon: Cpu, label: "Premium" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon size={11} className="text-[#7B2CFF]/60" />
                    <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-7 whitespace-pre-line text-sm leading-relaxed text-zinc-400">
                {product.description}
              </p>
            )}

            {/* CTA */}
            {isOutOfStock ? (
              <button
                disabled
                className="mt-8 w-full cursor-not-allowed rounded-xl border border-zinc-800 bg-zinc-900/60 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-zinc-600"
              >
                Produto Esgotado
              </button>
            ) : (
              <button
                onClick={openConfirmation}
                className={`group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 ${
                  isInCart
                    ? "bg-gradient-to-r from-red-700 to-rose-600 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_45px_rgba(239,68,68,0.45)]"
                    : "bg-gradient-to-br from-[#4A0099] to-[#7B2CFF] shadow-[0_0_40px_rgba(123,44,255,0.4)] hover:shadow-[0_0_60px_rgba(123,44,255,0.6)]"
                }`}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <ShoppingCart size={17} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">
                  {isInCart ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
                </span>
              </button>
            )}

            {/* Cart status */}
            {isInCart && !isOutOfStock && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/6 px-4 py-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Check size={13} className="text-emerald-400" />
                </div>
                <span className="text-sm font-semibold text-emerald-400">
                  Produto já está no carrinho
                </span>
              </div>
            )}

            {isOutOfStock && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/6 px-4 py-3 text-center text-sm font-semibold text-red-400">
                Este produto está indisponível no momento.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Section divider */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#7B2CFF]/25 to-transparent" />
        </div>
      </div>

      <div className="relative z-10">
        <GbGamesRelatedProductsCarousel store={store} products={relatedProducts} />
      </div>
      <GbGamesFooter store={store} />

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