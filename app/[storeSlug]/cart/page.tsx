"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { storeService } from "@/services/storeService";
import { StoreTemplateRenderer } from "@/templates/base/StoreTemplateRenderer";
import type { StoreResponse } from "@/types";

import StoreNotFound from "../not-found";

export default function CartPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const storeData = await storeService.getStoreBySlug(storeSlug);
        setStore(storeData);
      } catch (error) {
        console.error("Erro ao carregar carrinho da loja", error);
        setStore(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug) {
      loadData();
    }
  }, [storeSlug]);

  if (isLoading) {
    return <div className="p-6">Carregando...</div>;
  }

  if (!store) {
    return <StoreNotFound />;
  }

  return <StoreTemplateRenderer type="cart" store={store} />;
}