"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield } from "lucide-react";

import type { StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

import { DePaulaNavbar } from "../components/DePaulaNavbar";
import { DePaulaFooter } from "../components/DePaulaFooter";

type DePaulaCartTemplateProps = {
  store: StoreResponse;
};

type PendingCartAction =
  | { type: "decrease"; productId: number; productName: string; currentQuantity: number }
  | { type: "remove"; productId: number; productName: string }
  | null;

export function DePaulaCartTemplate({ store }: DePaulaCartTemplateProps) {
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
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <DePaulaNavbar store={store} />

      {/* Header da página */}
      <div className="relative overflow-hidden bg-[#111111] pb-14 pt-14 border-b border-[#D4AF37]/15">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag size={13} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">
              Carrinho
            </span>
          </div>
          <h1 className="mt-4 text-5xl font-bold uppercase text-white">
            Seu pedido
          </h1>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-14">
        {items.length === 0 ? (
          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#111111] p-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/5">
              <ShoppingBag size={32} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-bold uppercase text-white">
              Seu carrinho está vazio
            </h2>
            <p className="mt-2 text-white/40">
              Explore nossa coleção e encontre as próximas peças.
            </p>
            <Link
              href={`/${store.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition-all hover:-translate-y-0.5 hover:bg-[#E6B800]"
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
                  className="flex flex-col gap-4 rounded-xl border border-[#D4AF37]/15 bg-[#111111] p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <h2 className="text-base font-bold uppercase text-white">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#D4AF37]">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 rounded-md border border-[#D4AF37]/20 bg-[#0A0A0A] p-1">
                      <button
                        onClick={() =>
                          setPendingAction({
                            type: "decrease",
                            productId: item.productId,
                            productName: item.name,
                            currentQuantity: item.quantity,
                          })
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="w-7 text-center text-sm font-black text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setPendingAction({
                          type: "remove",
                          productId: item.productId,
                          productName: item.name,
                        })
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-400 transition-all hover:bg-red-600 hover:text-white hover:border-transparent"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <aside className="h-fit rounded-xl border border-[#D4AF37]/15 bg-[#111111] p-8 lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-6">
                <Shield size={14} className="text-[#D4AF37]" />
                <h2 className="text-xl font-bold uppercase text-white">
                  Resumo do pedido
                </h2>
              </div>

              <div className="space-y-3 border-t border-[#D4AF37]/15 pt-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-white/50">
                      {item.name} <span className="text-[#D4AF37] font-semibold">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#D4AF37]/20 pt-5">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-white/50">Total</span>
                <strong className="text-3xl font-black text-[#D4AF37]">
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-md bg-[#D4AF37] px-8 py-4.5 text-sm font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6B800]"
              >
                <span>Finalizar no WhatsApp</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/30">
                Atendimento via WhatsApp ✦
              </p>
            </aside>

          </div>
        )}
      </main>

      <DePaulaFooter store={store} />

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