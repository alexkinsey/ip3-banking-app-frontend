import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { Form } from './Form';

describe('Form Component', () => {
  test('renders form with default styles', async () => {
    let container;
    await act(async () => {
      ({ container } = render(<Form />));
    });
    const formElement = container.firstChild;

    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveStyle('display: flex');
    expect(formElement).toHaveStyle('flex-direction: column');
    expect(formElement).toHaveStyle('gap: 16px');
    expect(formElement).toHaveStyle('margin: 0 auto');
    expect(formElement).toHaveStyle('width: 100%');
  });

  test('renders form with custom styles', async () => {
    let container;
    await act(async () => {
      ({ container } = render(
        <Form style={{ gap: '10px', width: '50%' }}>
          <input type="text" />
          <button>Submit</button>
        </Form>
      ));
    });
    const formElement = container.firstChild;

    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveStyle('gap: 10px');
    expect(formElement).toHaveStyle('width: 50%');
  });

  test('renders form without margin when specified', async () => {
    let container;
    await act(async () => {
      ({ container } = render(<Form style={{ margin: '0' }} />));
    });
    const formElement = container.firstChild;

    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveStyle('margin: 0');
  });

  test('handles asynchronous operation', async () => {
    await act(async () => {
    });

    let container;
    await act(async () => {
      ({ container } = render(<Form />));
    });
    const formElement = container.firstChild;

    expect(formElement).toBeInTheDocument();
  });
});
