import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ButtonPattern } from '../../components/ButtonPattern/ButtonPattern';
import { Text } from '../../components/Text/Text';
import { SwapIcon, TransferLocationContainer } from './MoveMoney.style';
import { Heading } from '../../components/Heading/Heading';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../components/Input/InputField';
import { useAccounts } from '../../hooks/useAccounts';

export const MoveMoney = () => {
  const { accountsData } = useAccounts();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState({
    fromAccount: accountsData[0],
    toAccount: accountsData[1],
  });
  const [amount, setAmount] = useState('');

  const handleValueChange = ({ target: { value } }) => {
    const numericValue = Number(value);
    if (numericValue < 0 || numericValue > accounts.fromAccount.balance) {
      return;
    }
    setAmount(numericValue);
  };

  return (
    <PageLayout heading="Move money">
      <GroupContent>
        <Text weight="medium">From</Text>
        <TransferLocationContainer $from>
          <Heading color="white" size={2}>
            {accounts.fromAccount.accountType} Account
          </Heading>
          <Text color="white" weight="medium">
            {amount || amount > 0
              ? `£${Number(accounts.fromAccount.balance) - Number(amount)}
            after transfer`
              : `£${accounts.fromAccount.balance}`}
          </Text>
        </TransferLocationContainer>
      </GroupContent>
      <SwapIcon
        onClick={() => {
          setAccounts({
            fromAccount: accounts.toAccount,
            toAccount: accounts.fromAccount,
          });
          setAmount('');
        }}
      />
      <GroupContent>
        <Text weight="medium">To</Text>
        <TransferLocationContainer>
          <Heading color="white" size={2}>
            {accounts.toAccount.accountType} Account
          </Heading>
          <Text color="white" weight="medium">
            {amount || amount > 0
              ? `£${Number(accounts.toAccount.balance) + Number(amount)}
            after transfer`
              : `£${accounts.toAccount.balance}`}
          </Text>
        </TransferLocationContainer>
      </GroupContent>
      <Spacer />
      <InputField label="Amount" value={amount} onChange={handleValueChange} />
      <ButtonPattern
        primaryLabel="Transfer"
        onPrimaryClick={() => navigate('/transfer-money')}
        secondaryLabel="Cancel"
        onSecondaryClick={() => navigate('/transfer-money')}
      />
    </PageLayout>
  );
};
