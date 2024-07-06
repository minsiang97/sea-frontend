export const parseNumberToCurrency = (amount: number) => {
  return (
    'RM ' +
    amount
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
};
