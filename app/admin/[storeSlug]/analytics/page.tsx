"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Eye,
  Loader2,
  MessageCircle,
  MousePointerClick,
  Package,
  TrendingUp,
} from "lucide-react";

import {
  analyticsService,
  type AnalyticsSummaryResponse,
  type DailyVisitsResponse,
  type TopProductAnalyticsResponse,
} from "@/services/analyticsService";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StoreAnalyticsPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [summary, setSummary] = useState<AnalyticsSummaryResponse | null>(null);
  const [topProducts, setTopProducts] = useState<TopProductAnalyticsResponse[]>(
    []
  );
  const [dailyVisits, setDailyVisits] = useState<DailyVisitsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadAnalytics() {
    try {
      setIsLoading(true);

      const [summaryData, topProductsData, dailyVisitsData] =
        await Promise.all([
          analyticsService.getSummary(storeSlug),
          analyticsService.getTopProducts(storeSlug, 10),
          analyticsService.getDailyVisits(storeSlug, 7),
        ]);

      setSummary(summaryData);
      setTopProducts(topProductsData);
      setDailyVisits(dailyVisitsData);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (storeSlug) {
      loadAnalytics();
    }
  }, [storeSlug]);

  const maxVisits = useMemo(() => {
    return Math.max(...dailyVisits.map((item) => item.visits), 1);
  }, [dailyVisits]);

  const whatsappClickRate = useMemo(() => {
    const views = summary?.storeViews ?? 0;
    const clicks = summary?.whatsappClicks ?? 0;

    if (views === 0) return 0;

    return (clicks / views) * 100;
  }, [summary]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando analytics...
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
              <BarChart3 className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Analytics da loja
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Acompanhe visitas, visualizações de produtos e cliques no
                WhatsApp da vitrine.
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <CalendarDays size={12} />
                Últimos 7 dias
              </div>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl border-slate-200 bg-white"
          >
            <Link href={`/admin/${storeSlug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao painel
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          icon={<Eye className="h-6 w-6" />}
          iconClassName="bg-indigo-50 text-indigo-600"
          label="Visitas da loja"
          value={summary?.storeViews ?? 0}
          description="Acessos registrados na página inicial"
        />

        <AnalyticsCard
          icon={<Package className="h-6 w-6" />}
          iconClassName="bg-sky-50 text-sky-600"
          label="Views de produtos"
          value={summary?.productViews ?? 0}
          description="Visualizações em páginas de produto"
        />

        <AnalyticsCard
          icon={<MousePointerClick className="h-6 w-6" />}
          iconClassName="bg-emerald-50 text-emerald-600"
          label="Cliques WhatsApp"
          value={summary?.whatsappClicks ?? 0}
          description="Interações no botão de compra"
        />

        <AnalyticsCard
          icon={<TrendingUp className="h-6 w-6" />}
          iconClassName="bg-amber-50 text-amber-600"
          label="Taxa de clique"
          value={`${whatsappClickRate.toFixed(1)}%`}
          description="Cliques no WhatsApp por visita"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Visitas por dia
            </CardTitle>
            <CardDescription>
              Evolução de acessos da loja nos últimos dias.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            {dailyVisits.length > 0 ? (
              dailyVisits.map((item) => {
                const percentage = (item.visits / maxVisits) * 100;

                return (
                  <div key={item.date} className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold text-slate-700">
                        {formatDate(item.date)}
                      </p>

                      <p className="text-sm font-black text-slate-900">
                        {item.visits} visita{item.visits === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${Math.max(percentage, 4)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyAnalyticsState
                icon={<Eye className="h-10 w-10" />}
                title="Nenhuma visita registrada"
                description="Quando clientes acessarem sua loja, os dados aparecerão aqui."
              />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Produto mais visto
            </CardTitle>
            <CardDescription>
              Produto com maior número de visualizações.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="rounded-3xl bg-slate-900 p-6 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <TrendingUp className="h-6 w-6" />
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-widest text-slate-400">
                Campeão de visualizações
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {summary?.mostViewedProductName ?? "Nenhum ainda"}
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-300">
                {summary?.mostViewedProductViews ?? 0} visualização
                {(summary?.mostViewedProductViews ?? 0) === 1 ? "" : "ões"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Ranking de produtos
            </CardTitle>
            <CardDescription>
              Produtos ordenados por número de visualizações.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {topProducts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {topProducts.map((product, index) => (
                  <div
                    key={product.productId}
                    className="flex items-center gap-4 p-5 hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-600">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-black text-slate-900">
                        {product.productName}
                      </p>

                      <p className="text-sm font-medium text-slate-400">
                        /{product.productSlug}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900">
                        {product.views}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8">
                <EmptyAnalyticsState
                  icon={<Package className="h-10 w-10" />}
                  title="Nenhum produto visualizado"
                  description="Quando clientes abrirem produtos, o ranking será preenchido."
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Interpretação rápida
            </CardTitle>
            <CardDescription>
              Como ler os dados atuais da loja.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <InsightItem
              title="Visitas"
              description="Mostram quantas vezes a página inicial da loja foi aberta."
            />

            <InsightItem
              title="Views de produtos"
              description="Mostram quais produtos despertaram mais interesse."
            />

            <InsightItem
              title="Cliques WhatsApp"
              description="Indicam intenção de compra ou contato direto com a loja."
            />

            <InsightItem
              title="Taxa de clique"
              description="Ajuda a entender se os visitantes estão chegando até o atendimento."
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}`;
}

function AnalyticsCard({
  icon,
  iconClassName,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  value: number | string;
  description: string;
}) {
  return (
    <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}>
          {icon}
        </div>

        <p className="mt-5 text-3xl font-black text-slate-900">{value}</p>

        <p className="mt-1 text-xs font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function EmptyAnalyticsState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center text-slate-300">
      {icon}

      <h3 className="mt-4 text-lg font-black text-slate-900">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
    </div>
  );
}

function InsightItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="font-black text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}