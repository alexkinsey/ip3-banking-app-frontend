import { formatToCamelCase } from '../../../common/helpers/formateToCamelCase';

// Helper function to calculate totals
export const calculateTotals = (transactions) => {
  return transactions.reduce((totals, transaction) => {
    if (!totals[transaction.category]) {
      totals[transaction.category] = 0;
    }
    totals[transaction.category] += transaction.amount;
    return totals;
  }, {});
};

// Helper function to filter transactions
export const filterTransactions = (transactions, date) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    const utcTransactionDate = new Date(
      Date.UTC(
        transactionDate.getUTCFullYear(),
        transactionDate.getUTCMonth(),
        transactionDate.getUTCDate()
      )
    )
      .toISOString()
      .split('T')[0];
    return utcTransactionDate === date;
  });
};

// Helper function to format categories
export const formatCategories = (totals, theme) => {
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, total]) => ({
      label: category,
      value: total,
      color: theme.colors.category[formatToCamelCase(category)],
    }));
};

// Helper function to filter transactions by month
export const filterTransactionsByMonth = (transactions, month, year) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    console.log('second', transactionDate);
    return (
      transactionDate.getUTCFullYear() === year &&
      transactionDate.getUTCMonth() === month
    );
  });
};

// Helper function to calculate total spent
export const calculateTotalSpent = (transactions) => {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
};
