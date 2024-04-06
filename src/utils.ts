export function handleCurrency(value: number, currencySymbol = "$") {
  return `${currencySymbol}${value.toFixed(2)}`;
}
