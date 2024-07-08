import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ButtonPattern } from '../../components/ButtonPattern/ButtonPattern';
import { useNavigate } from 'react-router-dom';
import { Step1 } from './PaySomeone.Step1';
import { Step2 } from './PaySomeone.Step2';

export const PaySomeone = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    sortCode: '',
    accountNumber: '',
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

  const handleSubmit = () => {
    console.log('Form submitted with:', formData);
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
          formData={formData}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
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
