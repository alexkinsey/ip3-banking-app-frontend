import axios from 'axios';
import {
  getTransactionsByMonthYear,
  getTransactionsById,
} from './transactions';

jest.mock('axios'); // Mock Axios module

describe('Transactions API', () => {
  const accessToken = 'mock_access_token';
  const accountId = 'mock_account_id';
  const transactionId = 'mock_transaction_id';
  const month = 6;
  const year = 2024;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactionsByMonthYear', () => {
    it('fetches transactions by month and year', async () => {
      const mockTransactions = [{ id: '1', amount: 100 }];

      // Mock Axios get request
      axios.get.mockResolvedValueOnce({ data: mockTransactions });

      const result = await getTransactionsByMonthYear(
        accessToken,
        accountId,
        month,
        year
      );

      expect(result).toEqual(mockTransactions);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `https://localhost:5001/api/transactions/${accountId}?month=${month}&year=${year}`,
        {
          headers: {
            'x-auth-token': accessToken,
          },
        }
      );
    });

    it('throws an error if fetching transactions fails', async () => {
      const errorMessage = 'Network Error';

      // Mock Axios get request to simulate error
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        getTransactionsByMonthYear(accessToken, accountId, month, year)
      ).rejects.toThrow(errorMessage);
    });
  });

  describe('getTransactionsById', () => {
    it('fetches transactions by transaction id', async () => {
      const mockTransaction = { id: '1', amount: 100 };

      // Mock Axios get request
      axios.get.mockResolvedValueOnce({ data: mockTransaction });

      const result = await getTransactionsById(
        accessToken,
        transactionId,
        accountId
      );

      expect(result).toEqual(mockTransaction);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `https://localhost:5001/api/transactions/id/${transactionId}/account/${accountId}`,
        {
          headers: {
            'x-auth-token': accessToken,
          },
        }
      );
    });

    it('throws an error if fetching transaction by id fails', async () => {
      const errorMessage = 'Unauthorized';

      // Mock Axios get request to simulate error
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        getTransactionsById(accessToken, transactionId, accountId)
      ).rejects.toThrow(errorMessage);
    });
  });
});
