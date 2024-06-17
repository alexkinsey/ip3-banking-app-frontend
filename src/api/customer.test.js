// customer.test.js

import axios from 'axios';
import { getCustomer } from './customer';
import { removeSessionData } from '../common/helpers/sessionHandlers'; // Correct import

jest.mock('axios'); // Mock Axios module

describe('Customer API', () => {
  const username = 'testuser';
  const accessToken = 'mock_access_token';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches customer data successfully', async () => {
    const mockCustomer = {
      id: '1',
      username: 'testuser',
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    axios.get.mockResolvedValueOnce({ data: mockCustomer });

    const result = await getCustomer(username, accessToken);

    expect(result).toEqual(mockCustomer);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `https://localhost:5001/api/customers/${username}`,
      {
        headers: {
          'x-auth-token': accessToken,
        },
      }
    );
  });

  it('handles error and redirects to login page', async () => {
    const errorMessage = 'Unauthorized';

    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Mock removeSessionData correctly
    const mockRemoveSessionData = jest.spyOn(
      require('../common/helpers/sessionHandlers'), // Adjust path as needed
      'removeSessionData'
    );

    const mockReplace = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { replace: mockReplace },
      writable: true,
    });

    await expect(getCustomer(username, accessToken)).rejects.toThrow(errorMessage);

    expect(mockRemoveSessionData).toHaveBeenCalledWith('loginResponse');
    expect(mockReplace).toHaveBeenCalledWith('/login');
  });
});
