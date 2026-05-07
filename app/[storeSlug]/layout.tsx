"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { CartProvider } from "@/contexts/CartContext";
import { storeService } from "@/services/storeService";

type StoreLayoutProps = {
  children: ReactNode;
};

export default function StoreLayout({ children }: StoreLayoutProps) {
  const params = useParams();

  const storeSlug = Array.isArray(params.storeSlug)
    ? params.storeSlug[0]
    : params.storeSlug;

  useEffect(() => {
    async function loadFavicon() {
      if (!storeSlug) return;

      try {
        const store = await storeService.getStoreBySlug(storeSlug);

        const faviconUrl = store.favicon || "/favicon.ico";

        let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");

        if (!favicon) {
          favicon = document.createElement("link");
          favicon.rel = "icon";
          document.head.appendChild(favicon);
        }

        favicon.href = faviconUrl;
      } catch {
        console.error("Erro ao carregar favicon da loja");
      }
    }

    loadFavicon();
  }, [storeSlug]);

  if (!storeSlug) {
    return <>{children}</>;
  }

  return <CartProvider storeSlug={storeSlug}>{children}</CartProvider>;
}