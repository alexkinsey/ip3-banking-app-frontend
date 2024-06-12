import React, { useContext } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { useParams } from 'react-router-dom';
import { AuthUserContext } from '../../contexts/contexts';
import { Loading } from '../../components/Loading/Loading';
import { Heading } from '../../components/Heading/Heading';
import { useTransaction } from '../../hooks/useTransaction';
import { Text } from '../../components/Text/Text';
import { formatTime } from '../../common/helpers/formateTime';
import { Card } from '../../components/Card/Card';
import { HR } from '../../components/HR/HR';
import { formatCurrency } from '../../common/helpers/formatCurrency';
import {
  IconTransactionContainer,
  StyledCategoryIcon,
} from './Transaction.style';
import { LabelText } from './Transaction.style';

export const Transaction = () => {
  const { transactionId, accountId } = useParams();
  const { accessToken } = useContext(AuthUserContext);
  const { transaction, isLoading } = useTransaction(accessToken, transactionId);

  if (isLoading) {
    return <Loading />;
  }

  console.log('transaction', transaction);

  const backText = accountId ? 'Account' : 'Home';
  const location = accountId ? `/accounts/${accountId}` : '/';

  return (
    <PageLayout linkText={backText} linkLocation={location}>
      <IconTransactionContainer>
        <StyledCategoryIcon category={transaction.category} size={124} glow />
        <Heading displayAs={2} size={1}>
          {transaction.vendor}
        </Heading>
        <Heading displayAs={1} size={2}>
          {formatCurrency(transaction.amount)}
        </Heading>
        <Text color="grey">
          {transaction.category} • {formatTime(transaction.createdAt)}
        </Text>
      </IconTransactionContainer>
      <Card>
        <Heading displayAs={2} size={1}>
          Transaction details
        </Heading>
        <LabelText>
          <Text>Payment method</Text> <Text>{transaction.paymentMethod}</Text>
        </LabelText>
        <HR />
        <LabelText>
          <Text>Status</Text>
          <Text>{transaction.pending ? 'Pending' : 'Completed'}</Text>
        </LabelText>
      </Card>
    </PageLayout>
  );
};
