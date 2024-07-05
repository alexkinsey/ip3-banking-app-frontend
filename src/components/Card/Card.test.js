import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect'; 

import { Card } from './Card';

const mockTheme = {
  colors: {
    white: '#ffffff',
  },
  shadows: {
    cardShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  },
};

describe('Card Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={mockTheme}>
        <Card>Test Card</Card>
      </ThemeProvider>
    );
    const cardElement = getByText('Test Card');

    expect(cardElement).toBeInTheDocument();
  });

  it('renders with row style if row prop is true', () => {
    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <Card row>Test Card</Card>
      </ThemeProvider>
    );
    const cardContainer = container.firstChild;

    expect(cardContainer).toHaveStyle('flex-direction: row;');
  });

  it('renders without row style if row prop is false or not provided', () => {
    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <Card>Test Card</Card>
      </ThemeProvider>
    );
    const cardContainer = container.firstChild;

    expect(cardContainer).not.toHaveStyle('flex-direction: row;');
  });
});
