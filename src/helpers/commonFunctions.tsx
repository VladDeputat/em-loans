const intl = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

export const formatNumber = (value: string) => {
  return intl.format(Number(value));
};
