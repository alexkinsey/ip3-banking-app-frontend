import axios from 'axios';
import { removeSessionData } from '../common/helpers/sessionHandlers';

export const getCustomer = async (username, authCode) => {
  try {
    console.log(
      'API FETCH',
      `https://localhost:5001/api/customers/${username}`
    );
    const response = await axios.get(
      `https://localhost:5001/api/customers/${username}`,
      {
        headers: {
          'x-auth-token': `${authCode}`,
        },
      }
    );
    console.log('API RESPONSE getCustomer', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    removeSessionData('loginResponse');
    throw error;
  }
};
