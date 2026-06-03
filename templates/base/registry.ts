import type { StoreTemplateModule } from "./types";

import { minimalTemplate } from "../minimal";
import { gbGamesTemplate } from "../gbgames";
import { esterTemplate } from "../clients/ester";
// adicione novos templates aqui

const templateRegistry: Record<string, StoreTemplateModule> = {
  MINIMAL: minimalTemplate,
  GBGAMES: gbGamesTemplate,
  ESTER: esterTemplate,
  // adicione novos templates aqui
};

export function getTemplate(
  templateName?: string
): StoreTemplateModule {
  if (!templateName) {
    return minimalTemplate;
  }

  return (
    templateRegistry[templateName] ||
    minimalTemplate
  );
}