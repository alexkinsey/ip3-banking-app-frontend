import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 

import { Spacer } from './Spacer';

describe('Spacer Component', () => {
  it('renders without errors', () => {
    render(<Spacer />);
  });

  it('has the correct style applied', () => {
    const { container } = render(<Spacer />);
    const spacerElement = container.firstChild;

    expect(spacerElement).toHaveStyle('flex-grow: 1;');
  });
});
