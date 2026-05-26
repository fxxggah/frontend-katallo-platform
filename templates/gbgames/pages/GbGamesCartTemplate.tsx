"use client";

import Link from "next/link";

import type { StoreResponse } from "@/types";

import { useCartContext } from "@/contexts/CartContext";

import { formatPrice } from "@/utils/formatPrice";
import { buildWhatsAppLink } from "@/utils/buildWhatsAppLink";

import { Trash2 } from "lucide-react";

import { GbGamesNavbar } from "../components/GbGamesNavbar";
import { GbGamesFooter } from "../components/GbGamesFooter";

type GbGamesCartTemplateProps = {
  store: StoreResponse;
};

export function GbGamesCartTemplate({
  store,
}: GbGamesCartTemplateProps) {
  const {
    items,
    totalPrice,
    removeFromCart,
  } = useCartContext();

  const whatsappLink = buildWhatsAppLink({
    whatsappNumber: store.whatsappNumber ?? "",
    items,
  });

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
                  className="flex items-center justify-between rounded-[28px] border border-white/10 bg-[#111118] p-6"
                >
                  <div>
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-zinc-500">
                      Quantidade: {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-xl font-black">
                      {formatPrice(item.price)}
                    </span>

                    <button
                      onClick={() =>
                        removeFromCart(item.productId)
                      }
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 transition-all hover:bg-red-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
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
    </div>
  );
}