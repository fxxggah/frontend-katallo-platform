"use client";

import { MinimalStoreLoading } from "@/templates/minimal/components/MinimalStoreLoading";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { storeService } from "@/services/storeService";
import { productService } from "@/services/productService";
import { analyticsService } from "@/services/analyticsService";
import { StoreTemplateRenderer } from "@/templates/base/StoreTemplateRenderer";
import type { ProductResponse, StoreResponse } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;
  const productSlug = params.productSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const [storeData, productData, relatedProductsData] =
          await Promise.all([
            storeService.getStoreBySlug(storeSlug),
            productService.getProductBySlug(storeSlug, productSlug),
            productService.getRelatedProducts(storeSlug, productSlug, 10),
          ]);

        setStore(storeData);
        setProduct(productData);
        setRelatedProducts(relatedProductsData);

        analyticsService
          .registerProductView(storeSlug, productSlug)
          .catch((error) => {
            console.error("Erro ao registrar visualização do produto", error);
          });
      } finally {
        setIsLoading(false);
      }
    }

    if (storeSlug && productSlug) {
      loadData();
    }
  }, [storeSlug, productSlug]);

  if (isLoading) return <MinimalStoreLoading />;

  if (!store || !product) {
    return <div className="p-6">Produto não encontrado.</div>;
  }

  return (
    <StoreTemplateRenderer
      type="product"
      store={store}
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}