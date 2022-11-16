import React from 'react';
import {
  fireEvent, render, screen, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app.jsx';

afterEach(() => {
  cleanup();
});

it('lets say hello', () => {
  render(<App />);
  expect(screen.getByTestId('wrapper')).toBeInTheDocument();
});
