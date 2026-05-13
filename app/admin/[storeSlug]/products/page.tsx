"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpDown,
  CheckCircle2,
  Edit3,
  Filter,
  ImageOff,
  Loader2,
  MoreVertical,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse, PagedResponse, ProductResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type SortOption =
  | "createdAtDesc"
  | "createdAtAsc"
  | "updatedAtDesc"
  | "priceAsc"
  | "priceDesc"
  | "nameAsc"
  | "nameDesc"
  | "categoryAsc";

type StockFilter = "all" | "inStock" | "outOfStock";

export default function ProductsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const storeSlug = params.storeSlug as string;

  const [productsPage, setProductsPage] =
    useState<PagedResponse<ProductResponse> | null>(null);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("createdAtDesc");

  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);

  async function load() {
    try {
      setIsLoading(true);

      const [productsData, categoriesData] = await Promise.all([
        productService.getAdminProducts(storeSlug, {
          page: 0,
          size: 100,
        }),
        categoryService.getAdminCategories(storeSlug),
      ]);

      setProductsPage(productsData);
      setCategories(categoriesData);
    } catch {
      toast.error("Erro ao carregar produtos.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(productId: number) {
    if (
      !confirm(
        "Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      await productService.deleteProduct(storeSlug, productId);
      toast.success("Produto excluído com sucesso.");
      load();
    } catch {
      toast.error("Erro ao excluir produto.");
    }
  }

  function getCategoryName(categoryId: number) {
    return (
      categories.find((category) => category.id === categoryId)?.name ??
      "Sem categoria"
    );
  }

  function getProductUpdatedAt(product: ProductResponse) {
    const productWithUpdatedAt = product as ProductResponse & {
      updatedAt?: string;
    };

    return productWithUpdatedAt.updatedAt ?? product.createdAt;
  }

  function handleClearFilters() {
    setSearch("");
    setCategoryFilter("all");
    setStockFilter("all");
    setSortOption("createdAtDesc");
  }

  function handleCloseUpdatedMessage() {
    setShowUpdatedMessage(false);
    router.replace(`/admin/${storeSlug}/products`);
  }

  useEffect(() => {
    if (storeSlug) {
      load();
    }
  }, [storeSlug]);

  useEffect(() => {
    const updated = searchParams.get("updated");

    if (updated === "true") {
      setShowUpdatedMessage(true);
      router.replace(`/admin/${storeSlug}/products`);
    }
  }, [searchParams, router, storeSlug]);

  const products = productsPage?.content ?? [];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        categoryFilter === "all" ||
        product.categoryId === Number(categoryFilter);

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "inStock" && product.inStock) ||
        (stockFilter === "outOfStock" && !product.inStock);

      return matchesSearch && matchesCategory && matchesStock;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "createdAtDesc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        case "createdAtAsc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "updatedAtDesc":
          return (
            new Date(getProductUpdatedAt(b)).getTime() -
            new Date(getProductUpdatedAt(a)).getTime()
          );

        case "priceAsc":
          return Number(a.price) - Number(b.price);

        case "priceDesc":
          return Number(b.price) - Number(a.price);

        case "nameAsc":
          return a.name.localeCompare(b.name, "pt-BR");

        case "nameDesc":
          return b.name.localeCompare(a.name, "pt-BR");

        case "categoryAsc":
          return getCategoryName(a.categoryId).localeCompare(
            getCategoryName(b.categoryId),
            "pt-BR"
          );

        default:
          return 0;
      }
    });
  }, [products, search, categoryFilter, stockFilter, sortOption, categories]);

  const featuredCount = products.filter(
    (product) => product.featured && product.inStock
  ).length;

  const inStockCount = products.filter((product) => product.inStock).length;
  const outOfStockCount = products.filter((product) => !product.inStock).length;

  const hasActiveFilters =
    search.trim() ||
    categoryFilter !== "all" ||
    stockFilter !== "all" ||
    sortOption !== "createdAtDesc";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando produtos...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Package className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Produtos
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Gerencie produtos, preços, imagens, estoque e destaques da
                vitrine.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {products.length} produto{products.length === 1 ? "" : "s"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                  {inStockCount} em estoque
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {outOfStockCount} esgotado
                  {outOfStockCount === 1 ? "" : "s"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                  <Star size={12} />
                  {featuredCount} destaque{featuredCount === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>

          <Button
            asChild
            className="h-12 rounded-xl bg-slate-900 px-6 font-bold"
          >
            <Link href={`/admin/${storeSlug}/products/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Novo produto
            </Link>
          </Button>
        </div>
      </header>

      {showUpdatedMessage && (
        <div className="flex items-start justify-between gap-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-800 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <p className="font-black">Produto atualizado com sucesso</p>
              <p className="mt-1 text-sm font-medium text-emerald-700">
                As alterações já foram salvas e aplicadas na vitrine da loja.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseUpdatedMessage}
            className="rounded-xl p-2 text-emerald-700 transition hover:bg-emerald-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
        <CardContent className="space-y-4 p-4 md:p-5">
          <div className="grid gap-4 xl:grid-cols-[1fr_220px_220px_260px_auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar produto pelo nome..."
                className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-13 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 px-11 text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">Todas as categorias</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Package className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as StockFilter)}
                className="h-13 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 px-11 text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">Todos os estoques</option>
                <option value="inStock">Em estoque</option>
                <option value="outOfStock">Esgotados</option>
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="h-13 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 px-11 text-sm font-bold text-slate-700 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900"
              >
                <option value="createdAtDesc">Mais recentes</option>
                <option value="createdAtAsc">Mais antigos</option>
                <option value="updatedAtDesc">Atualizados recentemente</option>
                <option value="priceAsc">Menor preço</option>
                <option value="priceDesc">Maior preço</option>
                <option value="nameAsc">A-Z</option>
                <option value="nameDesc">Z-A</option>
                <option value="categoryAsc">Categoria A-Z</option>
              </select>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              className="h-13 rounded-2xl border-slate-200 font-bold"
            >
              <X className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <span>
              Exibindo {filteredProducts.length} de {products.length} produto
              {products.length === 1 ? "" : "s"}
            </span>

            {categoryFilter !== "all" && (
              <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                {getCategoryName(Number(categoryFilter))}
              </span>
            )}

            {stockFilter !== "all" && (
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {stockFilter === "inStock" ? "Em estoque" : "Esgotados"}
              </span>
            )}

            {search.trim() && (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                Busca: {search.trim()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {filteredProducts.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const image = product.images?.[0]?.imageUrl;
            const categoryName = getCategoryName(product.categoryId);
            const isOutOfStock = !product.inStock;

            return (
              <Card
                key={product.id}
                className={`overflow-hidden rounded-3xl border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  isOutOfStock ? "opacity-80" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  {image ? (
                    <img
                      src={image.replace(
                        "/upload/",
                        "/upload/w_500,q_auto,f_auto/"
                      )}
                      alt={product.name}
                      className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${
                        isOutOfStock ? "grayscale" : ""
                      }`}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
                      <ImageOff size={40} strokeWidth={1.5} />
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest">
                        Sem imagem
                      </span>
                    </div>
                  )}

                  {isOutOfStock && (
                    <div className="absolute left-4 top-4 rounded-xl bg-zinc-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                      Esgotado
                    </div>
                  )}

                  {product.featured && product.inStock && (
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-xl bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-950 shadow-sm">
                      <Star size={12} fill="currentColor" />
                      Destaque
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 rounded-xl border border-white bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
                    <p className="text-xs font-black text-slate-900">
                      {Number(product.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <div className="absolute right-4 top-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-9 w-9 rounded-xl bg-white/90 shadow-sm backdrop-blur-md hover:bg-white"
                        >
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="rounded-xl border-slate-100 p-2 shadow-xl"
                      >
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/${storeSlug}/products/${product.id}/edit`}
                            className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-slate-700 focus:bg-indigo-50 focus:text-indigo-600"
                          >
                            <Edit3 size={14} />
                            Editar
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                          className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                        >
                          <Trash2 size={14} />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="space-y-3 p-5">
                  <div>
                    <h2 className="line-clamp-1 font-black text-slate-900">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      /{product.slug}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-700">
                      {categoryName}
                    </span>

                    {isOutOfStock && (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        Esgotado
                      </span>
                    )}

                    {product.featured && product.inStock && (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                        Destaque
                      </span>
                    )}
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full rounded-xl border-slate-200 font-bold"
                  >
                    <Link
                      href={`/admin/${storeSlug}/products/${product.id}/edit`}
                    >
                      Editar produto
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <Package className="mb-4 h-12 w-12 text-slate-200" />

          <h3 className="text-xl font-black text-slate-900">
            {products.length === 0
              ? "Nenhum produto cadastrado"
              : "Nenhum produto encontrado"}
          </h3>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            {products.length === 0
              ? "Comece cadastrando o primeiro produto da sua vitrine."
              : "Tente ajustar os filtros ou limpar a pesquisa."}
          </p>

          {products.length === 0 ? (
            <Button
              asChild
              className="mt-8 h-12 rounded-xl bg-slate-900 px-6 font-bold"
            >
              <Link href={`/admin/${storeSlug}/products/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Criar primeiro produto
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleClearFilters}
              className="mt-8 h-12 rounded-xl bg-slate-900 px-6 font-bold"
            >
              <X className="mr-2 h-4 w-4" />
              Limpar filtros
            </Button>
          )}
        </div>
      )}
    </div>
  );
}