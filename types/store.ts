// ======================================================
// TEMPLATES DISPONÍVEIS
// ======================================================

// Quando criar um novo template,
// adicione aqui.

export type StoreTemplate =
  | "MINIMAL";

export type StoreRequest = {
  name: string;
  logo?: string;
  favicon?: string;
  whatsappNumber?: string;
  instagram?: string;
  facebook?: string;

  // Template visual da loja
  template?: StoreTemplate;

  street?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
  googleMapsLink?: string;
};

export type StoreResponse = {
  id: number;
  name: string;
  slug: string;

  logo?: string;
  favicon?: string;

  whatsappNumber?: string;
  instagram?: string;
  facebook?: string;

  template: StoreTemplate;

  active: boolean;

  street?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
  googleMapsLink?: string;

  createdAt: string;
};