import { useEffect, useState } from 'react';
import {
  getTransactionsById,
  getTransactionsByMonthYear,
} from '../api/transactions';

export const useTransactions = (accessToken, accountId, month, year) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactionsByMonthYear(
          accessToken,
          accountId,
          month,
          year,
          abortController.signal
        );
        setTransactions(result);
        setIsLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
        setIsLoading(false);
      }
    };

    fetchTransactions();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [accessToken, accountId, month, year]);

  return { transactions, isLoading };
};

export const useTransaction = (accessToken, transactionId, accountId) => {
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactionsById(
          accessToken,
          transactionId,
          accountId,
          abortController.signal
        );
        setTransaction(result);
        setIsLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
        setIsLoading(false);
      }
    };
    fetchTransaction();
    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [accessToken, transactionId, accountId]);
  return { transaction, isLoading };
};
