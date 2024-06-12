import React, { useContext, useEffect, useState } from 'react';
import { AccountsContext, AuthUserContext } from '../contexts/contexts';
import { getAccounts } from '../api/accounts';

export const AccountsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountsData, setAccountsData] = useState(null);
  const {
    user,
    accessToken,
    isLoading: isAuthUserLoading,
  } = useContext(AuthUserContext);

  // Fetch accounts data when the user is loaded
  useEffect(() => {
    let isMounted = true; // flag to track component mount status

    const fetchAccountsData = async () => {
      if (!accessToken) {
        return;
      }
      try {
        const data = await getAccounts(user?.id, accessToken);
        if (isMounted) {
          setAccountsData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching accounts data:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!isAuthUserLoading) {
      setIsLoading(true);
      fetchAccountsData();
    }

    return () => {
      isMounted = false; // update flag when component unmounts
    };
  }, [isAuthUserLoading, accessToken, user?.id]);

  return (
    <AccountsContext.Provider
      value={{ isLoading, setIsLoading, accountsData, setAccountsData }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
