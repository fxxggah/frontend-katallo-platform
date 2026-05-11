"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Loader2,
  MousePointerClick,
  Package,
  Plus,
  Settings,
  Share2,
  Star,
  Store,
  Tags,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import { storeService } from "@/services/storeService";
import { userService } from "@/services/userService";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import {
  analyticsService,
  type AnalyticsSummaryResponse,
  type TopProductAnalyticsResponse,
} from "@/services/analyticsService";

import type {
  CategoryResponse,
  ProductResponse,
  StoreResponse,
  StoreUserResponse,
  StoreUserRole,
} from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardStats = {
  totalProducts: number;
  featuredProducts: number;
  totalCategories: number;
  totalMembers: number;
};

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  primary?: boolean;
};

export default function AdminStoreDashboardPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [role, setRole] = useState<StoreUserRole | null>(null);
  const [recentProducts, setRecentProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [members, setMembers] = useState<StoreUserResponse[]>([]);
  const [analytics, setAnalytics] =
    useState<AnalyticsSummaryResponse | null>(null);
  const [topProducts, setTopProducts] = useState<TopProductAnalyticsResponse[]>(
    []
  );

  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    featuredProducts: 0,
    totalCategories: 0,
    totalMembers: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publicStoreUrl =
    typeof window !== "undefined" && store
      ? `${window.location.origin}/${store.slug}`
      : "";

  async function loadDashboard() {
    try {
      setIsLoading(true);
      setError(null);

      const [
        storeData,
        currentUserData,
        productsPage,
        categoriesData,
        membersData,
        analyticsData,
        topProductsData,
      ] = await Promise.all([
        storeService.getStoreBySlug(storeSlug),
        userService.getCurrentStoreUser(storeSlug),
        productService.getAdminProducts(storeSlug, {
          page: 0,
          size: 6,
          sortField: "createdAt",
          sortOrder: "desc",
        }),
        categoryService.getAdminCategories(storeSlug),
        userService.getStoreUsers(storeSlug),
        analyticsService.getSummary(storeSlug),
        analyticsService.getTopProducts(storeSlug, 5),
      ]);

      const products = productsPage.content ?? [];

      setStore(storeData);
      setRole(currentUserData.role);
      setRecentProducts(products);
      setCategories(categoriesData);
      setMembers(membersData);
      setAnalytics(analyticsData);
      setTopProducts(topProductsData);

      setStats({
        totalProducts: productsPage.totalElements ?? products.length,
        featuredProducts: products.filter((product) => product.featured).length,
        totalCategories: categoriesData.length,
        totalMembers: membersData.length,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao carregar os dados da loja.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (storeSlug) {
      loadDashboard();
    }
  }, [storeSlug]);

  async function handleCopyStoreLink() {
    if (!publicStoreUrl) return;

    await navigator.clipboard.writeText(publicStoreUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1800);
  }

  const quickActions: QuickAction[] = useMemo(() => {
    if (!store) return [];

    const actions: QuickAction[] = [
      {
        title: "Novo produto",
        description: "Adicionar item na vitrine",
        href: `/admin/${store.slug}/products/new`,
        icon: <Plus className="h-5 w-5" />,
        primary: true,
      },
      {
        title: "Produtos",
        description: "Preços, fotos e destaques",
        href: `/admin/${store.slug}/products`,
        icon: <Package className="h-5 w-5" />,
      },
      {
        title: "Categorias",
        description: "Organizar catálogo",
        href: `/admin/${store.slug}/categories`,
        icon: <Tags className="h-5 w-5" />,
      },
      {
        title: "Analytics",
        description: "Desempenho da loja",
        href: `/admin/${store.slug}/analytics`,
        icon: <BarChart3 className="h-5 w-5" />,
      },
    ];

    if (role === "OWNER") {
      actions.push({
        title: "Configurações",
        description: "Dados da loja",
        href: `/admin/${store.slug}/settings`,
        icon: <Settings className="h-5 w-5" />,
      });
    }

    return actions;
  }, [store, role]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando painel da loja...
        </p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="mx-auto max-w-2xl py-12">
        <Card className="rounded-3xl border-red-100 bg-white shadow-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle className="h-7 w-7" />
            </div>

            <CardTitle className="text-2xl font-black text-slate-900">
              Não foi possível carregar o painel
            </CardTitle>

            <CardDescription>
              {error ?? "Loja não encontrada ou indisponível."}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Button onClick={loadDashboard} className="rounded-xl bg-slate-900">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasRecentProducts = recentProducts.length > 0;
  const hasTopProducts = topProducts.length > 0;
  const whatsappClicks = analytics?.whatsappClicks ?? 0;
  const storeViews = analytics?.storeViews ?? 0;
  const productViews = analytics?.productViews ?? 0;

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_340px]">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Store className="h-7 w-7" />
            </div>

            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  {store.name}
                </h1>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${store.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                    }`}
                >
                  {store.active ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {store.active ? "Online" : "Pausada"}
                </span>
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                Painel operacional para gerenciar catálogo, equipe e desempenho
                da vitrine.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
                <span>/{store.slug}</span>
                <span>•</span>
                <span>{role === "OWNER" ? "Proprietário" : "Administrador"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-3xl bg-slate-50 p-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Loja pública
              </p>
              <p className="mt-1 truncate text-sm font-bold text-slate-700">
                {publicStoreUrl || "Link indisponível"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleCopyStoreLink}
                variant="outline"
                className="h-11 rounded-xl border-slate-200 bg-white text-xs font-bold"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                  </>
                )}
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 rounded-xl border-slate-200 bg-white text-xs font-bold"
              >
                <Link href={`/${store.slug}`} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver loja
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Package className="h-5 w-5" />}
          iconClassName="bg-blue-50 text-blue-600"
          value={stats.totalProducts}
          label="Produtos"
          helper="Itens cadastrados"
        />

        <MetricCard
          icon={<Star className="h-5 w-5" />}
          iconClassName="bg-amber-50 text-amber-600"
          value={stats.featuredProducts}
          label="Destaques"
          helper="Na página inicial"
        />

        <MetricCard
          icon={<Tags className="h-5 w-5" />}
          iconClassName="bg-violet-50 text-violet-600"
          value={stats.totalCategories}
          label="Categorias"
          helper="Organização da loja"
        />

        <MetricCard
          icon={<Users className="h-5 w-5" />}
          iconClassName="bg-emerald-50 text-emerald-600"
          value={stats.totalMembers}
          label="Equipe"
          helper="Membros com acesso"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="rounded-3xl border-slate-100 bg-slate-900 text-white shadow-sm">
          <CardContent className="p-6 md:p-7">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <BarChart3 className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-2xl font-black tracking-tight">
                  Desempenho da vitrine
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                  Acompanhe sinais de interesse dos clientes: visitas,
                  visualizações de produtos e cliques no WhatsApp.
                </p>
              </div>

              <Button
                asChild
                className="h-12 rounded-xl bg-white px-6 font-bold text-slate-900 hover:bg-slate-100"
              >
                <Link href={`/admin/${store.slug}/analytics`}>
                  Ver análise completa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <AnalyticsMiniCard
                icon={<Eye className="h-4 w-4" />}
                label="Visitas"
                value={storeViews}
              />

              <AnalyticsMiniCard
                icon={<BarChart3 className="h-4 w-4" />}
                label="Views de produtos"
                value={productViews}
              />

              <AnalyticsMiniCard
                icon={<MousePointerClick className="h-4 w-4" />}
                label="Cliques WhatsApp"
                value={whatsappClicks}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <TrendingUp className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-widest text-slate-400">
              Produto mais visto
            </p>

            <h3 className="mt-2 line-clamp-2 text-xl font-black text-slate-900">
              {analytics?.mostViewedProductName ?? "Nenhum ainda"}
            </h3>

            <p className="mt-2 text-sm font-medium text-slate-500">
              {analytics?.mostViewedProductViews ?? 0} visualizações
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href} className="group">
            <Card
              className={`h-full rounded-3xl border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${action.primary ? "bg-slate-900 text-white" : ""
                }`}
            >
              <CardContent className="p-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${action.primary
                      ? "bg-white/10 text-white"
                      : "bg-slate-50 text-slate-700"
                    }`}
                >
                  {action.icon}
                </div>

                <h3
                  className={`mt-4 font-black ${action.primary ? "text-white" : "text-slate-900"
                    }`}
                >
                  {action.title}
                </h3>

                <p
                  className={`mt-1 text-sm ${action.primary ? "text-slate-300" : "text-slate-500"
                    }`}
                >
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
            <div>
              <CardTitle className="text-xl font-black text-slate-900">
                Produtos recentes
              </CardTitle>
              <CardDescription>
                Últimos itens cadastrados na vitrine.
              </CardDescription>
            </div>

            <Button asChild variant="outline" className="rounded-xl">
              <Link href={`/admin/${store.slug}/products`}>Ver todos</Link>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            {hasRecentProducts ? (
              <div className="divide-y divide-slate-100">
                {recentProducts.map((product) => {
                  const image = product.images?.[0]?.imageUrl;

                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-5 transition-colors hover:bg-slate-50"
                    >
                      <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-5 w-5 text-slate-300" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate font-bold text-slate-900">
                            {product.name}
                          </p>

                          {product.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                              <Star className="h-3 w-3" />
                              Destaque
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-medium text-slate-500">
                          R${" "}
                          {Number(product.price).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <Button asChild variant="ghost" className="rounded-xl">
                        <Link
                          href={`/admin/${store.slug}/products/${product.id}/edit`}
                        >
                          Editar
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Package className="mb-4 h-10 w-10 text-slate-200" />
                <p className="font-bold text-slate-900">
                  Nenhum produto cadastrado
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Comece adicionando o primeiro produto da loja.
                </p>

                <Button asChild className="mt-6 rounded-xl bg-slate-900">
                  <Link href={`/admin/${store.slug}/products/new`}>
                    Criar produto
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black text-slate-900">
                Produtos mais vistos
              </CardTitle>
              <CardDescription>
                Ranking por visualizações.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {hasTopProducts ? (
                topProducts.map((product, index) => (
                  <div
                    key={product.productId}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-black text-slate-500">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-slate-900">
                        {product.productName}
                      </p>
                      <p className="text-xs font-medium text-slate-400">
                        {product.views} visualizações
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-center">
                  <Eye className="mx-auto mb-3 h-8 w-8 text-slate-200" />
                  <p className="text-sm font-bold text-slate-500">
                    Nenhuma visualização ainda
                  </p>
                </div>
              )}

              <Button
                asChild
                variant="outline"
                className="mt-2 h-11 w-full rounded-xl border-slate-200 font-bold"
              >
                <Link href={`/admin/${store.slug}/analytics`}>
                  Ver analytics
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
            <CardContent className="space-y-5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Share2 className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Compartilhe sua loja
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Envie o link para clientes pelo WhatsApp, Instagram ou bio.
                </p>
              </div>

              <Button
                onClick={handleCopyStoreLink}
                className="w-full rounded-xl bg-slate-900 font-bold text-white hover:bg-slate-800"
              >
                {isCopied ? "Link copiado" : "Copiar link da loja"}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function MetricCard({
  icon,
  iconClassName,
  value,
  label,
  helper,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  value: number;
  label: string;
  helper: string;
}) {
  return (
    <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-slate-900">{value}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-xs font-medium text-slate-400">{helper}</p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AnalyticsMiniCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <div className="flex items-center gap-2 text-slate-300">
        {icon}
        <p className="text-xs font-bold uppercase tracking-widest">{label}</p>
      </div>

      <p className="mt-3 text-2xl font-black text-white">{value}</p>
    </div>
  );
}