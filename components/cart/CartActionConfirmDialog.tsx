"use client";

import { X } from "lucide-react";

type CartActionConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "add" | "remove";
  onConfirm: () => void;
  onClose: () => void;
};

export function CartActionConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  variant = "add",
  onConfirm,
  onClose,
}: CartActionConfirmDialogProps) {
  if (!open) return null;

  const confirmButtonClass =
    variant === "remove"
      ? "bg-rose-600 hover:bg-rose-500"
      : "bg-zinc-900 hover:bg-zinc-800";

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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-2xl px-5 py-3 text-sm font-bold text-white transition active:scale-95 ${confirmButtonClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}