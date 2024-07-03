import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { GroupContent } from './GroupContent';

describe('GroupContent Component', () => {
  it('renders without errors', () => {
    render(<GroupContent />);
  });

  it('has the correct style applied', () => {
    const { container } = render(<GroupContent />);
    const groupContentElement = container.firstChild;

    expect(groupContentElement).toHaveStyle(`
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    `);
  });
});
