import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { CustomerProvider } from './CustomerProvider';
import { AuthUserContext, CustomerContext } from '../contexts/contexts';
import { getCustomer } from '../api/customer';

jest.mock('../api/customer');

describe('CustomerProvider', () => {
  const mockUser = { username: 'testuser' };
  const mockAccessToken = 'mockAccessToken';
  const mockCustomerData = { id: 1, name: 'Test Customer' };

  const renderWithProviders = (ui, authUserValue) => {
    return render(
      <AuthUserContext.Provider value={authUserValue}>
        <CustomerProvider>{ui}</CustomerProvider>
      </AuthUserContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch customer data and update context values', async () => {
    getCustomer.mockResolvedValueOnce(mockCustomerData);

    let getByText;
    await act(async () => {
      ({ getByText } = renderWithProviders(
        <CustomerContext.Consumer>
          {({ isLoading, customerData }) => (
            <div>
              <div>isLoading: {String(isLoading)}</div>
              <div>customerData: {customerData ? customerData.name : 'null'}</div>
            </div>
          )}
        </CustomerContext.Consumer>,
        { user: mockUser, accessToken: mockAccessToken, isLoading: false }
      ));
    });

    await waitFor(() => {
      expect(getByText(/isLoading: false/i)).toBeInTheDocument();
      expect(getByText(new RegExp(`customerData: ${mockCustomerData.name}`, 'i'))).toBeInTheDocument();
    });

    expect(getCustomer).toHaveBeenCalledTimes(1); 
  });
});
