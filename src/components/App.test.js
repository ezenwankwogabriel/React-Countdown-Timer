import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('application renders correctly', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/countdown/i);
  expect(linkElement).toBeInTheDocument();
});