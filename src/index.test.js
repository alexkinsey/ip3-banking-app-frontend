import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils'; 
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Mock the createRoot function of ReactDOM for testing purposes
jest.mock('react-dom/client', () => {
  const originalModule = jest.requireActual('react-dom/client');
  return {
    ...originalModule,
    createRoot: jest.fn(),
  };
});

describe('Index', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders the App component correctly', () => {
    const mockRoot = {
      render: jest.fn(),
      unmount: jest.fn(),
    };
    ReactDOM.createRoot.mockReturnValueOnce(mockRoot);

    act(() => {
      render(<App />, container);
    });

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(container);

    expect(mockRoot.render).toHaveBeenCalledWith(<App />);

    // Cleanup: Unmount the component
    act(() => {
      mockRoot.unmount();
    });
    expect(mockRoot.unmount).toHaveBeenCalled();
  });
});
