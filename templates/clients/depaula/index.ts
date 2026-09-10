import type { StoreTemplateModule } from "@/templates/base/types";

import { DePaulaHomeTemplate } from "./pages/DePaulaHomeTemplate";
import { DePaulaCategoryTemplate } from "./pages/DePaulaCategoryTemplate";
import { DePaulaProductTemplate } from "./pages/DePaulaProductTemplate";
import { DePaulaCartTemplate } from "./pages/DePaulaCartTemplate";

export const depaulaTemplate: StoreTemplateModule = {
  Home: DePaulaHomeTemplate,
  Category: DePaulaCategoryTemplate,
  Product: DePaulaProductTemplate,
  Cart: DePaulaCartTemplate,
};