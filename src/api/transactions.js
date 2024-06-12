import axios from 'axios';

export const getTransactionsByMonthYear = async (
  authCode,
  accountId,
  month,
  year
) => {
  try {
    console.log(
      'API FETCH',
      `https://localhost:5001/api/transactions/${accountId}?month=${month}&year=${year}`
    );
    const response = await axios.get(
      `https://localhost:5001/api/transactions/${accountId}?month=${month}&year=${year}`,
      {
        headers: {
          'x-auth-token': `${authCode}`,
        },
      }
    );
    console.log('API RESPONSE getTransactions', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving transactions for this account:', error);
    throw error;
  }
};
