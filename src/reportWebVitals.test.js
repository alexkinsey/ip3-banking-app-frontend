import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'; 
import { App } from './App';

describe('Index', () => {
  let container;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up on exiting
    document.body.removeChild(container);
    container = null;
  });

  it('renders the App component correctly', () => {
    // Mock ReactDOM.createRoot to return a mock root
    const createRootMock = jest.spyOn(ReactDOM, 'createRoot').mockReturnValue({
      render: jest.fn(),
      unmount: jest.fn(),
    });

    // Render the component inside an act() callback
    act(() => {
      ReactDOM.createRoot(container).render(<App />);
    });

    // Assert createRoot was called with the container
    expect(createRootMock).toHaveBeenCalledWith(container);

    // Assert the root render function was called with <App />
    expect(createRootMock().render).toHaveBeenCalledWith(<App />);

    // Snapshot test on container innerHTML
    expect(container.innerHTML).toMatchSnapshot();
  });
});
