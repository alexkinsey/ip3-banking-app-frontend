// React and Router
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Hooks and helper functions
import { useAccounts } from '../../hooks/useAccounts';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useTheme } from 'styled-components';
import { getDatesForMonth } from '../../common/helpers/getDatesForMonth';
import { useTransactions } from '../../hooks/useTransaction';
import { formatTime } from '../../common/helpers/formateTime';

// Components and styles
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';
import { Card } from '../../components/Card/Card';
import { HR } from '../../components/HR/HR';
import { Text } from '../../components/Text/Text';
import { MonthPicker } from '../../components/MonthPicker/MonthPicker';
import { ExpensesBars } from '../../components/ExpensesBars/ExpensesBars';
import { DaySeparator } from '../../components/DaySeparator/DaySeparator';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { Transaction } from '../../components/Transaction/Transaction';

// Styles
import { AccountDetailsContainer, InfoIcon } from './Account.style';

export const Account = () => {
  const theme = useTheme();
  const { accountId } = useParams();
  const { getAccountById } = useAccounts();
  const { accessToken } = useAuthUser();
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const account = getAccountById(accountId);

  // For the dates and date picker
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState({
    name: date.toLocaleString('default', { month: 'long' }),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });
  const [dates, setDates] = useState([]);
  useEffect(() => {
    if (selectedMonth.month !== undefined && selectedMonth.year !== undefined) {
      const dates = getDatesForMonth(
        selectedMonth.month - 1,
        selectedMonth.year
      );
      setDates(dates);
    }
  }, [selectedMonth]);

  const { transactions, isLoading: transactionsIsLoading } = useTransactions(
    accessToken,
    accountId,
    selectedMonth.month,
    selectedMonth.year
  );

  return (
    <PageLayout linkText="Accounts" linkLocation={'/accounts'}>
      <Card style={{ position: 'relative' }}>
        <InfoIcon onClick={() => setShowAccountDetails(!showAccountDetails)} />
        <Heading>{account.accountType} Account</Heading>
        {showAccountDetails && (
          <>
            <AccountDetailsContainer>
              <Text size={5} color="grey" weight="medium">
                Account Number {account.accountNumber}
              </Text>
              <Text size={5} color="grey" weight="medium">
                Sort Code {account.sortCode}
              </Text>
            </AccountDetailsContainer>
            <HR />
          </>
        )}
        <Heading size={2}>£{account.balance.toFixed(2)}</Heading>
      </Card>
      <MonthPicker
        startDate={account.createdAt}
        onMonthChange={setSelectedMonth}
      />
      <Card>
        <Heading size={2}>{selectedMonth.name} overview</Heading>
        <ExpensesBars
          expenses={[
            {
              label: 'Income',
              value: transactions.reduce(
                (acc, transaction) =>
                  transaction.amount > 0 ? acc + transaction.amount : acc,
                0
              ),
              color: theme.colors.success,
            },
            {
              label: 'Spent',
              value: transactions.reduce(
                (acc, transaction) =>
                  transaction.amount < 0 ? acc + transaction.amount : acc,
                0
              ),
              color: theme.colors.warning,
            },
          ]}
        />
      </Card>
      {transactionsIsLoading ? (
        <Text>Loading transactions...</Text>
      ) : transactions.length > 0 ? (
        [...dates].reverse().map((date, index) => {
          // Convert date to a string in the format 'yyyy-mm-dd'
          const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          // Filter transactions that occurred on this date
          const transactionsOnThisDate = transactions.filter((transaction) => {
            // Convert transaction.createdAt to a string in the format 'yyyy-mm-dd'
            const transactionDate = new Date(transaction.createdAt);
            const utcTransactionDate = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}-${String(transactionDate.getDate()).padStart(2, '0')}`;
            return utcTransactionDate === dateString;
          });

          // If there are no transactions on this date, don't render anything
          if (transactionsOnThisDate.length === 0) {
            return null;
          }

          return (
            <GroupContent key={index}>
              <DaySeparator
                date={date.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                })}
                total={transactionsOnThisDate.reduce(
                  (acc, transaction) => acc + transaction.amount,
                  0
                )}
              />
              <Card>
                {transactionsOnThisDate.map((transaction, index) => (
                  <React.Fragment key={transaction._id}>
                    <Transaction
                      id={transaction._id}
                      category={transaction.category}
                      vendor={transaction.vendor}
                      time={formatTime(transaction.createdAt)}
                      amount={transaction.amount}
                    />
                    {index < transactionsOnThisDate.length - 1 && <HR />}
                  </React.Fragment>
                ))}
              </Card>
            </GroupContent>
          );
        })
      ) : (
        <Text>No transactions found</Text>
      )}
    </PageLayout>
  );
};
