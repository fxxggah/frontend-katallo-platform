export const MAX_PRODUCT_IMAGE_SIZE = 5 * 1024 * 1024;

const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const HEIC_TYPES = new Set([
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

function getFileExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");

  if (parts.length < 2) {
    return "";
  }

  return parts[parts.length - 1];
}

function isHeicFile(file: File): boolean {
  const type = file.type.toLowerCase();
  const extension = getFileExtension(file.name);

  return (
    HEIC_TYPES.has(type) ||
    extension === "heic" ||
    extension === "heif"
  );
}

function isSupportedImageFile(file: File): boolean {
  return SUPPORTED_IMAGE_TYPES.has(file.type.toLowerCase());
}

function createFileWithMimeType(
  file: File,
  mimeType: string,
  fileName = file.name
): File {
  return new File([file], fileName, {
    type: mimeType,
    lastModified: file.lastModified,
  });
}

async function convertHeicToJpeg(file: File): Promise<File> {
  try {
    const heic2any = (await import("heic2any")).default;

    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    const blob = Array.isArray(converted) ? converted[0] : converted;

    if (!(blob instanceof Blob)) {
      throw new Error("A conversão retornou um resultado inválido.");
    }

    const originalName = file.name.replace(/\.(heic|heif)$/i, "");

    return new File([blob], `${originalName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    throw new Error(
      `Não foi possível converter "${file.name}". Tente salvar a imagem como JPG, PNG ou WEBP.`
    );
  }
}

export async function prepareProductImage(file: File): Promise<File> {
  if (isHeicFile(file)) {
    const convertedFile = await convertHeicToJpeg(file);

    if (convertedFile.size > MAX_PRODUCT_IMAGE_SIZE) {
      throw new Error(
        `A imagem "${file.name}" ficou maior que 5 MB após a conversão.`
      );
    }

    return convertedFile;
  }

  if (!isSupportedImageFile(file)) {
    throw new Error(
      `O arquivo "${file.name}" não é suportado. Use JPG, PNG, WEBP ou HEIC/HEIF.`
    );
  }

  if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
    throw new Error(
      `A imagem "${file.name}" é muito grande. O tamanho máximo permitido é 5 MB.`
    );
  }

  return file;
}

export function isUploadableProductImage(file: File): boolean {
  return (
    SUPPORTED_IMAGE_TYPES.has(file.type.toLowerCase()) &&
    file.size <= MAX_PRODUCT_IMAGE_SIZE
  );
}

export function normalizeImageFile(file: File): File {
  const type = file.type.toLowerCase();

  if (SUPPORTED_IMAGE_TYPES.has(type)) {
    return file;
  }

  const extension = getFileExtension(file.name);

  if (extension === "jpg" || extension === "jpeg") {
    return createFileWithMimeType(file, "image/jpeg");
  }

  if (extension === "png") {
    return createFileWithMimeType(file, "image/png");
  }

  if (extension === "webp") {
    return createFileWithMimeType(file, "image/webp");
  }

  return file;
}