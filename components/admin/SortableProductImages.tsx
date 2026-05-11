"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

export type SortableProductImage = {
  id: string | number;
  imageUrl: string;
  position?: number;
  file?: File;
};

type SortableProductImagesProps = {
  images: SortableProductImage[];
  onChange: (images: SortableProductImage[]) => void;
  onRemove?: (image: SortableProductImage) => void;
  onReorder?: (images: SortableProductImage[]) => Promise<void> | void;
};

function getPreviewUrl(imageUrl: string) {
  if (imageUrl.startsWith("blob:")) {
    return imageUrl;
  }

  return imageUrl.replace("/upload/", "/upload/w_300,q_auto,f_auto/");
}

function SortableImageItem({
  image,
  index,
  onRemove,
}: {
  image: SortableProductImage;
  index: number;
  onRemove?: (image: SortableProductImage) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(image.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative aspect-square overflow-hidden rounded-2xl border bg-slate-50 shadow-sm transition-all ${isDragging
        ? "z-50 scale-105 border-slate-900 opacity-90"
        : "border-slate-100"
        }`}
    >
      <img
        src={getPreviewUrl(image.imageUrl)}
        alt=""
        className="h-full w-full object-cover"
      />

      {index === 0 && (
        <div className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow">
          Principal
        </div>
      )}

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute bottom-2 left-2 flex h-9 w-9 touch-none items-center justify-center rounded-xl bg-white/95 text-slate-700 shadow transition hover:bg-white"
        aria-label="Arrastar imagem"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(image)}
          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/95 text-white shadow transition hover:bg-red-600"
          aria-label="Remover imagem"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function SortableProductImages({
  images,
  onChange,
  onRemove,
  onReorder,
}: SortableProductImagesProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((image) => String(image.id) === active.id);
    const newIndex = images.findIndex((image) => String(image.id) === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedImages = arrayMove(images, oldIndex, newIndex).map(
      (image, index) => ({
        ...image,
        position: index + 1,
      })
    );

    onChange(reorderedImages);
    await onReorder?.(reorderedImages);
  }

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Nenhuma imagem adicionada
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Envie imagens para poder reorganizar a ordem.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={images.map((image) => String(image.id))}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <SortableImageItem
              key={String(image.id)}
              image={image}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}