export const formatCurrency = (value: number | string = 0, withSymbol = false) => {
  const formattedValue = new Intl.NumberFormat("id-ID").format(Number(value));
  return withSymbol ? `Rp.${formattedValue}` : formattedValue;
};

export const formatSpaceToNewLine = (v: string) => (v ? v.replace(" ", "\n") : v);

export const formatNewLineToSpace = (v: string) => (v ? v.replace(" ", "\n") : v);
