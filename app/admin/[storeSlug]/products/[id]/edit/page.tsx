"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Loader2,
  Package,
  Save,
  Star,
  Tag,
  UploadCloud,
} from "lucide-react";

import { productService } from "@/services/productService";
import { imageService } from "@/services/imageService";
import type { ProductResponse } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storeSlug = params.storeSlug as string;
  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  async function load() {
    try {
      setIsLoading(true);

      const data = await productService.getProductById(storeSlug, productId);

      setProduct(data);
      setName(data.name);
      setDescription(data.description ?? "");
      setPrice(String(data.price));
      setFeatured(data.featured ?? false);
    } catch {
      toast.error("Erro ao carregar produto.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (storeSlug && productId) {
      load();
    }
  }, [storeSlug, productId]);

  async function handleSave() {
    if (!product) return;

    try {
      setIsSaving(true);
      setSavedSuccessfully(false);

      await productService.updateProduct(storeSlug, product.id, {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        categoryId: product.categoryId,
        visible: product.visible,
        featured,
      });

      setSavedSuccessfully(true);
      toast.success("Produto atualizado com sucesso.");

      setTimeout(() => {
        setSavedSuccessfully(false);
      }, 3500);

      await load();
    } catch {
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setIsUploading(true);

      await imageService.uploadProductImage(storeSlug, productId, file);
      toast.success("Imagem adicionada com sucesso.");
      await load();
    } catch {
      toast.error("Erro ao enviar imagem.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando produto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <Package className="mx-auto mb-4 h-10 w-10 text-slate-300" />
        <h1 className="text-xl font-black text-slate-900">
          Produto não encontrado
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Não foi possível carregar os dados deste produto.
        </p>
      </div>
    );
  }

  const mainImage = product.images?.[0]?.imageUrl;

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
                Editar produto
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Atualize dados, preço, destaque e imagens deste produto.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  /{product.slug}
                </span>

                {product.featured && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                    <Star size={12} />
                    Destaque
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push(`/admin/${storeSlug}/products`)}
            className="h-12 rounded-xl border-slate-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para produtos
          </Button>
        </div>
      </header>

      {savedSuccessfully && (
        <div className="flex items-center gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-700 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <div>
            <p className="font-black">Produto salvo com sucesso</p>
            <p className="text-sm font-medium text-emerald-600">
              As alterações já foram aplicadas na vitrine.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Imagens
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
              {mainImage ? (
                <img
                  src={mainImage.replace(
                    "/upload/",
                    "/upload/w_700,q_auto,f_auto/"
                  )}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center text-slate-300">
                  <ImageIcon className="h-12 w-12" />
                  <p className="mt-3 text-xs font-black uppercase tracking-widest">
                    Sem imagem principal
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {product.images?.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-slate-50"
                >
                  <img
                    src={image.imageUrl.replace(
                      "/upload/",
                      "/upload/w_300,q_auto,f_auto/"
                    )}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-slate-300 hover:bg-white disabled:opacity-60"
              >
                {isUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <UploadCloud className="h-5 w-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Enviar
                    </span>
                  </>
                )}
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
              accept="image/*"
            />

            <p className="text-xs leading-relaxed text-slate-400">
              A primeira imagem da lista será usada como imagem principal do
              produto na vitrine.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Dados do produto
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 p-6 md:p-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                Nome do produto
              </label>

              <div className="relative">
                <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                <FileText size={14} />
                Descrição
              </label>

              <textarea
                placeholder="Descreva os detalhes do produto..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                Preço de venda
              </label>

              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFeatured((current) => !current)}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                featured
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-slate-50/60 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    featured
                      ? "bg-amber-500 text-white"
                      : "bg-white text-slate-400"
                  }`}
                >
                  <Star size={20} />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    Produto em destaque
                  </p>
                  <p className="text-xs text-slate-500">
                    Exibir este produto na seção de destaques da loja.
                  </p>
                </div>
              </div>

              <div
                className={`h-6 w-11 rounded-full p-1 transition-all ${
                  featured ? "bg-amber-500" : "bg-slate-200"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-all ${
                    featured ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </button>

            <div className="flex justify-end border-t border-slate-100 pt-6">
              <Button
                onClick={handleSave}
                disabled={isSaving || !name.trim() || !price}
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
      </div>
    </div>
  );
}