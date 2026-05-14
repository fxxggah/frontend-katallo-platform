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
} from "lucide-react";

type StoreTemplate = "MINIMAL";

/*
  Quando criar outro template, adicione aqui também.

  Exemplo:

  type StoreTemplate =
    | "MINIMAL"
    | "ESTHER_MODA"
    | "PREMIUM_FASHION";

  IMPORTANTE:
  Esse valor precisa ser igual ao enum do backend:

  public enum StoreTemplate {
      MINIMAL,
      ESTHER_MODA,
      PREMIUM_FASHION
  }
*/

type CreateStorePayload = {
  name: string;
  logo?: string;
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

export default function NewStorePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateStorePayload>({
    name: "",
    logo: "",
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

    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Dê um nome para sua nova jornada.");
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

      throw new Error("Ocorreu um erro ao processar sua solicitação.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro interno do servidor.");
    } finally {
      setLoading(false);
    }
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
              <CardTitle className="font-playfair text-3xl font-black text-slate-900 md:text-4xl">
                Fundar nova loja
              </CardTitle>

              <CardDescription className="max-w-md text-base leading-relaxed text-slate-500">
                Preencha os detalhes abaixo para dar vida à sua vitrine digital.
                Você poderá refinar tudo depois.
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
                    A identidade básica do seu negócio.
                  </p>
                </div>

                <div className="grid gap-6 lg:col-span-2">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="name"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Nome da Marca
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      placeholder="Ex: Maison de Luxe"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-slate-100 bg-slate-50/50 transition-all focus:bg-white"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="logo"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      URL do Logotipo
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
                      htmlFor="template"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Estilo Visual
                    </Label>

                    <div className="group relative">
                      <select
                        id="template"
                        name="template"
                        value={formData.template}
                        onChange={handleChange}
                        className="flex h-12 w-full cursor-not-allowed appearance-none rounded-xl border border-slate-100 bg-slate-50/50 px-11 py-2 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-slate-950"
                        disabled
                      >
                        <option value="MINIMAL">Minimalist (Padrão)</option>

                        {/*
                          Quando criar outro template:
                          
                          1. Adicione no type StoreTemplate lá em cima.
                          2. Adicione o mesmo valor no enum StoreTemplate do backend.
                          3. Adicione uma nova option aqui.

                          Exemplo:

                          <option value="ESTHER_MODA">
                            Esther Moda
                          </option>
                        */}
                      </select>

                      <LayoutTemplate
                        className="absolute left-4 top-3.5 text-slate-400 transition-colors group-hover:text-indigo-600"
                        size={18}
                      />

                      <div className="absolute right-4 top-3.5">
                        <span className="flex h-5 items-center rounded-full bg-indigo-50 px-2 text-[10px] font-bold text-indigo-600">
                          ATIVO
                        </span>
                      </div>
                    </div>

                    <p className="ml-1 mt-1 text-[10px] text-slate-400">
                      O template Minimal é otimizado para conversão e
                      carregamento rápido.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-slate-50" />

              <section className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-1">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900">
                    <MessageCircle size={18} className="text-emerald-600" />
                    Conexões
                  </h3>

                  <p className="text-sm text-slate-400">
                    Onde seus clientes encontrarão você.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="whatsappNumber"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      WhatsApp
                    </Label>

                    <Input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      placeholder="551499999999"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="instagram"
                      className="text-xs font-black uppercase tracking-widest text-slate-500"
                    >
                      Instagram
                    </Label>

                    <Input
                      id="instagram"
                      name="instagram"
                      placeholder="@user"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                    />
                  </div>
                </div>
              </section>

              {error && (
                <div className="flex animate-in items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-bold text-rose-600 fade-in slide-in-from-top-2">
                  <AlertCircle />
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-6 border-t border-slate-50 bg-slate-50/30 p-8 md:p-12">
              <Button
                type="submit"
                className="group h-14 w-full rounded-2xl bg-slate-900 text-base font-bold transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Confirmar e Inaugurar Loja
                    <ChevronRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs font-medium text-slate-400">
                Ao clicar em confirmar, sua loja será gerada instantaneamente.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

function AlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}