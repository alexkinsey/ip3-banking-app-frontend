import { renderHookWithContext } from '../test-utils';
import { useAuthUser } from './useAuthUser';
import { AuthUserContext } from '../contexts/contexts';
import { act } from 'react';

const mockSetIsLoading = jest.fn();
const mockSetAccessToken = jest.fn();
const mockSetUser = jest.fn();

const providerProps = {
  value: {
    isLoading: false,
    setIsLoading: mockSetIsLoading,
    accessToken: 'mockAccessToken',
    setAccessToken: mockSetAccessToken,
    user: { name: 'Test User' },
    setUser: mockSetUser,
  },
};

describe('useAuthUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return auth user data and loading state', () => {
    const result = renderHookWithContext(useAuthUser, { providerProps, context: AuthUserContext });
    expect(result.isLoading).toBe(false);
    expect(result.accessToken).toBe('mockAccessToken');
    expect(result.user).toEqual({ name: 'Test User' });
  });

  test('should clear auth user data', () => {
    const result = renderHookWithContext(useAuthUser, { providerProps, context: AuthUserContext });

    act(() => {
      result.clearAuthUser();
    });

    expect(mockSetAccessToken).toHaveBeenCalledWith(null);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });
});
