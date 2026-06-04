"use client";

import { useState } from "react";
import Link from "next/link";

import type { StoreResponse } from "@/types";
import { useCartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";
import { Trash2, Plus, Minus, ShoppingCart, Zap } from "lucide-react";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";
import { GbGamesParticles } from "../components/GbGamesParticles";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";

type GbGamesCartTemplateProps = {
  store: StoreResponse;
};

type PendingCartAction =
  | { type: "decrease"; productId: number; productName: string; currentQuantity: number }
  | { type: "remove"; productId: number; productName: string }
  | null;

export function GbGamesCartTemplate({ store }: GbGamesCartTemplateProps) {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCartContext();
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
      const next = pendingAction.currentQuantity - 1;
      next <= 0 ? removeFromCart(pendingAction.productId) : updateQuantity(pendingAction.productId, next);
    }
    if (pendingAction.type === "remove") removeFromCart(pendingAction.productId);
    closeConfirmDialog();
  }

  const dialogTitle =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1 ? "Remover produto do carrinho?" : "Retirar uma unidade?"
      : pendingAction?.type === "remove" ? "Remover produto do carrinho?" : "";

  const dialogDescription =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? `"${pendingAction.productName}" será removido do carrinho.`
        : `Retirar 1 unidade de "${pendingAction.productName}" do carrinho.`
      : pendingAction?.type === "remove"
      ? `Remover "${pendingAction.productName}" do carrinho.`
      : "";

  const dialogConfirmLabel =
    pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1 ? "Remover produto" : "Retirar unidade"
      : pendingAction?.type === "remove" ? "Remover produto" : "Confirmar";

  return (
    <div className="relative min-h-screen bg-[#06040F] text-white">
      <GbGamesParticles />
      <GbGamesNavbar store={store} />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 pt-32">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center gap-2 rounded-lg border border-[#7B2CFF]/20 bg-[#7B2CFF]/5 px-3 py-1.5">
              <Zap size={9} className="text-[#F5C542]" fill="#F5C542" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/60 font-mono">
                Checkout
              </span>
            </div>
          </div>
          <h1
            className="text-5xl font-black tracking-tight"
            style={{ fontFamily: "'Syne', 'Georgia', serif" }}
          >
            Seu{" "}
            <span className="bg-gradient-to-r from-[#A855F7] to-[#7B2CFF] bg-clip-text text-transparent">
              carrinho
            </span>
          </h1>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] rounded-full" />
            <div className="h-1 w-1 rounded-full bg-[#F5C542]/60" />
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty cart */
          <div className="relative overflow-hidden rounded-2xl border border-[#7B2CFF]/15 bg-[#0A0818] p-20 text-center">
            <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#7B2CFF]/30 rounded-tl-2xl" />
            <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-[#7B2CFF]/30 rounded-br-2xl" />

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7B2CFF]/20 bg-[#7B2CFF]/8 shadow-[0_0_30px_rgba(123,44,255,0.15)]">
              <ShoppingCart size={24} className="text-[#A855F7]" />
            </div>
            <p
              className="text-xl font-bold text-zinc-400"
              style={{ fontFamily: "'Syne', serif" }}
            >
              Seu carrinho está vazio.
            </p>
            <Link
              href={`/${store.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#4A0099] to-[#7B2CFF] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(123,44,255,0.4)] hover:shadow-[0_0_50px_rgba(123,44,255,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* Cart items */}
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.productId}
                  className="group relative overflow-hidden flex flex-col gap-4 justify-between rounded-2xl border border-[#7B2CFF]/12 bg-[#0A0818] p-6 sm:flex-row sm:items-center transition-all duration-300 hover:border-[#7B2CFF]/30 hover:shadow-[0_0_30px_rgba(123,44,255,0.08)]"
                >
                  {/* Corner accent */}
                  <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#7B2CFF]/20 transition-all duration-300 group-hover:border-[#7B2CFF]/50" />

                  {/* Item number */}
                  <div className="absolute right-4 bottom-4 text-[10px] font-black text-zinc-800 font-mono">
                    #{String(idx + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h2
                      className="text-lg font-bold text-white group-hover:text-[#E2C4FF] transition-colors duration-300"
                      style={{ fontFamily: "'Syne', serif" }}
                    >
                      {item.name}
                    </h2>
                    <p className="mt-1 text-xs text-zinc-600">
                      {formatPrice(item.price)} / unidade
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-6 border-t border-white/4 pt-4 sm:border-none sm:pt-0">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 rounded-xl border border-[#7B2CFF]/20 bg-[#06040F]/60 p-1">
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
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0E0820] text-zinc-500 transition-all duration-200 hover:bg-[#A855F7]/20 hover:text-[#C084FC] hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                        aria-label="Retirar uma unidade"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0E0820] text-zinc-500 transition-all duration-200 hover:bg-[#A855F7]/20 hover:text-[#C084FC] hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                        aria-label="Adicionar uma unidade"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price + delete */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xl font-black text-white"
                        style={{ fontFamily: "'Syne', serif" }}
                      >
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPendingAction({ type: "remove", productId: item.productId, productName: item.name })
                        }
                        className="rounded-xl border border-red-500/15 bg-red-500/6 p-3 text-red-500/60 transition-all duration-300 hover:border-red-500/35 hover:bg-red-500/15 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        aria-label="Remover produto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary sidebar */}
            <aside className="relative overflow-hidden h-fit rounded-2xl border border-[#7B2CFF]/20 bg-[#0A0818] p-8 lg:sticky lg:top-28">
              {/* Corner accents */}
              <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#7B2CFF]/35 rounded-tl-2xl" />
              <div className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-[#7B2CFF]/35 rounded-br-2xl" />

              {/* Inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,44,255,0.08),transparent_60%)]" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Zap size={10} className="text-[#F5C542]" fill="#F5C542" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7B2CFF]/60 font-mono">
                    Resumo
                  </span>
                </div>

                <h2
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: "'Syne', serif" }}
                >
                  Pedido
                </h2>

                {/* Items count */}
                <div className="mt-5 space-y-2 border-t border-white/5 pt-5">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-zinc-500 truncate max-w-[60%]">
                        {item.name} <span className="text-zinc-700">×{item.quantity}</span>
                      </span>
                      <span className="text-zinc-400 font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-[#7B2CFF]/15 pt-5 flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Total</span>
                  <strong
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: "'Syne', serif" }}
                  >
                    {formatPrice(totalPrice)}
                  </strong>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative mt-8 flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 px-8 py-4.5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(52,211,153,0.35)] hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Finalizar no WhatsApp</span>
                </a>

                <p className="mt-4 text-center text-[10px] text-zinc-700 uppercase tracking-wider">
                  Atendimento via WhatsApp
                </p>
              </div>
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