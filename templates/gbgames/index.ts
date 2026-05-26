import type { StoreTemplateModule } from "@/templates/base/types";

import { GbGamesHomeTemplate } from "./pages/GbGamesHomeTemplate";
import { GbGamesCategoryTemplate } from "./pages/GbGamesCategoryTemplate";
import { GbGamesProductTemplate } from "./pages/GbGamesProductTemplate";
import { GbGamesCartTemplate } from "./pages/GbGamesCartTemplate";

export const gbGamesTemplate: StoreTemplateModule = {
  Home: GbGamesHomeTemplate,
  Category: GbGamesCategoryTemplate,
  Product: GbGamesProductTemplate,
  Cart: GbGamesCartTemplate,
};