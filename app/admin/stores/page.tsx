"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  Plus,
  Settings,
  ExternalLink,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Globe,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  ChevronRight,
  Activity,
  LogOut,
} from "lucide-react";

import { storeService } from "@/services/storeService";
import { authService } from "@/services/authService";
import type { StoreResponse } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StoresPage() {
  const router = useRouter();

  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStores() {
    try {
      setIsLoading(true);
      setError(null);

      const token = authService.getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const data = await storeService.getMyStores();

      setStores(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao carregar suas lojas.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStores();
  }, []);

  const handleCreateStore = () => {
  const phone = "5514996016512";

  const message = encodeURIComponent(
    "Olá! Tenho interesse em criar minha loja na Katallo e gostaria de saber mais sobre..."
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
};

  function handleOpenAdmin(storeSlug: string) {
    router.push(`/admin/${storeSlug}`);
  }

  function handleOpenCatalog(storeSlug: string) {
    router.push(`/${storeSlug}`);
  }

  const hasStores = stores.length > 0;

  const activeStores = useMemo(
    () => stores.filter((store) => store.active).length,
    [stores]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#f8fafc]">
        <div className="relative flex min-h-screen items-center justify-center px-6">
          
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-100/60 blur-3xl" />
            <div className="absolute bottom-[-15%] right-[-10%] h-[420px] w-[420px] rounded-full bg-violet-100/60 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-[2rem] border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/50 backdrop-blur">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="absolute h-24 w-24 animate-spin rounded-[2rem] border-[3px] border-transparent border-t-indigo-600" />
                  <Store className="h-9 w-9 text-indigo-600" />
                </div>
              </div>

              <div className="absolute -right-2 -top-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-8 space-y-2 text-center">
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Carregando seu ecossistema
              </h2>

              <p className="text-sm font-medium text-slate-500">
                Sincronizando vitrines, permissões e infraestrutura...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] px-4 py-20">
        <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center">
          <Card className="overflow-hidden rounded-[2.5rem] border border-red-100 bg-white shadow-[0_30px_80px_rgba(239,68,68,0.08)]">
            
            <div className="h-2 w-full bg-gradient-to-r from-red-500 via-rose-500 to-red-500" />

            <CardHeader className="space-y-6 px-10 pt-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-red-50 text-red-600 shadow-lg shadow-red-100">
                <AlertCircle className="h-9 w-9" />
              </div>

              <div className="space-y-2">
                <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
                  Falha na conexão
                </CardTitle>

                <CardDescription className="text-sm font-medium leading-relaxed text-slate-500">
                  Não conseguimos sincronizar suas lojas com a infraestrutura da
                  plataforma.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-10 pb-10">
              <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4">
                <p className="text-center text-sm font-semibold text-red-700">
                  {error}
                </p>
              </div>

              <div className="grid gap-3">
                <Button
                  onClick={loadStores}
                  className="h-12 rounded-2xl bg-slate-900 font-bold shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] hover:bg-slate-800"
                >
                  Tentar novamente
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className="h-12 rounded-2xl font-bold text-slate-500"
                >
                  Voltar para login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fafc]">
      
      {/* Background global */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[450px] w-[450px] rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[25%] h-[350px] w-[350px] rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
        
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl lg:p-12">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_30%)]" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">
                <Sparkles className="h-3.5 w-3.5" />
                Central de Operações
              </div>

              <div className="space-y-5">
                <h1 className="max-w-xl text-4xl font-black leading-none tracking-tight text-slate-900 md:text-5xl">
                  Gerencie suas{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    vitrines digitais
                  </span>
                </h1>

                <p className="max-w-xl text-base font-medium leading-relaxed text-slate-500">
                  Controle lojas, catálogos e experiências digitais em um só lugar.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <LayoutGrid className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Lojas
                    </span>
                  </div>

                  <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                    {stores.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Activity className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Ativas
                    </span>
                  </div>

                  <p className="mt-3 text-3xl font-black tracking-tight text-emerald-600">
                    {activeStores}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Button
                onClick={handleCreateStore}
                className="h-14 rounded-2xl bg-indigo-600 px-8 font-bold shadow-2xl shadow-indigo-200 transition-all hover:scale-[1.02] hover:bg-indigo-700"
              >
                <Plus className="mr-2 h-5 w-5" />
                Criar nova loja
              </Button>
            </div>
          </div>
        </section>

        {/* Estado vazio */}
        {!hasStores && (
          <section className="relative mt-14 overflow-hidden rounded-[3rem] border border-dashed border-slate-200 bg-white/70 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.04)] backdrop-blur">
            
            <div className="flex flex-col items-center justify-center text-center">
              
              <div className="relative mb-10">
                <div className="absolute inset-0 rounded-full bg-indigo-100 blur-[90px]" />

                <div className="relative flex h-36 w-36 items-center justify-center rounded-[3rem] border border-white bg-white shadow-2xl shadow-slate-200">
                  <ShoppingBag className="h-14 w-14 text-indigo-600" />
                </div>

                <div className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                  <Plus className="h-6 w-6" />
                </div>
              </div>

              <div className="max-w-xl">
                <h2 className="text-4xl font-black tracking-tight text-slate-900">
                  Sua operação começa agora
                </h2>

                <p className="mt-5 text-base font-medium leading-relaxed text-slate-500">
                  Você ainda não possui vitrines ativas. Crie sua primeira loja
                  e comece a construir sua presença digital.
                </p>
              </div>

              <Button
                onClick={handleCreateStore}
                className="mt-10 h-14 rounded-2xl bg-slate-900 px-10 font-bold shadow-2xl shadow-slate-200 transition-all hover:scale-[1.02] hover:bg-slate-800"
              >
                Criar minha primeira loja
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        )}

        {/* Grid */}
        {hasStores && (
          <section className="mt-14">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  Suas lojas
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Acesse rapidamente os painéis e vitrines da sua operação.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              
              {stores.map((store) => (
                <Card
                  key={store.id}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.05)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(99,102,241,0.12)]"
                >
                  
                  {/* Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <CardHeader className="relative space-y-6 px-8 pt-8">
                    
                    <div className="flex items-start justify-between gap-4">
                      
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.7rem] border border-slate-100 bg-slate-50 text-slate-400 transition-all duration-500 group-hover:scale-105 group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                        <Store className="h-8 w-8" />
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
                          store.active
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            store.active
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />

                        {store.active ? "Online" : "Pausada"}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <CardTitle className="line-clamp-1 text-2xl font-black tracking-tight text-slate-900">
                          {store.name}
                        </CardTitle>

                        <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
                          <Globe className="h-3.5 w-3.5" />
                          katallo.com.br/{store.slug}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">
                          <MessageCircle className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            WhatsApp
                          </p>

                          <p className="truncate text-sm font-bold text-slate-700">
                            {store.whatsappNumber || "Não configurado"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6 px-8 pb-8">

                    <div className="grid gap-3">
                      
                      <Button
                        onClick={() => handleOpenAdmin(store.slug)}
                        className="group/button h-12 rounded-2xl bg-slate-900 font-bold shadow-lg shadow-slate-100 transition-all hover:bg-indigo-600"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Painel Administrativo

                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handleOpenCatalog(store.slug)}
                        className="h-12 rounded-2xl border-slate-100 bg-white font-bold text-slate-600 transition-all hover:bg-slate-50"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visualizar catálogo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add new */}
              <button
                onClick={handleCreateStore}
                className="group relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/60 p-10 backdrop-blur transition-all duration-500 hover:border-indigo-300 hover:bg-white"
              >
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] border border-slate-100 bg-white text-slate-400 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:text-indigo-600">
                  <Plus className="h-10 w-10" />
                </div>

                <div className="relative mt-8 text-center">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    Nova loja
                  </h3>

                  <p className="mt-3 max-w-xs text-sm font-medium leading-relaxed text-slate-500">
                    Expanda sua operação criando uma nova experiência digital.
                  </p>
                </div>
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">
                Katallo Platform
              </p>

              <p className="mt-2 text-sm font-medium text-slate-400">
                Expanda seus horizontes e conquiste o mercado digital com a Katallo.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />

              <span className="text-xs font-bold text-slate-600">
                Ambiente protegido
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}