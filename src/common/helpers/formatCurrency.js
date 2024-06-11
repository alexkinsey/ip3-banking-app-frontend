export const formatCurrency = (amount) => {
  return Number(amount) < 0 ? (
    `- £${Math.abs(amount)}`
  ) : (
    <strong>£{amount}</strong>
  );
};
