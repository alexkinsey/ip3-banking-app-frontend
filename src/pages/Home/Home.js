// React and React Router
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { Card } from '../../components/Card/Card';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import { Link } from '../../components/Link/Link';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { ExpensesBars } from '../../components/ExpensesBars/ExpensesBars';
import { Transaction } from '../../components/Transaction/Transaction';
import { HR } from '../../components/HR/HR';

// Hooks and helpers
import { useCustomer } from '../../hooks/useCustomer';
import { useAccounts } from '../../hooks/useAccounts';
import { useTransactions } from '../../hooks/useTransaction';
import { useAuthUser } from '../../hooks/useAuthUser';
import { formatTime } from '../../common/helpers/formateTime';
import {
  filterTransactionsByMonth,
  calculateTotals,
  formatCategories,
  calculateTotalSpent,
  filterTransactions,
} from './helpers/homeHelper';

// Styled Components
import { useTheme } from 'styled-components';

// Assets
import SquarePoundSymbol from '../../common/assets/square-pound-symbol-x2.svg';
import BankNoteSymbol from '../../common/assets/bank-note-symbol-x2.svg';

export const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { accessToken } = useAuthUser();
  const { customerData } = useCustomer();
  const { accountsData } = useAccounts();

  const today = new Date();

  const currentYear = today.getUTCFullYear();
  const currentMonth = today.getUTCMonth();
  const currentDate = today.getUTCDate();

  const utcToday = new Date(Date.UTC(currentYear, currentMonth, currentDate))
    .toISOString()
    .split('T')[0];

  const { transactions, isLoading: transactionsIsLoading } = useTransactions(
    accessToken,
    accountsData?.[0]?._id,
    today.getMonth() + 1,
    today.getFullYear()
  );

  const monthTransactions = filterTransactionsByMonth(
    transactions,
    currentMonth,
    currentYear
  );
  const categoryTotals = calculateTotals(monthTransactions);
  const topCategories = formatCategories(categoryTotals, theme);
  const totalSpentMonth = calculateTotalSpent(monthTransactions);

  const todayTransactions = filterTransactions(transactions, utcToday);
  const totalSpentToday = calculateTotalSpent(todayTransactions);

  return (
    <PageLayout>
      <Heading>
        Welcome back, <br /> {customerData?.forename}
      </Heading>

      <GroupContent>
        <Heading size={5}>Quick links</Heading>
        {accountsData &&
          accountsData.map((account) => (
            <ActionCard
              key={account._id}
              icon={
                account.accountType === 'Current'
                  ? SquarePoundSymbol
                  : BankNoteSymbol
              }
              content={`${account.accountType} Account`}
              subContent={`£${account.balance}`}
              onClick={() => navigate(`/accounts/${account._id}`)}
            />
          ))}
        <Link location="/accounts">View all accounts</Link>
      </GroupContent>

      {todayTransactions.length > 0 ||
        (monthTransactions.length > 0 && (
          <GroupContent>
            <Heading size={5}>Your money</Heading>
            {transactionsIsLoading ? (
              <Text>Loading...</Text>
            ) : (
              todayTransactions.length > 0 && (
                <Card>
                  <Heading size={2}>Today at a glance</Heading>
                  <Text>
                    So far you have spent <strong>£{totalSpentToday}</strong>{' '}
                    today
                  </Text>
                  {todayTransactions.map((transaction, index) => (
                    <React.Fragment key={transaction._id}>
                      <Transaction
                        category={transaction.category}
                        vendor={transaction.vendor}
                        time={formatTime(transaction.createdAt)}
                        amount={transaction.amount}
                      />
                      {index < todayTransactions.length - 1 && <HR />}
                    </React.Fragment>
                  ))}
                </Card>
              )
            )}
            {monthTransactions.length > 0 && (
              <Card>
                <Heading size={2}>June overview</Heading>
                <Text>
                  So far you this month you have spent <br />{' '}
                  <strong>£{totalSpentMonth}</strong>
                </Text>
                <Heading size={3}>Trends in your spending</Heading>
                <ExpensesBars expenses={topCategories} />
              </Card>
            )}
          </GroupContent>
        ))}
    </PageLayout>
  );
};
