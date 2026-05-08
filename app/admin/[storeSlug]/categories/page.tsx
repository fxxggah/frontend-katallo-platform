"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Edit3,
  Hash,
  Layers,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Tags,
  Trash2,
  X,
} from "lucide-react";

import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CategoryModalMode = "create" | "edit";

type CategoryModalState = {
  isOpen: boolean;
  mode: CategoryModalMode;
  category: CategoryResponse | null;
};

export default function CategoriesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [modal, setModal] = useState<CategoryModalState>({
    isOpen: false,
    mode: "create",
    category: null,
  });

  async function load() {
    try {
      setIsLoading(true);

      const data = await categoryService.getAdminCategories(storeSlug);

      setCategories(data);
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateModal() {
    setCategoryName("");
    setModal({
      isOpen: true,
      mode: "create",
      category: null,
    });
  }

  function openEditModal(category: CategoryResponse) {
    setCategoryName(category.name);
    setModal({
      isOpen: true,
      mode: "edit",
      category,
    });
  }

  function closeModal() {
    if (isSavingCategory) return;

    setModal({
      isOpen: false,
      mode: "create",
      category: null,
    });
    setCategoryName("");
  }

  async function handleSubmitCategory() {
    const trimmedName = categoryName.trim();

    if (!trimmedName) return;

    try {
      setIsSavingCategory(true);

      if (modal.mode === "create") {
        await categoryService.createCategory(storeSlug, {
          name: trimmedName,
        });
      }

      if (modal.mode === "edit" && modal.category) {
        await categoryService.updateCategory(storeSlug, modal.category.id, {
          name: trimmedName,
        });
      }

      await load();
      closeModal();
    } catch {
      alert(
        modal.mode === "create"
          ? "Erro ao criar categoria"
          : "Erro ao atualizar categoria"
      );
    } finally {
      setIsSavingCategory(false);
    }
  }

  async function handleDelete(id: number) {
    if (
      !window.confirm(
        "Excluir esta categoria? Essa ação pode afetar a organização dos produtos."
      )
    ) {
      return;
    }

    try {
      await categoryService.deleteCategory(storeSlug, id);
      load();
    } catch {
      alert("Erro ao excluir categoria");
    }
  }

  useEffect(() => {
    if (storeSlug) {
      load();
    }
  }, [storeSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando categorias...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <header className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Tags className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  Categorias
                </h1>

                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Organize a navegação da loja para que os clientes encontrem
                  produtos com mais facilidade.
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Layers size={12} />
                  {categories.length} categoria
                  {categories.length === 1 ? "" : "s"}
                </div>
              </div>
            </div>

            <Button
              onClick={openCreateModal}
              className="h-12 rounded-xl bg-slate-900 px-6 font-bold"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova categoria
            </Button>
          </div>
        </header>

        {categories.length > 0 ? (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="rounded-3xl border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Layers size={20} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-black text-slate-900">
                        {category.name}
                      </h2>

                      <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <Hash size={10} />
                        <span className="truncate">{category.slug}</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 shrink-0 rounded-xl hover:bg-slate-100"
                      >
                        <MoreVertical size={16} className="text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="rounded-xl border-slate-100 p-2 shadow-xl"
                    >
                      <DropdownMenuItem
                        onClick={() => openEditModal(category)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-slate-700 focus:bg-indigo-50 focus:text-indigo-600"
                      >
                        <Edit3 size={14} />
                        Editar nome
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleDelete(category.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg py-2 text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                      >
                        <Trash2 size={14} />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </section>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <Search className="mb-4 h-12 w-12 text-slate-200" />

            <h3 className="text-xl font-black text-slate-900">
              Nenhuma categoria criada
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Crie categorias como “Lançamentos”, “Vestidos”, “Promoções” ou
              “Mais vendidos” para organizar melhor sua vitrine.
            </p>

            <Button
              onClick={openCreateModal}
              className="mt-8 h-12 rounded-xl bg-slate-900 px-6 font-bold"
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar primeira categoria
            </Button>
          </div>
        )}
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  {modal.mode === "create"
                    ? "Nova categoria"
                    : "Editar categoria"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {modal.mode === "create"
                    ? "Crie uma categoria para organizar os produtos da loja."
                    : "Atualize o nome da categoria selecionada."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSavingCategory}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                Nome da categoria
              </label>

              <Input
                autoFocus
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitCategory();
                  }

                  if (e.key === "Escape") {
                    closeModal();
                  }
                }}
                placeholder="Ex: Vestidos"
                className="h-13 rounded-2xl border-slate-200 bg-slate-50/60"
              />
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={closeModal}
                disabled={isSavingCategory}
                className="h-12 rounded-xl border-slate-200 px-6 font-bold"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleSubmitCategory}
                disabled={isSavingCategory || !categoryName.trim()}
                className="h-12 rounded-xl bg-slate-900 px-6 font-bold"
              >
                {isSavingCategory && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {modal.mode === "create"
                  ? "Criar categoria"
                  : "Salvar alteração"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}