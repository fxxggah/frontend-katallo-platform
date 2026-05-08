import type {
  CategoryResponse,
  PagedResponse,
  ProductResponse,
  StoreResponse,
} from "@/types";

export type HomeTemplateProps = {
  store: StoreResponse;
  categories: CategoryResponse[];
  productsPage: PagedResponse<ProductResponse>;
  featuredProducts?: ProductResponse[];
  newArrivals?: ProductResponse[];
};

export type CategoryTemplateProps = {
  store: StoreResponse;
  category: CategoryResponse;
  productsPage: PagedResponse<ProductResponse>;
};

export type ProductTemplateProps = {
  store: StoreResponse;
  product: ProductResponse;
  relatedProducts?: ProductResponse[];
};

export type CartTemplateProps = {
  store: StoreResponse;
};

export type StoreTemplateModule = {
  Home: React.ComponentType<HomeTemplateProps>;
  Category: React.ComponentType<CategoryTemplateProps>;
  Product: React.ComponentType<ProductTemplateProps>;
  Cart: React.ComponentType<CartTemplateProps>;
};