import axios from 'axios';
import { removeSessionData } from '../common/helpers/sessionHandlers';

export const getAccounts = async (userId, accessToken) => {
  try {
    console.log('API FETCH', `https://localhost:5001/api/accounts/${userId}`);
    const response = await axios.get(
      `https://localhost:5001/api/accounts/${userId}`,
      {
        headers: {
          'x-auth-token': `${accessToken}`,
        },
      }
    );
    console.log('API RESPONSE getAccounts', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving accounts:', error);
    removeSessionData('loginResponse');
    window.location.replace('/login');
    throw error;
  }
};
