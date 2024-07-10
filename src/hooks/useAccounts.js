// useAccounts.js
import { useContext } from 'react';
import { AccountsContext } from '../contexts/contexts';
import { getAccounts } from '../api/accounts'; // Assuming you have this API function

export const useAccounts = () => {
  const { accountsData, setAccountsData, isLoading, setIsLoading } =
    useContext(AccountsContext);

  const getAccountById = (id) => {
    const account = accountsData?.find((account) => account._id === id);
    return account;
  };

  const clearAccounts = () => {
    setAccountsData(null);
    setIsLoading(true);
  };

  const refreshAccounts = async (userId, accessToken) => {
    setIsLoading(true);
    try {
      const data = await getAccounts(userId, accessToken);
      setAccountsData(data);
    } catch (error) {
      console.error('Error refreshing accounts data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    accountsData,
    isLoading,
    getAccountById,
    clearAccounts,
    refreshAccounts,
  };
};
