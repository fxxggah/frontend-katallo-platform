"use client";

import { useState } from "react";
import Link from "next/link";
import type { StoreResponse } from "@/types";
import { MinimalNavbar } from "../components/MinimalNavbar";
import { MinimalFooter } from "../components/MinimalFooter";
import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";
import { Trash2, Plus, Minus } from "lucide-react";

type MinimalCartTemplateProps = {
  store: StoreResponse;
};

type PendingCartAction =
  | {
      type: "decrease";
      productId: number;
      productName: string;
      currentQuantity: number;
    }
  | {
      type: "remove";
      productId: number;
      productName: string;
    }
  | {
      type: "clear";
    }
  | null;

export function MinimalCartTemplate({ store }: MinimalCartTemplateProps) {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCartContext();

  const [pendingAction, setPendingAction] = useState<PendingCartAction>(null);

  const whatsappLink = buildWhatsAppLink({
    whatsappNumber: store.whatsappNumber ?? "",
    items,
  });

  function closeConfirmDialog() {
    setPendingAction(null);
  }

  function confirmCartAction() {
    if (!pendingAction) return;

    if (pendingAction.type === "decrease") {
      const nextQuantity = pendingAction.currentQuantity - 1;

      if (nextQuantity <= 0) {
        removeFromCart(pendingAction.productId);
      } else {
        updateQuantity(pendingAction.productId, nextQuantity);
      }
    }

    if (pendingAction.type === "remove") {
      removeFromCart(pendingAction.productId);
    }

    if (pendingAction.type === "clear") {
      clearCart();
    }

    closeConfirmDialog();
  }

  const dialogTitle =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? "Remover produto do carrinho?"
        : "Retirar uma unidade?"
      : pendingAction?.type === "remove"
      ? "Remover produto do carrinho?"
      : pendingAction?.type === "clear"
      ? "Esvaziar carrinho?"
      : "";

  const dialogDescription =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? `Esse produto tem apenas 1 unidade. Se confirmar, "${pendingAction.productName}" será removido do carrinho.`
        : `Você está prestes a retirar 1 unidade de "${pendingAction.productName}" do carrinho.`
      : pendingAction?.type === "remove"
      ? `Você está prestes a remover "${pendingAction.productName}" do carrinho.`
      : pendingAction?.type === "clear"
      ? "Você está prestes a remover todos os produtos do carrinho."
      : "";

  const dialogConfirmLabel =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? "Remover produto"
        : "Retirar unidade"
      : pendingAction?.type === "remove"
      ? "Remover produto"
      : pendingAction?.type === "clear"
      ? "Esvaziar carrinho"
      : "Confirmar";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <MinimalNavbar store={store} />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Checkout
          </span>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Seu Carrinho
          </h1>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-zinc-200 bg-white p-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-300">
              <Trash2 size={24} />
            </div>

            <p className="text-lg font-medium text-zinc-500">
              O carrinho parece solitário.
            </p>

            <Link
              href={`/${store.slug}`}
              className="mt-8 rounded-full bg-zinc-900 px-10 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="group relative flex flex-col gap-5 rounded-[24px] border border-zinc-100 bg-white p-5 transition-all hover:shadow-xl hover:shadow-zinc-200/50 sm:flex-row sm:items-center"
                >
                  <div className="flex flex-1 items-center gap-5">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold tracking-tight text-zinc-900">
                        {item.name}
                      </h2>

                      <p className="text-sm font-medium text-zinc-400">
                        {formatPrice(item.price)} / unidade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-6 border-t border-zinc-50 pt-4 sm:border-none sm:pt-0">
                    <div className="flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          setPendingAction({
                            type: "decrease",
                            productId: item.productId,
                            productName: item.name,
                            currentQuantity: item.quantity,
                          })
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-900 hover:text-white"
                        aria-label="Retirar uma unidade"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-900 hover:text-white"
                        aria-label="Adicionar uma unidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({
                          type: "remove",
                          productId: item.productId,
                          productName: item.name,
                        })
                      }
                      className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label="Remover produto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="sticky top-28 h-fit space-y-6 rounded-[32px] border border-white bg-white p-8 shadow-2xl shadow-zinc-200/60">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Resumo do Pedido
              </h2>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                <span className="font-medium text-zinc-500">Subtotal</span>

                <strong className="text-3xl font-black tracking-tighter text-zinc-950">
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <div className="space-y-3 pt-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center rounded-2xl bg-green-600 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 active:scale-[0.98]"
                >
                  Finalizar no WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setPendingAction({ type: "clear" })}
                  className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition hover:text-red-500"
                >
                  Esvaziar Carrinho
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      <MinimalFooter store={store} />

      <CartActionConfirmDialog
        open={pendingAction !== null}
        title={dialogTitle}
        description={dialogDescription}
        confirmLabel={dialogConfirmLabel}
        variant="remove"
        onConfirm={confirmCartAction}
        onClose={closeConfirmDialog}
      />
    </div>
  );
}