import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ButtonPattern } from '../../components/ButtonPattern/ButtonPattern';
import { useNavigate } from 'react-router-dom';
import { Step1 } from './PaySomeone.Step1';
import { Step2 } from './PaySomeone.Step2';
import { useAccounts } from '../../hooks/useAccounts';

export const PaySomeone = () => {
  const navigate = useNavigate();
  const { accountsData } = useAccounts();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    sortCode: '',
    accountNumber: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error for the field being edited
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateStep1 = () => {
    let validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Name is required.';
    }

    if (!/^\d{2}-\d{2}-\d{2}$/.test(formData.sortCode)) {
      validationErrors.sortCode =
        'Invalid sort code. It should be in the format 12-34-56.';
    }

    if (!/^\d{8}$/.test(formData.accountNumber)) {
      validationErrors.accountNumber =
        'Invalid account number. It should be 8 digits.';
    }

    return validationErrors;
  };

  const validateStep2 = () => {
    let validationErrors = {};

    const amountString = formData.amount.replace('£', '');
    const amount = parseFloat(amountString);
    if (isNaN(amount) || amount <= 0) {
      validationErrors.amount = 'Invalid amount.';
    }

    // Assuming account balance is available in account object
    const accountBalance = accountsData[0].balance;
    if (amount > accountBalance) {
      validationErrors.amount = 'Amount exceeds account balance.';
    }

    return validationErrors;
  };

  const handleNext = () => {
    const validationErrors = validateStep1();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep2();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Assume you have an API call function `submitTransfer`
    // try {
    //   await submitTransfer(formData);
    //   navigate('/confirmation'); // Redirect to confirmation page
    // } catch (error) {
    //   console.error('Transfer failed:', error);
    //   setErrors({ api: 'Transfer failed. Please try again.' });
    // }
  };

  return (
    <PageLayout heading="Pay Someone">
      {step === 1 && (
        <Step1
          errors={errors}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {step === 2 && (
        <Step2
          errors={errors}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      <ButtonPattern
        primaryLabel={step === 1 ? 'Next' : 'Transfer'}
        onPrimaryClick={step === 1 ? handleNext : handleSubmit}
        secondaryLabel={step === 1 ? 'Cancel' : 'Back'}
        onSecondaryClick={
          step === 1 ? () => navigate('/transfer-money') : handleBack
        }
      />
    </PageLayout>
  );
};
