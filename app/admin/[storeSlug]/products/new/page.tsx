"use client";

import {
  formatCurrencyInput,
  currencyStringToNumber,
} from "@/utils/currency";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  DollarSign,
  FileText,
  Layers,
  Loader2,
  Package,
  Save,
  Star,
  Tag,
  UploadCloud,
} from "lucide-react";

import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { imageService } from "@/services/imageService";
import type { CategoryResponse } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  SortableProductImages,
  type SortableProductImage,
} from "@/components/admin/SortableProductImages";

export default function NewProductPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storeSlug = params.storeSlug as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<SortableProductImage[]>([]);

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const data = await categoryService.getAdminCategories(storeSlug);
        setCategories(data);
      } catch {
        toast.error("Erro ao carregar categorias.");
      } finally {
        setIsLoadingCategories(false);
      }
    }

    if (storeSlug) {
      loadCategories();
    }
  }, [storeSlug]);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(image.imageUrl);
        }
      });
    };
  }, [images]);

  function handleSelectImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) return;

    const remainingSlots = 8 - images.length;

    if (remainingSlots <= 0) {
      toast.error("Você pode adicionar no máximo 8 imagens por produto.");
      e.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    const newImages: SortableProductImage[] = selectedFiles.map(
      (file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        imageUrl: URL.createObjectURL(file),
        file,
        position: images.length + index + 1,
      })
    );

    setImages((current) => [...current, ...newImages]);

    if (files.length > remainingSlots) {
      toast.warning(`Apenas ${remainingSlots} imagem(ns) foram adicionadas.`);
    }

    e.target.value = "";
  }

  function handleRemoveImage(imageToRemove: SortableProductImage) {
    setImages((current) =>
      current
        .filter((image) => image.id !== imageToRemove.id)
        .map((image, index) => ({
          ...image,
          position: index + 1,
        }))
    );

    if (imageToRemove.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.imageUrl);
    }
  }

  async function handleCreate() {
    if (!name.trim() || !price || !categoryId) {
      toast.error("Preencha nome, preço e categoria.");
      return;
    }

    try {
      setIsSaving(true);

      const createdProduct = await productService.createProduct(storeSlug, {
        name: name.trim(),
        description: description.trim(),
        price: currencyStringToNumber(price),
        categoryId: Number(categoryId),
        visible: true,
        featured,
      });

      for (const image of images) {
        if (image.file) {
          await imageService.uploadProductImage(
            storeSlug,
            createdProduct.id,
            image.file
          );
        }
      }

      toast.success("Produto criado com sucesso.");
      router.push(`/admin/${storeSlug}/products/${createdProduct.id}/edit`);
    } catch {
      toast.error("Erro ao criar produto.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Package className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Novo produto
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Cadastre um novo item para aparecer na vitrine pública da loja.
              Você também pode adicionar e reorganizar imagens antes de criar.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
              <CheckCircle2 size={12} />
              Produto ficará visível ao criar
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-black text-slate-900">
              Informações do produto
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
                  placeholder="Ex: Vestido floral azul"
                  className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                <FileText size={14} />
                Descrição
              </label>

              <textarea
                placeholder="Descreva tecido, tamanho, diferenciais, uso indicado..."
                className="min-h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Preço
                </label>

                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0,00"
                    className="h-13 rounded-2xl border-slate-200 bg-slate-50/60 pl-11"
                    value={price}
                    onChange={(e) =>
                      setPrice(formatCurrencyInput(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Categoria
                </label>

                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    className="h-13 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/60 px-11 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900"
                    value={categoryId}
                    onChange={(e) =>
                      setCategoryId(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    disabled={isLoadingCategories}
                  >
                    <option value="">
                      {isLoadingCategories
                        ? "Carregando..."
                        : "Selecione uma categoria"}
                    </option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFeatured((current) => !current)}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all ${featured
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-slate-50/60 hover:bg-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${featured
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
                className={`h-6 w-11 rounded-full p-1 transition-all ${featured ? "bg-amber-500" : "bg-slate-200"
                  }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-all ${featured ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </div>
            </button>

            <div className="flex justify-end border-t border-slate-100 pt-6">
              <Button
                onClick={handleCreate}
                disabled={isSaving || !name.trim() || !price || !categoryId}
                className="h-12 rounded-xl bg-slate-900 px-8 font-bold"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? "Criando..." : "Criar produto"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black text-slate-900">
                Imagens
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <SortableProductImages
                images={images}
                onChange={setImages}
                onRemove={handleRemoveImage}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= 8}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-slate-500 transition-all hover:border-slate-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <UploadCloud className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Adicionar imagens
                </span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleSelectImages}
                className="hidden"
                accept="image/*"
                multiple
              />

              <p className="text-xs leading-relaxed text-slate-400">
                Arraste para reorganizar. A primeira imagem será enviada como
                principal. Limite: 8 imagens.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-100 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black text-slate-900">
                Resumo
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Produto
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {name || "Nome do produto"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Preço
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {price
                    ? currencyStringToNumber(price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                    : "Não definido"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Imagens
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {images.length > 0
                    ? `${images.length} imagem(ns)`
                    : "Nenhuma imagem"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Status
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {featured ? "Destaque + visível" : "Visível"}
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}