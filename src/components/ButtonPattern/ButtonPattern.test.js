// ButtonPattern.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { ThemeProvider } from 'styled-components';

// Define a mock theme object
const theme = {
  colors: {
    primary: '#244981', 
  },
  fonts: {
    weights: {
      medium: 500, 
    },
  },
};

import { ButtonPattern } from './ButtonPattern';

describe('ButtonPattern Component', () => {
  it('renders with default labels correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ButtonPattern />
      </ThemeProvider>
    );
    const secondaryButton = getByText('Secondary Button');
    const primaryButton = getByText('Primary Button');

    expect(secondaryButton).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
  });

  it('renders with provided labels correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ButtonPattern
          secondaryLabel="Custom Secondary Label"
          primaryLabel="Custom Primary Label"
        />
      </ThemeProvider>
    );
    const secondaryButton = getByText('Custom Secondary Label');
    const primaryButton = getByText('Custom Primary Label');

    expect(secondaryButton).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
  });

  it('calls onSecondaryClick when secondary button is clicked', () => {
    const mockOnSecondaryClick = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ButtonPattern onSecondaryClick={mockOnSecondaryClick} />
      </ThemeProvider>
    );
    const secondaryButton = getByText('Secondary Button');

    fireEvent.click(secondaryButton);

    expect(mockOnSecondaryClick).toHaveBeenCalledTimes(1);
  });

  it('calls onPrimaryClick when primary button is clicked', () => {
    const mockOnPrimaryClick = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ButtonPattern onPrimaryClick={mockOnPrimaryClick} />
      </ThemeProvider>
    );
    const primaryButton = getByText('Primary Button');

    fireEvent.click(primaryButton);

    expect(mockOnPrimaryClick).toHaveBeenCalledTimes(1);
  });
});
