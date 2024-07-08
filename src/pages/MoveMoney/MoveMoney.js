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
import { useTheme } from 'styled-components';

export const MoveMoney = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { accountsData } = useAccounts();
  const [accounts, setAccounts] = useState({
    fromAccount: accountsData[0],
    toAccount: accountsData[1],
  });
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleValueChange = ({ target: { value } }) => {
    setError('');

    // Prepend 0 if value is "."
    if (value === '.') {
      value = '0.';
    }
    if (value === '£') {
      value = '£0';
    }

    // Remove the £ symbol for processing
    let numericValueString = value.replace('£', '');

    // Remove leading zeros
    if (
      numericValueString.length > 1 &&
      numericValueString.startsWith('0') &&
      !numericValueString.startsWith('0.')
    ) {
      numericValueString = numericValueString.replace(/^0+/, '');
    }

    // regex to allow only numbers and two decimal points
    const regex = /^(\d+)?(\.\d{0,2})?$/;
    if (!regex.test(numericValueString)) {
      return;
    }

    // Check if value is too large
    const numericValue = parseFloat(numericValueString);
    if (numericValue > accounts.fromAccount.balance) {
      return;
    }

    // Set the amount with the £ symbol for display
    setAmount(value.startsWith('£') ? `£${numericValueString}` : `£${value}`);
  };

  const handlePrimaryButton = () => {
    // Remove the £ symbol for processing
    const numericValue = parseFloat(amount.replace('£', ''));
    if (
      isNaN(numericValue) ||
      numericValue <= 0 ||
      numericValue > accounts.fromAccount.balance
    ) {
      setError('Invalid amount');
      return;
    }
    navigate('/transfer-money');
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
            {amount && !isNaN(parseFloat(amount.replace('£', '')))
              ? `£${(accounts.fromAccount.balance - parseFloat(amount.replace('£', ''))).toFixed(2)}
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
            {amount && !isNaN(parseFloat(amount.replace('£', '')))
              ? `£${(accounts.toAccount.balance + parseFloat(amount.replace('£', ''))).toFixed(2)}
            after transfer`
              : `£${accounts.toAccount.balance}`}
          </Text>
        </TransferLocationContainer>
      </GroupContent>
      <Spacer />
      {error && (
        <span style={{ color: theme.colors.warning, fontSize: '14px' }}>
          {error}
        </span>
      )}
      <InputField label="Amount" value={amount} onChange={handleValueChange} />
      <ButtonPattern
        primaryLabel="Transfer"
        onPrimaryClick={handlePrimaryButton}
        secondaryLabel="Cancel"
        onSecondaryClick={() => navigate('/transfer-money')}
      />
    </PageLayout>
  );
};
