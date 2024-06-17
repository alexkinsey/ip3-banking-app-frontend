import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthUserContext } from '../contexts/contexts';
import { AccountsProvider } from '../providers/AccountsProvider'; // Assuming AccountsProvider.js is in providers folder
import { getAccounts } from './accounts'; // Adjust the path based on your project structure

// Mocking getAccounts function
jest.mock('./accounts', () => ({
  getAccounts: jest.fn(),
}));

describe('AccountsProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children with isLoading true initially', async () => {
    // Mock context values
    const authUserContextValue = {
      user: { id: 'user_id_123' },
      accessToken: 'mock_access_token',
      isLoading: false,
    };

    // Mock getAccounts to return some dummy data
    getAccounts.mockResolvedValue([{ id: 1, name: 'Account 1' }, { id: 2, name: 'Account 2' }]);

    let component;

    // Render AccountsProvider with mocked context values
    await act(async () => {
      component = render(
        <AuthUserContext.Provider value={authUserContextValue}>
          <AccountsProvider>
            <div>Child Component</div>
          </AccountsProvider>
        </AuthUserContext.Provider>
      );
    });

    // Check if isLoading is true initially
    expect(component.getByText('Child Component')).toBeTruthy();
  });

  it('fetches accounts data on mount', async () => {
    const authUserContextValue = {
      user: { id: 'user_id_123' },
      accessToken: 'mock_access_token',
      isLoading: false,
    };

    // Mock getAccounts to return some dummy data
    getAccounts.mockResolvedValue([{ id: 1, name: 'Account 1' }, { id: 2, name: 'Account 2' }]);

    let component;

    await act(async () => {
      component = render(
        <AuthUserContext.Provider value={authUserContextValue}>
          <AccountsProvider>
            <div>Child Component</div>
          </AccountsProvider>
        </AuthUserContext.Provider>
      );
    });

    // Wait for async operations to settle
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if getAccounts is called with correct arguments
    expect(getAccounts).toHaveBeenCalledWith('user_id_123', 'mock_access_token');
  });
});
