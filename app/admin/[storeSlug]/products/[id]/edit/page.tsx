"use client";

import {
  currencyStringToNumber,
  formatCurrencyInput,
} from "@/utils/currency";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Star,
  Tag,
  UploadCloud,
  Archive,
} from "lucide-react";

import { imageService } from "@/services/imageService";
import { productService } from "@/services/productService";

import type { ProductResponse } from "@/types";

import {
  SortableProductImages,
  type SortableProductImage,
} from "@/components/admin/SortableProductImages";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

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
  const [inStock, setInStock] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  async function load() {
    try {
      setIsLoading(true);

      const data = await productService.getProductById(
        storeSlug,
        productId
      );

      const sortedImages = [...(data.images ?? [])].sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0)
      );

      setProduct({
        ...data,
        images: sortedImages,
      });

      setName(data.name);
      setDescription(data.description ?? "");

      setPrice(
        data.price.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );

      setFeatured(data.featured ?? false);
      setInStock(data.inStock ?? true);
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

  function handleToggleFeatured() {
    if (!inStock) {
      toast.error("Produto esgotado não pode ser marcado como destaque.");
      return;
    }

    setFeatured((current) => !current);
  }

  function handleToggleInStock() {
    setInStock((current) => {
      const nextValue = !current;

      if (!nextValue) {
        setFeatured(false);
      }

      return nextValue;
    });
  }

  async function handleSave() {
  if (!product) return;

  try {
    setIsSaving(true);

    await productService.updateProduct(storeSlug, product.id, {
      name: name.trim(),
      description: description.trim(),
      price: currencyStringToNumber(price),
      categoryId: product.categoryId,
      inStock,
      featured: inStock ? featured : false,
    });

    toast.success("Produto atualizado com sucesso.");

    router.push(`/admin/${storeSlug}/products`);
  } catch {
    toast.error("Erro ao salvar produto.");
  } finally {
    setIsSaving(false);
  }
}

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error(
        `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`
      );

      e.target.value = "";
      return;
    }

    try {
      setIsUploading(true);

      await imageService.uploadProductImage(
        storeSlug,
        productId,
        file
      );

      toast.success("Imagem adicionada com sucesso.");

      await load();
    } catch {
      toast.error("Erro ao enviar imagem.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  function handleImagesChange(images: SortableProductImage[]) {
    if (!product) return;

    setProduct({
      ...product,
      images: images.map((image, index) => ({
        id: Number(image.id),
        imageUrl: image.imageUrl,
        position: index + 1,
      })),
    });
  }

  async function handleReorderImages(
    images: SortableProductImage[]
  ) {
    try {
      await imageService.reorderProductImages(
        storeSlug,
        productId,
        {
          imageIds: images.map((image) => Number(image.id)),
        }
      );

      toast.success("Ordem das imagens atualizada.");
    } catch {
      toast.error("Erro ao reordenar imagens.");
      await load();
    }
  }

  async function handleRemoveImage(
    image: SortableProductImage
  ) {
    try {
      await imageService.deleteProductImage(
        storeSlug,
        productId,
        Number(image.id)
      );

      toast.success("Imagem removida.");
      await load();
    } catch {
      toast.error("Erro ao remover imagem.");
    }
  }

  if (isLoading) {
    return <div>Carregando produto...</div>;
  }

  if (!product) {
    return (
      <div>
        <h2>Produto não encontrado</h2>
      </div>
    );
  }

  const images: SortableProductImage[] = (
    product.images ?? []
  ).map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    position: image.position,
  }));

  const mainImage = product.images?.[0]?.imageUrl;

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">
            Editar produto
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
              /{product.slug}
            </span>

            {product.featured && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                Destaque
              </span>
            )}

            <span
              className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                inStock
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {inStock ? "Em estoque" : "Esgotado"}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() =>
            router.push(`/admin/${storeSlug}/products`)
          }
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="overflow-hidden rounded-3xl border bg-slate-50">
              {mainImage ? (
                <img
                  src={mainImage.replace(
                    "/upload/",
                    "/upload/w_700,q_auto,f_auto/"
                  )}
                  alt={product.name}
                  className={`aspect-square w-full object-cover ${
                    !inStock ? "grayscale" : ""
                  }`}
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-slate-300">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
            </div>

            <SortableProductImages
              images={images}
              onChange={handleImagesChange}
              onReorder={handleReorderImages}
              onRemove={handleRemoveImage}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-4"
            >
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <UploadCloud className="h-5 w-5" />
                  <span>Enviar imagem</span>
                </>
              )}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
              accept="image/*"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados do produto</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-36 w-full rounded-2xl border border-slate-200 p-4"
            />

            <Input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) =>
                setPrice(formatCurrencyInput(e.target.value))
              }
            />

            <button
              type="button"
              onClick={handleToggleInStock}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 ${
                inStock
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-zinc-200 bg-zinc-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Archive />

                <div>
                  <p className="font-black">
                    {inStock
                      ? "Produto em estoque"
                      : "Produto esgotado"}
                  </p>
                </div>
              </div>

              <CheckCircle2 />
            </button>

            <button
              type="button"
              onClick={handleToggleFeatured}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 ${
                featured
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-slate-50"
              } ${!inStock ? "opacity-60" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Star />

                <div>
                  <p className="font-black">
                    Produto em destaque
                  </p>

                  <p className="text-xs text-slate-500">
                    {!inStock
                      ? "Produto esgotado não pode ser destacado."
                      : "Exibir produto na seção de destaques."}
                  </p>
                </div>
              </div>

              <CheckCircle2 />
            </button>

            <div className="flex justify-end pt-6">
              <Button
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}

                Salvar alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}