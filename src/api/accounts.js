import axios from 'axios';

export const getAccounts = async (userId, authCode) => {
  try {
    console.log('API FETCH', `https://localhost:5001/api/accounts/${userId}`);
    const response = await axios.get(
      `https://localhost:5001/api/accounts/${userId}`,
      {
        headers: {
          'x-auth-token': `${authCode}`,
        },
      }
    );
    console.log('API RESPONSE getAccounts', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving accounts:', error);
    throw error;
  }
};
