import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ButtonPattern } from '../../components/ButtonPattern/ButtonPattern';
import { useNavigate } from 'react-router-dom';
import { Step1 } from './PaySomeone.Step1';
import { Step2 } from './PaySomeone.Step2';
import { useAccounts } from '../../hooks/useAccounts';
import { createPayment } from '../../api/payments';
import { useAuthUser } from '../../hooks/useAuthUser';
import { TransferSuccess } from '../TransferSuccess/TransferSuccess';

export const PaySomeone = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthUser();
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
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
    try {
      await createPayment(
        accessToken,
        accountsData[0]._id,
        formData.amount.replace('£', ''), // Ensure the amount is parsed correctly
        formData.accountNumber
      );
      setStep(3);
    } catch (error) {
      console.error('Transfer failed:', error);
      setErrors({
        api: 'It looks like those details are incorrect. Check them and try again.',
      });
    }
  };

  return (
    <>
      {step < 3 ? (
        <PageLayout heading="Pay Someone" hasBottomButton>
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
      ) : (
        <TransferSuccess formData={formData} />
      )}
    </>
  );
};
