import {
  calculateTotals,
  filterTransactions,
  formatCategories,
  filterTransactionsByMonth,
  calculateTotalSpent,
} from './homeHelper';

describe('homeHelper', () => {
  const transactions = [
    {
      category: 'Groceries',
      amount: 50,
      createdAt: '2023-07-01T12:00:00Z',
    },
    {
      category: 'Rent',
      amount: 1000,
      createdAt: '2023-07-01T12:00:00Z',
    },
    {
      category: 'Income',
      amount: 2000,
      createdAt: '2023-07-02T12:00:00Z',
    },
    {
      category: 'Utilities',
      amount: 150,
      createdAt: '2023-07-03T12:00:00Z',
    },
    {
      category: 'Groceries',
      amount: 70,
      createdAt: '2023-07-04T12:00:00Z',
    },
  ];

  const theme = {
    colors: {
      category: {
        groceries: '#ff0000',
        rent: '#00ff00',
        utilities: '#0000ff',
      },
    },
  };

  describe('calculateTotals', () => {
    it('should calculate totals correctly', () => {
      const result = calculateTotals(transactions);
      expect(result).toEqual({
        Groceries: 120,
        Rent: 1000,
        Income: 2000,
        Utilities: 150,
      });
    });
  });

  describe('filterTransactions', () => {
    it('should filter transactions by date correctly', () => {
      const result = filterTransactions(transactions, '2023-07-01');
      expect(result).toEqual([
        {
          category: 'Groceries',
          amount: 50,
          createdAt: '2023-07-01T12:00:00Z',
        },
        {
          category: 'Rent',
          amount: 1000,
          createdAt: '2023-07-01T12:00:00Z',
        },
      ]);
    });
  });

  describe('formatCategories', () => {
    it('should format categories correctly', () => {
      const totals = calculateTotals(transactions);
      const result = formatCategories(totals, theme);
      expect(result).toEqual([
        { label: 'Rent', value: 1000, color: '#00ff00' },
        { label: 'Utilities', value: 150, color: '#0000ff' },
        { label: 'Groceries', value: 120, color: '#ff0000' },
      ]);
    });
  });

  describe('filterTransactionsByMonth', () => {
    it('should filter transactions by month and year correctly', () => {
      const result = filterTransactionsByMonth(transactions, 6, 2023); 
      expect(result).toEqual(transactions);
    });
  });

  describe('calculateTotalSpent', () => {
    it('should calculate total spent correctly', () => {
      const result = calculateTotalSpent(transactions);
      expect(result).toBe(1270); 
    });
  });
});
