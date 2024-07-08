import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../components/Text/Text';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { TransferLocationContainer } from '../MoveMoney/MoveMoney.style';
import { Heading } from '../../components/Heading/Heading';
import { InputField } from '../../components/Input/InputField'; // Assuming you have this component
import { useAccounts } from '../../hooks/useAccounts';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { AcScContainer } from './Paysomeone.style';
import { FaPlus } from 'react-icons/fa6';
import { FaUser, FaUserCircle } from 'react-icons/fa';

export const Step2 = ({ formData, handleBack, handleSubmit }) => {
  const { accountsData } = useAccounts();
  const [account, setAccount] = useState(accountsData[0]);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Regex to allow only numbers and two decimal points
    const regex = /^(\d+)?(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setAmount(value);
      setError('');
    }
  };

  const validateAmount = () => {
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue) || numericValue <= 0) {
      setError('Invalid amount');
      return false;
    }
    if (numericValue > account.balance) {
      setError('Amount exceeds account balance');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateAmount()) {
      handleSubmit({ ...formData, amount });
    }
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
            £{account.balance.toFixed(2)}
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
            {amount ? (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FaPlus size={20} /> £{amount}
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
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
        error={error}
      />
    </>
  );
};

Step2.propTypes = {
  formData: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
