"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { storeService } from "@/services/storeService";

import {
  Store,
  ShoppingBag,
  MessageCircle,
  Loader2,
  Image as ImageIcon,
  LayoutTemplate,
  ChevronRight,
  Sparkles,
  Lock,
  ShieldCheck,
} from "lucide-react";

type StoreTemplate = "MINIMAL";

type CreateStorePayload = {
  password: string;

  name: string;

  logo?: string;
  favicon?: string;

  whatsappNumber?: string;
  instagram?: string;
  facebook?: string;

  template?: StoreTemplate;

  street?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;

  googleMapsLink?: string;
};

export default function CreatePage() {

  const router = useRouter();

  const [accessGranted, setAccessGranted] = useState(false);

  const [formData, setFormData] = useState<CreateStorePayload>({
    password: "",

    name: "",

    logo: "",
    favicon: "",

    whatsappNumber: "",
    instagram: "",
    facebook: "",

    template: "MINIMAL",

    street: "",
    number: "",
    city: "",
    state: "",
    country: "Brasil",

    googleMapsLink: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError(null);
    }
  }

  function handleUnlock() {

    if (!formData.password.trim()) {
      setError("Digite a senha.");
      return;
    }

    setError(null);

    setAccessGranted(true);
  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Dê um nome para sua loja.");
      return;
    }

    setLoading(true);

    setError(null);

    try {

      const response = await storeService.createStore(formData);

      if (response?.slug) {

        router.push(`/admin/${response.slug}`);

        return;
      }

      throw new Error("Erro ao criar loja.");

    } catch (err: any) {

      console.log(err);

      if (err?.response?.status === 403) {

        setAccessGranted(false);

        setError("Senha administrativa inválida.");

        return;
      }

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Erro interno do servidor."
      );

    } finally {

      setLoading(false);
    }
  }

  if (!accessGranted) {

    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.25),transparent_40%)]" />

        <Card className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090B]/90 text-white shadow-[0_30px_120px_rgba(124,58,237,0.25)] backdrop-blur-2xl">

          <CardHeader className="space-y-6 border-b border-white/5 p-8 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.8rem] border border-[#7C3AED]/30 bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] shadow-[0_0_60px_rgba(124,58,237,0.45)]">
              <ShieldCheck size={36} />
            </div>

            <div className="space-y-2">

              <CardTitle className="text-3xl font-black tracking-tight">
                Área Restrita
              </CardTitle>

              <CardDescription className="text-sm leading-relaxed text-zinc-400">
                Apenas administradores autorizados podem criar novas lojas.
              </CardDescription>

            </div>

          </CardHeader>

          <CardContent className="space-y-5 p-8">

            <div className="grid gap-2">

              <Label
                htmlFor="password"
                className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500"
              >
                Senha Administrativa
              </Label>

              <div className="relative">

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite a senha..."
                  value={formData.password}
                  onChange={handleChange}
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 pl-12 text-white placeholder:text-zinc-500"
                />

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

              </div>

            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-400">
                {error}
              </div>
            )}

          </CardContent>

          <CardFooter className="p-8 pt-0">

            <Button
              type="button"
              onClick={handleUnlock}
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] text-base font-bold"
            >
              <span className="flex items-center gap-2">
                Acessar Painel
                <ChevronRight size={18} />
              </span>
            </Button>

          </CardFooter>

        </Card>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 pb-20 pt-6">

      <div className="mx-auto max-w-4xl space-y-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Sparkles size={12} className="text-indigo-500" />
            Configuração Inicial
          </div>
        </div>

        <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)]">

          <CardHeader className="space-y-4 border-b border-slate-50 p-8 md:p-12">

            <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-slate-900 text-white shadow-2xl shadow-slate-200">
              <Store size={28} />
            </div>

            <div className="space-y-2">

              <CardTitle className="text-3xl font-black text-slate-900 md:text-4xl">
                Fundar nova loja
              </CardTitle>

              <CardDescription className="max-w-md text-base leading-relaxed text-slate-500">
                Configure os detalhes da nova loja da plataforma.
              </CardDescription>

            </div>

          </CardHeader>

          <form onSubmit={handleSubmit}>

            <CardContent className="space-y-12 p-8 md:p-12">

              <section className="grid gap-8 lg:grid-cols-3">

                <div className="space-y-1">

                  <h3 className="flex items-center gap-2 font-bold text-slate-900">
                    <ShoppingBag size={18} className="text-indigo-600" />
                    Essenciais
                  </h3>

                  <p className="text-sm text-slate-400">
                    A identidade da loja.
                  </p>

                </div>

                <div className="grid gap-6 lg:col-span-2">

                  <div className="grid gap-2">

                    <Label
                      htmlFor="name"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Nome da Loja
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      placeholder="Ex: GB Games"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                      required
                    />

                  </div>

                  <div className="grid gap-2">

                    <Label
                      htmlFor="logo"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      URL da Logo
                    </Label>

                    <div className="relative">

                      <Input
                        id="logo"
                        name="logo"
                        placeholder="https://..."
                        value={formData.logo}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 pl-11"
                      />

                      <ImageIcon
                        className="absolute left-4 top-3.5 text-slate-400"
                        size={18}
                      />

                    </div>

                  </div>

                  <div className="grid gap-2">

                    <Label
                      htmlFor="favicon"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      URL do Favicon
                    </Label>

                    <div className="relative">

                      <Input
                        id="favicon"
                        name="favicon"
                        placeholder="https://..."
                        value={formData.favicon}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-slate-100 bg-slate-50/50 pl-11"
                      />

                      <ImageIcon
                        className="absolute left-4 top-3.5 text-slate-400"
                        size={18}
                      />

                    </div>

                  </div>

                  <div className="grid gap-2">

                    <Label
                      htmlFor="template"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Template
                    </Label>

                    <div className="group relative">

                      <select
                        id="template"
                        name="template"
                        value={formData.template}
                        onChange={handleChange}
                        className="flex h-12 w-full appearance-none rounded-xl border border-slate-100 bg-slate-50/50 px-11 py-2 text-sm text-slate-900"
                      >
                        <option value="MINIMAL">Minimal</option>
                      </select>

                      <LayoutTemplate
                        className="absolute left-4 top-3.5 text-slate-400"
                        size={18}
                      />

                    </div>

                  </div>

                </div>

              </section>

              <hr className="border-slate-50" />

              <section className="grid gap-8 lg:grid-cols-3">

                <div className="space-y-1">

                  <h3 className="flex items-center gap-2 font-bold text-slate-900">
                    <MessageCircle size={18} className="text-emerald-600" />
                    Contato
                  </h3>

                  <p className="text-sm text-slate-400">
                    Redes e comunicação.
                  </p>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">

                  <Input
                    name="whatsappNumber"
                    placeholder="WhatsApp"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                  />

                  <Input
                    name="instagram"
                    placeholder="Instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                  />

                </div>

              </section>

              {error && (
                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-bold text-rose-600">
                  {error}
                </div>
              )}

            </CardContent>

            <CardFooter className="flex flex-col gap-6 border-t border-slate-50 bg-slate-50/30 p-8 md:p-12">

              <Button
                type="submit"
                className="group h-14 w-full rounded-2xl bg-slate-900 text-base font-bold transition-all hover:scale-[1.01]"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Criar Loja

                    <ChevronRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                )}
              </Button>

            </CardFooter>

          </form>

        </Card>

      </div>

    </div>
  );
}