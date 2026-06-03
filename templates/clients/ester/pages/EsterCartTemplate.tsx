"use client";

import { useState } from "react";
import Link from "next/link";

import type { StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";

import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";

import {
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

import { EsterNavbar } from "../components/EsterNavbar";
import { EsterFooter } from "../components/EsterFooter";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

type EsterCartTemplateProps = {
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

export function EsterCartTemplate({
  store,
}: EsterCartTemplateProps) {
  const {
    items,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCartContext();

  const [pendingAction, setPendingAction] =
    useState<PendingCartAction>(null);

  const whatsappLink = buildWhatsAppLink({
    whatsappNumber:
      store.whatsappNumber ?? "",
    items,
  });

  function closeDialog() {
    setPendingAction(null);
  }

  function confirmAction() {
    if (!pendingAction) return;

    if (pendingAction.type === "decrease") {
      const next =
        pendingAction.currentQuantity - 1;

      if (next <= 0) {
        removeFromCart(
          pendingAction.productId
        );
      } else {
        updateQuantity(
          pendingAction.productId,
          next
        );
      }
    }

    if (pendingAction.type === "remove") {
      removeFromCart(
        pendingAction.productId
      );
    }

    closeDialog();
  }

  return (
    <div className="min-h-screen bg-[#FFFDFD] text-[#4B3C40]">
      <EsterNavbar store={store} />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D89CA8]">
            Carrinho
          </span>

          <h1 className="mt-4 text-5xl font-semibold">
            Seu pedido
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[32px] border border-[#F3E8EA] bg-white p-20 text-center">
            <p className="text-xl text-[#8D7378]">
              Seu carrinho está vazio.
            </p>

            <Link
              href={`/${store.slug}`}
              className="mt-8 inline-flex rounded-2xl bg-[#D89CA8] px-8 py-4 font-semibold text-white"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-5 rounded-[28px] border border-[#F3E8EA] bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-[#8D7378]">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setPendingAction({
                            type: "decrease",
                            productId:
                              item.productId,
                            productName:
                              item.name,
                            currentQuantity:
                              item.quantity,
                          })
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF2F4]"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF2F4]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setPendingAction({
                          type: "remove",
                          productId:
                            item.productId,
                          productName:
                            item.name,
                        })
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[32px] border border-[#F3E8EA] bg-white p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl font-semibold">
                Resumo
              </h2>

              <div className="mt-8 flex items-center justify-between">
                <span>Total</span>

                <strong className="text-4xl font-bold">
                  {formatPrice(totalPrice)}
                </strong>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-10 flex w-full items-center justify-center rounded-[24px] bg-[#D89CA8] px-8 py-5 font-semibold text-white transition-all hover:bg-[#CA8795]"
              >
                Finalizar no WhatsApp
              </a>
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