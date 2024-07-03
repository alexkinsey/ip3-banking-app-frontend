import React from 'react';
import { render } from '@testing-library/react';
import { PaySomeone } from './PaySomeone'; 

describe('PaySomeone Component', () => {
  it('renders without crashing', () => {
    render(<PaySomeone />);
  });

  it('displays correct text', () => {
    const { getByText } = render(<PaySomeone />);
    expect(getByText('PaySomeone')).toBeInTheDocument();
  });
});
