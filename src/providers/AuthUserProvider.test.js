import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { AuthUserProvider } from './AuthUserProvider';
import { AuthUserContext } from '../contexts/contexts';
import { getSessionData } from '../common/helpers/sessionHandlers';

jest.mock('../common/helpers/sessionHandlers');

describe('AuthUserProvider', () => {
  const renderWithProviders = (ui) => {
    return render(
      <AuthUserProvider>
        {ui}
      </AuthUserProvider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks(); 
  });

  it('should provide initial context values', async () => {
    const TestComponent = () => (
      <AuthUserContext.Consumer>
        {({ isLoading, accessToken, user }) => (
          <div>
            <div>isLoading: {String(isLoading)}</div>
            <div>accessToken: {String(accessToken)}</div>
            <div>user: {String(user)}</div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );

    const { getByText } = renderWithProviders(<TestComponent />);
    expect(getByText(/isLoading: true/i)).toBeInTheDocument();
    expect(getByText(/accessToken: null/i)).toBeInTheDocument();
    expect(getByText(/user: null/i)).toBeInTheDocument();
  });

  it('should fetch session data and update context values', async () => {
    const mockLoginResponse = {
      accessToken: 'mockAccessToken',
      user: { id: 'user1', name: 'User 1' }
    };
    getSessionData.mockResolvedValueOnce(mockLoginResponse);

    const TestComponent = () => (
      <AuthUserContext.Consumer>
        {({ isLoading, accessToken, user }) => (
          <div>
            <div>isLoading: {String(isLoading)}</div>
            <div>accessToken: {accessToken}</div>
            <div>user: {user ? JSON.stringify(user) : 'null'}</div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );

    let getByText;
    await act(async () => {
      ({ getByText } = renderWithProviders(<TestComponent />));
    });
    expect(getByText(/isLoading: false/i)).toBeInTheDocument();
    expect(getByText(/accessToken: mockAccessToken/i)).toBeInTheDocument();
    expect(getByText(/user: {"id":"user1","name":"User 1"}/i)).toBeInTheDocument();
  });

  it('should handle error in fetching session data', async () => {
    getSessionData.mockRejectedValueOnce(new Error('Failed to fetch session data'));

    const TestComponent = () => (
      <AuthUserContext.Consumer>
        {({ isLoading, accessToken, user }) => (
          <div>
            <div>isLoading: {String(isLoading)}</div>
            <div>accessToken: {String(accessToken)}</div>
            <div>user: {String(user)}</div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );

    let getByText;
    await act(async () => {
      ({ getByText } = renderWithProviders(<TestComponent />));
    });
    expect(getByText(/isLoading: false/i)).toBeInTheDocument();
    expect(getByText(/accessToken: null/i)).toBeInTheDocument();
    expect(getByText(/user: null/i)).toBeInTheDocument();
  });

  it('should not fetch session data when accessToken is not available', async () => {
    getSessionData.mockResolvedValueOnce(null);

    const TestComponent = () => (
      <AuthUserContext.Consumer>
        {({ isLoading, accessToken, user }) => (
          <div>
            <div>isLoading: {String(isLoading)}</div>
            <div>accessToken: {String(accessToken)}</div>
            <div>user: {String(user)}</div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );

    let getByText;
    await act(async () => {
      ({ getByText } = renderWithProviders(<TestComponent />));
    });
    expect(getByText(/isLoading: false/i)).toBeInTheDocument();
    expect(getByText(/accessToken: null/i)).toBeInTheDocument();
    expect(getByText(/user: null/i)).toBeInTheDocument();
  });
});
