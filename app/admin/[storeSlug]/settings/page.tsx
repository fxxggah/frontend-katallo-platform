"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Globe,
  Instagram,
  Loader2,
  MessageCircle,
  Save,
  Settings,
  Store,
} from "lucide-react";

import { storeService } from "@/services/storeService";
import type { StoreResponse } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
  const params = useParams();
  const router = useRouter();
  const storeSlug = params.storeSlug as string;

  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");

  async function load() {
    try {
      setIsLoading(true);

      const data = await storeService.getStoreBySlug(storeSlug);

      setStore(data);
      setName(data.name);
      setWhatsapp(data.whatsappNumber || "");
      setInstagram(data.instagram || "");
    } catch {
      toast.error("Erro ao carregar configurações da loja.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (storeSlug) {
      load();
    }
  }, [storeSlug]);

  async function handleSave() {
    if (!store) return;

    try {
      setIsSaving(true);
      setSavedSuccessfully(false);

      const updatedStore = await storeService.updateStore(store.slug, {
        name,
        whatsappNumber: whatsapp,
        instagram,
      });

      setSavedSuccessfully(true);

      toast.success("Configurações salvas com sucesso.");

      if (updatedStore.slug !== store.slug) {
        router.replace(`/admin/${updatedStore.slug}/settings`);
      }

      setStore(updatedStore);

      setTimeout(() => {
        setSavedSuccessfully(false);
      }, 4000);

      await load();
    } catch {
      toast.error("Erro ao salvar configurações.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando configurações...
        </p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <Store className="mx-auto mb-4 h-10 w-10 text-slate-300" />
        <h1 className="text-xl font-black text-slate-900">
          Loja não encontrada
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Não foi possível carregar os dados desta loja.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Settings className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Configurações da loja
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Edite as informações principais exibidas na vitrine pública e nos
              contatos da loja.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <Globe size={12} />
              /{store.slug}
            </div>
          </div>
        </div>
      </header>

      {savedSuccessfully && (
        <div className="flex items-center gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-700 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <div>
            <p className="font-black">Alterações salvas com sucesso</p>
            <p className="text-sm font-medium text-emerald-600">
              As informações da loja foram atualizadas.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Dados principais
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                Nome da loja
              </label>

              <div className="relative">
                <Store className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome da loja"
                  className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                WhatsApp
              </label>

              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: 5514999999999"
                  className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                />
              </div>

              <p className="text-xs text-slate-400">
                Use o formato com DDI e DDD. Exemplo: 5514999999999.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                Instagram
              </label>

              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={instagram}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^@+/, "");
                    setInstagram(value);
                  }}
                  placeholder="usuario_da_loja"
                  className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                />
              </div>

              <p className="text-xs text-slate-400">
                Informe sem @ para manter o padrão do sistema.
              </p>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-6">
              <Button
                onClick={handleSave}
                disabled={isSaving || !name.trim()}
                className="h-12 rounded-xl bg-slate-900 px-8 font-bold"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black text-slate-900">
                Prévia rápida
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Loja
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {name || "Nome da loja"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  WhatsApp
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {whatsapp || "Não configurado"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Instagram
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {instagram ? `@${instagram}` : "Não configurado"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-100 bg-slate-900 text-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-black">Importante</h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Essas informações aparecem no catálogo público e impactam
                diretamente a comunicação do cliente com a loja.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}