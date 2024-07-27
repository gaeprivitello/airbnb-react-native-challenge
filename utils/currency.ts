export const formatPrice = (numberDecimal: string): string => {
  const priceFloat = parseFloat(numberDecimal);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceFloat);
};
