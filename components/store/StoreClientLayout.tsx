"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";

type StoreClientLayoutProps = {
  children: ReactNode;
  storeSlug: string;
};

export default function StoreClientLayout({
  children,
  storeSlug,
}: StoreClientLayoutProps) {
  return (
    <CartProvider storeSlug={storeSlug}>
      {children}
    </CartProvider>
  );
}