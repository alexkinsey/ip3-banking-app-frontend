import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthUserContext, CustomerContext, AccountsContext } from './contexts';

const authUser = { name: 'Test User', email: 'test@example.com' };
const customer = { id: 1, name: 'Test Customer' };
const accounts = [{ id: 1, type: 'Savings' }, { id: 2, type: 'Checking' }];

function AuthUserConsumer() {
  const user = useContext(AuthUserContext);
  return <div data-testid="auth-user">{user ? user.name : 'No user'}</div>;
}

function CustomerConsumer() {
  const customerData = useContext(CustomerContext);
  return <div data-testid="customer">{customerData ? customerData.name : 'No customer'}</div>;
}

function AccountsConsumer() {
  const accountsData = useContext(AccountsContext);
  return (
    <div data-testid="accounts">
      {accountsData ? accountsData.map(acc => <div key={acc.id}>{acc.type}</div>) : 'No accounts'}
    </div>
  );
}

describe('Contexts', () => {
  test('AuthUserContext provides correct value', async () => {
    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <AuthUserContext.Provider value={authUser}>
          <AuthUserConsumer />
        </AuthUserContext.Provider>
      ));
    });
    const authUserElement = getByTestId('auth-user');
    expect(authUserElement).toHaveTextContent('Test User');
  });

  test('CustomerContext provides correct value', async () => {
    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <CustomerContext.Provider value={customer}>
          <CustomerConsumer />
        </CustomerContext.Provider>
      ));
    });
    const customerElement = getByTestId('customer');
    expect(customerElement).toHaveTextContent('Test Customer');
  });

  test('AccountsContext provides correct values', async () => {
    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <AccountsContext.Provider value={accounts}>
          <AccountsConsumer />
        </AccountsContext.Provider>
      ));
    });
    const accountsElement = getByTestId('accounts');
    expect(accountsElement).toContainHTML('<div>Savings</div>');
    expect(accountsElement).toContainHTML('<div>Checking</div>');
  });
});
