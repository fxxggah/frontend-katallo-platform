"use client";

import { useState } from "react";
import Link from "next/link";

import type { StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";

import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";

import { Trash2, Plus, Minus } from "lucide-react";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

type GbGamesCartTemplateProps = {
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
  | null;

export function GbGamesCartTemplate({
  store,
}: GbGamesCartTemplateProps) {
  const {
    items,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCartContext();

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

    closeConfirmDialog();
  }

  const dialogTitle =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? "Remover produto do carrinho?"
        : "Retirar uma unidade?"
      : pendingAction?.type === "remove"
      ? "Remover produto do carrinho?"
      : "";

  const dialogDescription =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? `Esse produto tem apenas 1 unidade. Se confirmar, "${pendingAction.productName}" será removido do carrinho.`
        : `Você está prestes a retirar 1 unidade de "${pendingAction.productName}" do carrinho.`
      : pendingAction?.type === "remove"
      ? `Você está prestes a remover "${pendingAction.productName}" do carrinho.`
      : "";

  const dialogConfirmLabel =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? "Remover produto"
        : "Retirar unidade"
      : pendingAction?.type === "remove"
      ? "Remover produto"
      : "Confirmar";

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <GbGamesNavbar store={store} />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#A855F7]">
            Checkout
          </span>

          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Seu carrinho
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-[#111118] p-20 text-center">
            <p className="text-xl text-zinc-400">
              Seu carrinho está vazio.
            </p>

            <Link
              href={`/${store.slug}`}
              className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-[#5A00B1] to-[#7B2CFF] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-4 justify-between rounded-[28px] border border-white/10 bg-[#111118] p-6 sm:flex-row sm:items-center"
                >
                  <div>
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      {formatPrice(item.price)} / unidade
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 border-t border-white/5 pt-4 sm:border-none sm:pt-0">
                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#161622] p-1">
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
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e1e2f] text-zinc-400 transition hover:bg-[#A855F7] hover:text-white"
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
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e1e2f] text-zinc-400 transition hover:bg-[#A855F7] hover:text-white"
                        aria-label="Adicionar uma unidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Preço e Lixeira */}
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setPendingAction({
                            type: "remove",
                            productId: item.productId,
                            productName: item.name,
                          })
                        }
                        className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition-all hover:bg-red-500/20"
                        aria-label="Remover produto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[32px] border border-white/10 bg-[#111118] p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl font-black">
                Resumo
              </h2>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-zinc-400">
                  Total
                </span>

                <strong className="text-4xl font-black">
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-10 flex w-full items-center justify-center rounded-[24px] bg-green-600 px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-green-500"
              >
                Finalizar no WhatsApp
              </a>
            </aside>
          </div>
        )}
      </main>

      <GbGamesFooter store={store} />

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