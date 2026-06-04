"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

import type { StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

import { EsterNavbar } from "../components/EsterNavbar";
import { EsterFooter } from "../components/EsterFooter";

type EsterCartTemplateProps = {
  store: StoreResponse;
};

type PendingCartAction =
  | { type: "decrease"; productId: number; productName: string; currentQuantity: number }
  | { type: "remove"; productId: number; productName: string }
  | null;

export function EsterCartTemplate({ store }: EsterCartTemplateProps) {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCartContext();
  const [pendingAction, setPendingAction] = useState<PendingCartAction>(null);

  const whatsappLink = buildWhatsAppLink({
    whatsappNumber: store.whatsappNumber ?? "",
    items,
  });

  function closeDialog() {
    setPendingAction(null);
  }

  function confirmAction() {
    if (!pendingAction) return;

    if (pendingAction.type === "decrease") {
      const next = pendingAction.currentQuantity - 1;
      if (next <= 0) {
        removeFromCart(pendingAction.productId);
      } else {
        updateQuantity(pendingAction.productId, next);
      }
    }

    if (pendingAction.type === "remove") {
      removeFromCart(pendingAction.productId);
    }

    closeDialog();
  }

  return (
    <div className="min-h-screen bg-white text-[#2D0A1E]">
      <EsterNavbar store={store} />

      {/* Header da página */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FCE4EC] via-[#FFF0F5] to-[#FCE4EC] pb-14 pt-14">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, #C2185B 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-gradient-to-bl from-[#E91E8C]/15 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag size={13} className="text-[#E91E8C]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#E91E8C]">
              Carrinho
            </span>
          </div>
          <h1
            className="mt-4 text-5xl font-bold text-[#2D0A1E]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Seu pedido
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 20C360 40 1080 0 1440 20V40H0V20Z" fill="white" />
          </svg>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-14">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-[#FFF0F5] to-white p-20 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD9]">
              <ShoppingBag size={32} className="text-[#E91E8C]" />
            </div>
            <h2
              className="text-2xl font-bold text-[#2D0A1E]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Seu carrinho está vazio
            </h2>
            <p className="mt-2 text-[#9A5568]">
              Explore nossa coleção e encontre peças incríveis.
            </p>
            <Link
              href={`/${store.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#C2185B] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-rose-400/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-400/40"
            >
              Ver coleção
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Itens */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-4 rounded-3xl border border-rose-50 bg-white p-6 shadow-[0_4px_20px_rgba(194,24,91,0.06)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-[#2D0A1E]">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#E91E8C]">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Controle de quantidade */}
                    <div className="flex items-center gap-1.5 rounded-full border border-rose-100 bg-[#FFF0F5] p-1">
                      <button
                        onClick={() =>
                          setPendingAction({
                            type: "decrease",
                            productId: item.productId,
                            productName: item.name,
                            currentQuantity: item.quantity,
                          })
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#C2185B] shadow-sm transition-all hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:shadow-md hover:shadow-rose-300/30"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="w-7 text-center text-sm font-black text-[#2D0A1E]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#C2185B] shadow-sm transition-all hover:bg-gradient-to-br hover:from-[#E91E8C] hover:to-[#C2185B] hover:text-white hover:shadow-md hover:shadow-rose-300/30"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Remover */}
                    <button
                      onClick={() =>
                        setPendingAction({
                          type: "remove",
                          productId: item.productId,
                          productName: item.name,
                        })
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-400 transition-all hover:bg-red-500 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-red-300/30"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <aside className="h-fit rounded-3xl border border-rose-50 bg-gradient-to-br from-[#FFF0F5] to-white p-8 shadow-[0_8px_40px_rgba(194,24,91,0.08)] lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={14} className="text-[#E91E8C]" />
                <h2
                  className="text-xl font-bold text-[#2D0A1E]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Resumo do pedido
                </h2>
              </div>

              <div className="space-y-3 border-t border-rose-100 pt-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-[#7A4A5A]">
                      {item.name} <span className="text-[#C2185B] font-semibold">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-[#2D0A1E]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-rose-200 pt-5">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-[#7A4A5A]">Total</span>
                <strong
                  className="text-3xl font-black text-[#C2185B]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#E91E8C] to-[#C2185B] px-8 py-4.5 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-rose-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-400/40"
              >
                <span>Finalizar no WhatsApp</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-[#C2185B]/50">
                Atendimento via WhatsApp ✦
              </p>
            </aside>

          </div>
        )}
      </main>

      <EsterFooter store={store} />

      <CartActionConfirmDialog
        open={pendingAction !== null}
        title="Confirmar ação?"
        description="Deseja continuar?"
        confirmLabel="Confirmar"
        variant="remove"
        onConfirm={confirmAction}
        onClose={closeDialog}
      />
    </div>
  );
}