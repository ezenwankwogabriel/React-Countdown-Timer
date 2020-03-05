import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders countdown react component', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/countdown/i);
  expect(linkElement).toBeInTheDocument();
});

test('starts the countdown if a correct positive integer is passed', () => {
  const { getByText } = render(<App />);

  fireEvent.change(screen.getByLabelText(/countdown/i), {
    target: {value: 2},
  })
  const button = getByText(/start/);
  fireEvent.click(getByText('start'));
  expect(button).toHaveTextContent('stop')
})

test('not start the countdown if a correct negative integer is passed', () => {
  const { getByText } = render(<App />);

  fireEvent.change(screen.getByLabelText(/countdown/i), {
    target: {value: -1},
  })
  const button1 = getByText(/start/);
  fireEvent.click(getByText('start'));
  expect(button1).not.toHaveTextContent('stop')
})