"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { storeService } from "@/services/storeService";
import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import { analyticsService } from "@/services/analyticsService";

import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

import { StoreTemplateRenderer } from "@/templates/base/StoreTemplateRenderer";
import StoreNotFound from "./not-found";

export default function StoreHomePage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [productsPage, setProductsPage] =
    useState<PagedResponse<ProductResponse> | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>(
    []
  );
  const [newArrivals, setNewArrivals] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        const storeData = await storeService.getStoreBySlug(storeSlug);
        setStore(storeData);

        const [
          categoriesData,
          productsData,
          featuredProductsData,
          newArrivalsData,
        ] = await Promise.all([
          categoryService.getPublicCategories(storeSlug),
          productService.getPublicProducts(storeSlug, { page: 0, size: 12 }),
          productService.getFeaturedProducts(storeSlug),
          productService.getNewArrivals(storeSlug),
        ]);

        setCategories(categoriesData);
        setProductsPage(productsData);
        setFeaturedProducts(featuredProductsData);
        setNewArrivals(newArrivalsData);

        analyticsService.registerStoreView(storeSlug).catch(() => {
          console.warn("Erro ao registrar visualização da loja");
        });
      } catch (error) {
        console.error("Erro ao carregar home da loja", error);
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

  if (!productsPage) {
    return <div className="p-6">Carregando produtos...</div>;
  }

  return (
    <StoreTemplateRenderer
      type="home"
      store={store}
      categories={categories}
      productsPage={productsPage}
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
    />
  );
}