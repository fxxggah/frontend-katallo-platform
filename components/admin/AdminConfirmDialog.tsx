"use client";

import { X } from "lucide-react";

type AdminConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function AdminConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  variant = "default",
  isLoading = false,
  onConfirm,
  onClose,
}: AdminConfirmDialogProps) {
  if (!open) return null;

  const confirmButtonClass =
    variant === "danger"
      ? "bg-rose-600 hover:bg-rose-500"
      : "bg-slate-900 hover:bg-slate-800";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tight text-zinc-900">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-2xl px-5 py-3 text-sm font-bold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${confirmButtonClass}`}
          >
            {isLoading ? "Excluindo..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}