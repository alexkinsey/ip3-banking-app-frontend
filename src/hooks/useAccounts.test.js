import { renderHookWithContext } from '../test-utils';
import { useAccounts } from './useAccounts';
import { AccountsContext } from '../contexts/contexts';

const mockAccountsData = [
  { _id: '1', name: 'Account 1' },
  { _id: '2', name: 'Account 2' },
];

const mockSetAccountsData = jest.fn();
const mockSetIsLoading = jest.fn();

const providerProps = {
  value: {
    accountsData: mockAccountsData,
    setAccountsData: mockSetAccountsData,
    isLoading: false,
    setIsLoading: mockSetIsLoading,
  },
};

describe('useAccounts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return accounts data and loading state', () => {
    const result = renderHookWithContext(useAccounts, { providerProps, context: AccountsContext });
    expect(result.accountsData).toEqual(mockAccountsData);
    expect(result.isLoading).toBe(false);
  });

  test('should return account by ID', () => {
    const result = renderHookWithContext(useAccounts, { providerProps, context: AccountsContext });
    const account = result.getAccountById('1');
    expect(account).toEqual(mockAccountsData[0]);
  });

  test('should return undefined if account ID is not found', () => {
    const result = renderHookWithContext(useAccounts, { providerProps, context: AccountsContext });
    const account = result.getAccountById('non-existent-id');
    expect(account).toBeUndefined();
  });

});
