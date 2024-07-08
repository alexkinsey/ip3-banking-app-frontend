import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../components/Text/Text';

export const ReviewForm = ({ formData, handleBack, handleSubmit }) => {
  return (
    <div>
      <Text>Review your details</Text>
      <Text>Name: {formData.name}</Text>
      <Text>Sort Code: {formData.sortCode}</Text>
      <Text>Account Number: {formData.accountNumber}</Text>
    </div>
  );
};

ReviewForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
