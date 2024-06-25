import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountsProvider } from './AccountsProvider';
import { AuthUserContext, AccountsContext } from '../contexts/contexts';
import { getAccounts } from '../api/accounts';

jest.mock('../api/accounts');

// Helper function to render component with context providers
const renderWithProviders = (ui, { authUserValue, accountsValue }) => {
  return render(
    <AuthUserContext.Provider value={authUserValue}>
      <AccountsContext.Provider value={accountsValue}>
        {ui}
      </AccountsContext.Provider>
    </AuthUserContext.Provider>
  );
};

describe('AccountsProvider', () => {
  const mockGetAccounts = getAccounts;
  const authUserValue = {
    user: { id: 'user1' },
    accessToken: 'mockAccessToken',
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide initial context values', () => {
    const { getByText } = renderWithProviders(
      <AccountsProvider>
        <AccountsContext.Consumer>
          {(value) => (
            <div>
              <div>isLoading: {value.isLoading.toString()}</div>
              <div>accountsData: {JSON.stringify(value.accountsData)}</div>
            </div>
          )}
        </AccountsContext.Consumer>
      </AccountsProvider>,
      { authUserValue }
    );

    expect(getByText(/isLoading: true/i)).toBeInTheDocument();
    expect(getByText(/accountsData: null/i)).toBeInTheDocument();
  });

  it('should fetch accounts data and update context values', async () => {
    const accountsData = [{ id: 'account1', name: 'Account 1' }];
    mockGetAccounts.mockResolvedValueOnce(accountsData);

    await act(async () => {
      renderWithProviders(
        <AccountsProvider>
          <AccountsContext.Consumer>
            {(value) => (
              <div>
                <div>isLoading: {value.isLoading.toString()}</div>
                <div>accountsData: {JSON.stringify(value.accountsData)}</div>
              </div>
            )}
          </AccountsContext.Consumer>
        </AccountsProvider>,
        { authUserValue }
      );
    });

    await waitFor(() => expect(mockGetAccounts).toHaveBeenCalledWith('user1', 'mockAccessToken'));

    expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
    expect(screen.getByText(/accountsData: \[{"id":"account1","name":"Account 1"}\]/i)).toBeInTheDocument();
  });

  it('should handle error in fetching accounts data', async () => {
    mockGetAccounts.mockRejectedValueOnce(new Error('Error fetching accounts'));

    await act(async () => {
      renderWithProviders(
        <AccountsProvider>
          <AccountsContext.Consumer>
            {(value) => (
              <div>
                <div>isLoading: {value.isLoading.toString()}</div>
                <div>accountsData: {JSON.stringify(value.accountsData)}</div>
              </div>
            )}
          </AccountsContext.Consumer>
        </AccountsProvider>,
        { authUserValue }
      );
    });

    await waitFor(() => expect(mockGetAccounts).toHaveBeenCalledWith('user1', 'mockAccessToken'));

    expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
    expect(screen.getByText(/accountsData: null/i)).toBeInTheDocument();
  });

  it('should not fetch accounts data when accessToken is not available', async () => {
    const authUserValueWithoutToken = {
      ...authUserValue,
      accessToken: null,
    };

    await act(async () => {
      renderWithProviders(
        <AccountsProvider>
          <AccountsContext.Consumer>
            {(value) => (
              <div>
                <div>isLoading: {value.isLoading.toString()}</div>
                <div>accountsData: {JSON.stringify(value.accountsData)}</div>
              </div>
            )}
          </AccountsContext.Consumer>
        </AccountsProvider>,
        { authUserValue: authUserValueWithoutToken }
      );
    });

    expect(mockGetAccounts).not.toHaveBeenCalled();
    expect(screen.getByText(/isLoading: true/i)).toBeInTheDocument();
    expect(screen.getByText(/accountsData: null/i)).toBeInTheDocument();
  });
});
