import type { StoreTemplateModule } from "@/templates/base/types";

import { EsterHomeTemplate } from "./pages/EsterHomeTemplate";
import { EsterCategoryTemplate } from "./pages/EsterCategoryTemplate";
import { EsterProductTemplate } from "./pages/EsterProductTemplate";
import { EsterCartTemplate } from "./pages/EsterCartTemplate";

export const esterTemplate: StoreTemplateModule = {
  Home: EsterHomeTemplate,
  Category: EsterCategoryTemplate,
  Product: EsterProductTemplate,
  Cart: EsterCartTemplate,
};