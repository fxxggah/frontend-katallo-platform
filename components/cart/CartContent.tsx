"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartActionConfirmDialog } from "@/components/cart/CartActionConfirmDialog";
import { useCartContext } from "@/contexts/CartContext";
import { formatPrice, generateWhatsAppLink } from "@/utils/formatPrice";
import type { StoreResponse } from "@/types";

type CartContentProps = {
  store: StoreResponse;
};

type PendingAction =
  | {
      type: "remove";
      productId: number;
      productName: string;
    }
  | {
      type: "decrease";
      productId: number;
      productName: string;
      currentQuantity: number;
    }
  | {
      type: "clear";
    }
  | null;

export function CartContent({ store }: CartContentProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCartContext();

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const generateOrderMessage = () => {
    if (items.length === 0) return "";

    const itemsList = items
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    return `Olá! Gostaria de comprar:\n\n${itemsList}\n\nTotal: ${formatPrice(
      totalPrice
    )}`;
  };

  const whatsappLink = generateWhatsAppLink(
    store.whatsappNumber ?? "",
    generateOrderMessage()
  );

  function closeDialog() {
    setPendingAction(null);
  }

  function confirmAction() {
    if (!pendingAction) return;

    if (pendingAction.type === "remove") {
      removeFromCart(pendingAction.productId);
    }

    if (pendingAction.type === "decrease") {
      const nextQuantity = pendingAction.currentQuantity - 1;

      if (nextQuantity <= 0) {
        removeFromCart(pendingAction.productId);
      } else {
        updateQuantity(pendingAction.productId, nextQuantity);
      }
    }

    if (pendingAction.type === "clear") {
      clearCart();
    }

    closeDialog();
  }

  const dialogTitle =
    pendingAction?.type === "remove"
      ? "Remover produto do carrinho?"
      : pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? "Remover produto do carrinho?"
        : "Diminuir quantidade?"
      : pendingAction?.type === "clear"
      ? "Limpar carrinho?"
      : "";

  const dialogDescription =
    pendingAction?.type === "remove"
      ? `Você está prestes a remover "${pendingAction.productName}" do carrinho.`
      : pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? `Esse produto tem apenas 1 unidade. Se confirmar, "${pendingAction.productName}" será removido do carrinho.`
        : `Você está prestes a retirar 1 unidade de "${pendingAction.productName}" do carrinho.`
      : pendingAction?.type === "clear"
      ? "Você está prestes a remover todos os produtos do carrinho."
      : "";

  const dialogConfirmLabel =
    pendingAction?.type === "remove"
      ? "Remover produto"
      : pendingAction?.type === "decrease"
      ? pendingAction.currentQuantity <= 1
        ? "Remover produto"
        : "Retirar unidade"
      : pendingAction?.type === "clear"
      ? "Limpar carrinho"
      : "Confirmar";

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>

        <h2 className="mb-2 font-serif text-2xl font-bold">
          Seu carrinho está vazio
        </h2>

        <p className="mb-8 max-w-sm text-muted-foreground">
          Parece que você ainda não adicionou nenhum produto ao seu carrinho.
        </p>

        <Button asChild size="lg" className="h-12 rounded-full px-8">
          <Link href={`/${store.slug}`}>
            Explorar Produtos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold">
              Itens no Carrinho ({items.length})
            </h2>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-destructive hover:text-destructive"
              onClick={() => setPendingAction({ type: "clear" })}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card
                key={item.productId}
                className="overflow-hidden border-0 shadow-sm"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4 md:gap-6">
                    <Link
                      href={`/${store.slug}/product/${item.slug}`}
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary md:h-32 md:w-32"
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/${store.slug}/product/${item.slug}`}
                        className="line-clamp-2 text-base font-medium transition-colors hover:text-primary md:text-lg"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-xl font-bold">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              setPendingAction({
                                type: "decrease",
                                productId: item.productId,
                                productName: item.name,
                                currentQuantity: item.quantity,
                              })
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            setPendingAction({
                              type: "remove",
                              productId: item.productId,
                              productName: item.name,
                            })
                          }
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="mb-6 font-serif text-xl font-bold">Resumo</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-sm text-muted-foreground">
                    A combinar
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full rounded-full bg-[#25D366] text-base font-medium hover:bg-[#20BD5A]"
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Finalizar pelo WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 w-full rounded-full"
                >
                  <Link href={`/${store.slug}`}>Continuar Comprando</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Compra 100% segura</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CartActionConfirmDialog
        open={pendingAction !== null}
        title={dialogTitle}
        description={dialogDescription}
        confirmLabel={dialogConfirmLabel}
        variant="remove"
        onConfirm={confirmAction}
        onClose={closeDialog}
      />
    </>
  );
}