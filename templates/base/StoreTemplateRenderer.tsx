"use client";

import type {
  HomeTemplateProps,
  CategoryTemplateProps,
  ProductTemplateProps,
  CartTemplateProps,
} from "./types";
import { getTemplate } from "./registry";
import type { StoreResponse } from "@/types";

type StoreTemplateRendererProps =
  | ({ type: "home" } & HomeTemplateProps)
  | ({ type: "category" } & CategoryTemplateProps)
  | ({ type: "product" } & ProductTemplateProps)
  | ({ type: "cart" } & CartTemplateProps);

export function StoreTemplateRenderer(props: StoreTemplateRendererProps) {
  const store: StoreResponse = props.store;

  const template = getTemplate(store.template);

  switch (props.type) {
    case "home":
      return (
        <template.Home
          store={props.store}
          categories={props.categories}
          productsPage={props.productsPage}
          featuredProducts={props.featuredProducts}
          newArrivals={props.newArrivals}
        />
      );

    case "category":
      return (
        <template.Category
          store={props.store}
          category={props.category}
          productsPage={props.productsPage}
        />
      );

    case "product":
      return (
        <template.Product
          store={props.store}
          product={props.product}
          relatedProducts={props.relatedProducts}
        />
      );

    case "cart":
      return <template.Cart store={props.store} />;

    default:
      return null;
  }
}