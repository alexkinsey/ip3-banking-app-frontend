import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../components/Text/Text';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { TransferLocationContainer } from '../MoveMoney/MoveMoney.style';
import { Heading } from '../../components/Heading/Heading';
import { InputField } from '../../components/Input/InputField';
import { useAccounts } from '../../hooks/useAccounts';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { FaPlus } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { AcScContainer } from './PaySomeone.style';

export const Step2 = ({ errors, formData, handleInputChange }) => {
  const { accountsData } = useAccounts();
  const [account] = useState(accountsData[0]);

  const handleAmountChange = (e) => {
    let value = e.target.value;

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
    if (numericValue > account.balance) {
      return;
    }

    // Set the amount with the £ symbol for display
    handleInputChange({
      target: { name: 'amount', value: `£${numericValueString}` },
    });
  };

  return (
    <>
      <GroupContent>
        <Text weight="medium">From</Text>
        <TransferLocationContainer $from>
          <Heading color="white" size={2}>
            Current Account
          </Heading>
          <Text color="white" weight="medium">
            {formData.amount &&
            !isNaN(parseFloat(formData.amount.replace('£', '')))
              ? `£${(account.balance - parseFloat(formData.amount.replace('£', ''))).toFixed(2)}
            after transfer`
              : `£${account.balance}`}
          </Text>
        </TransferLocationContainer>
      </GroupContent>
      <GroupContent>
        <Text weight="medium">To</Text>
        <TransferLocationContainer>
          <Heading color="white" size={2}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '8px',
              }}
            >
              <FaUser size={32} />
              <Heading color="white" size={2}>
                {formData.name}
              </Heading>
            </div>
          </Heading>
          <Text color="white" weight="medium" size={2}>
            {formData.amount ? (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FaPlus size={20} /> {formData.amount}
              </div>
            ) : (
              `Amount to transfer`
            )}
          </Text>
        </TransferLocationContainer>
        <AcScContainer>
          <Text color="light" weight="medium" size={4}>
            SC {formData.sortCode}
          </Text>
          <Text color="light" weight="medium" size={4}>
            AC {formData.accountNumber}
          </Text>
        </AcScContainer>
      </GroupContent>
      <Spacer />
      <InputField
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
        error={errors.amount}
      />
    </>
  );
};

Step2.propTypes = {
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
