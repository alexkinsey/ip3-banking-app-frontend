import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { useParams, useNavigate } from 'react-router-dom';

export const Transaction = () => {
  const { transactionId, accountId } = useParams();
  const navigate = useNavigate();

  return (
    <PageLayout linkText="Back" linkLocation={`/accounts/${accountId}`}>
      Transaction
    </PageLayout>
  );
};
