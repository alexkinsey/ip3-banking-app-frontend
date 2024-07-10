import axios from 'axios';

export const createPayment = async (
  accessToken,
  fromAccountId,
  amount,
  accountNumber
) => {
  try {
    console.log(
      'API POST',
      `https://localhost:5001/api/payments/${accountNumber}`
    );
    const response = await axios.post(
      `https://localhost:5001/api/payments/${accountNumber}`,
      {
        fromAccountId,
        toAccountId: null,
        amount,
      },
      {
        headers: {
          'x-auth-token': `${accessToken}`,
        },
      }
    );

    console.log('API RESPONSE createPayment', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const createTransfer = async (
  accessToken,
  fromAccountId,
  toAccountId,
  amount
) => {
  try {
    const response = await axios.post(
      `https://localhost:5001/api/payments`,
      {
        fromAccountId,
        toAccountId,
        amount,
      },
      {
        headers: {
          'x-auth-token': `${accessToken}`,
        },
      }
    );

    console.log('API RESPONSE createPayment', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
