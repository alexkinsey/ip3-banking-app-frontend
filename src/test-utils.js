import React from 'react';
import { render } from '@testing-library/react';

// Custom hook testing utility
export const renderHookWithContext = (hook, { providerProps, context: Context }) => {
  let hookResult;

  const TestComponent = () => {
    hookResult = hook();
    return null;
  };

  render(
    <Context.Provider {...providerProps}>
      <TestComponent />
    </Context.Provider>
  );

  return hookResult;
};
