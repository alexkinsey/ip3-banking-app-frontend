// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Text } from '../Text/Text';

// Styles
import {
  Bar,
  BarAmount,
  BarLabel,
  ExpensesContainer,
} from './ExpensesBars.style';

export const ExpensesBars = ({ expenses }) => {
  // const total = expenses.reduce((sum, item) => sum + item.value, 0);
  const total = expenses.reduce((sum, item) => sum + Math.abs(item.value), 0);

  return (
    <ExpensesContainer>
      {expenses.map(({ label, value, color }) => {
        const positiveValue = Math.abs(value).toFixed(2);
        const percentage = total !== 0 ? (positiveValue / total) * 100 : 0;
        return (
          <BarLabel key={label}>
            <Text>{label}</Text>
            <BarAmount>
              <Bar $color={color} $percentage={percentage} />
              <Text size={2} weight="medium">
                £{positiveValue}
              </Text>
            </BarAmount>
          </BarLabel>
        );
      })}
    </ExpensesContainer>
  );
};

ExpensesBars.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};
