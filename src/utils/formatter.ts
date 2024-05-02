export const formatCurrency = (value: number | string = 0, withSymbol = false) => {
  const formattedValue = new Intl.NumberFormat("id-ID").format(Number(value));
  return withSymbol ? `Rp.${formattedValue}` : formattedValue;
};
