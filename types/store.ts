// ======================================================
// TEMPLATES DISPONÍVEIS
// ======================================================

export type StoreTemplate =
  | "MINIMAL"
  | "GBGAMES";

export type StoreRequest = {
  name: string;

  logo?: string;
  favicon?: string;

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