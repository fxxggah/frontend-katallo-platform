export function formatCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, "");

  const number = Number(digits) / 100;

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function currencyStringToNumber(value: string): number {
  const normalized = value
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(normalized);
}