import { renderHookWithContext } from '../test-utils';
import { useCustomer } from './useCustomer';
import { CustomerContext } from '../contexts/contexts';
import { act } from 'react';

const mockSetCustomerData = jest.fn();
const mockSetIsLoading = jest.fn();

const providerProps = {
  value: {
    customerData: { name: 'Test Customer' },
    setCustomerData: mockSetCustomerData,
    isLoading: false,
    setIsLoading: mockSetIsLoading,
  },
};

describe('useCustomer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return customer data and loading state', () => {
    const result = renderHookWithContext(useCustomer, { providerProps, context: CustomerContext });
    expect(result.customerData).toEqual({ name: 'Test Customer' });
    expect(result.isLoading).toBe(false);
  });

  test('should clear customer data and set loading state', () => {
    const result = renderHookWithContext(useCustomer, { providerProps, context: CustomerContext });

    act(() => {
      result.clearCustomer();
    });

    expect(mockSetCustomerData).toHaveBeenCalledWith(null);
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  });
});
