import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../../components/Input/InputField';
import { Text } from '../../components/Text/Text';
import { Spacer } from '../../components/ContentLayout/Spacer';

export const Step1 = ({ errors, formData, handleInputChange }) => {
  const handleSortCodeChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (value.length > 6) {
      value = value.slice(0, 6); // Limit to 6 digits
    }

    // Automatically add hyphens
    if (value.length > 2) {
      value = `${value.slice(0, 2)}-${value.slice(2)}`;
    }
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }

    handleInputChange({ target: { name: 'sortCode', value } });
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8); // Only allow digits and limit to 8 characters
    handleInputChange({ target: { name: 'accountNumber', value } });
  };

  return (
    <>
      <Text>
        If you were contacted by email, message, or social media to make this
        payment, then video call or phone the person on a number you trust - not
        one they’ve just given.
      </Text>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        placeholder="Enter the payee's name"
      />
      <InputField
        label="Sort code"
        name="sortCode"
        value={formData.sortCode}
        onChange={handleSortCodeChange}
        error={errors.sortCode}
        placeholder="12-34-56"
      />
      <InputField
        label="Account number"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleAccountNumberChange}
        error={errors.accountNumber}
        placeholder="12345678"
      />
      <Spacer />
    </>
  );
};

Step1.propTypes = {
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
