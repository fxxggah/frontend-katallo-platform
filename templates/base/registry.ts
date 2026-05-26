import type { StoreTemplateModule } from "./types";

import { minimalTemplate } from "../minimal";
import { gbGamesTemplate } from "../gbgames";

// Aqui você adiciona novos templates futuramente
// import { clienteATemplate } from "../clients/cliente-a";

const templateRegistry: Record<string, StoreTemplateModule> = {
  MINIMAL: minimalTemplate,

  GBGAMES: gbGamesTemplate,
  // exemplos futuros:
  // "cliente-a": clienteATemplate,
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