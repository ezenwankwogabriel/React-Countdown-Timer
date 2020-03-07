import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CountDownComponent from './index';

test('renders countdown react component', () => {
  const { getByText } = render(<CountDownComponent />);
  const linkElement = getByText(/countdown/i);
  expect(linkElement).toBeInTheDocument();
});

test('starts the countdown if a correct positive integer is passed', () => {
  const { getByText, getByLabelText } = render(<CountDownComponent />);

  fireEvent.change(getByLabelText(/countdown/i), {
    target: {value: 2},
  })
  const button = getByText(/start/);
  fireEvent.click(getByText('start'));
  expect(button).toHaveTextContent('stop')
})

test('not start the countdown if a correct negative integer is passed', () => {
  const { getByText, getByLabelText } = render(<CountDownComponent />);

  fireEvent.change(getByLabelText(/countdown/i), {
    target: {value: -1},
  })
  const button = getByText(/start/);
  fireEvent.click(button);
  expect(button).not.toHaveTextContent('stop')
})

test('stops the countdown when the pause button is clicked', async () => {
  const { getByText, getByLabelText, getByRole } = render(<CountDownComponent />);

  fireEvent.change(getByLabelText(/countdown/i), {
    target: {value: 2},
  })
  const button = getByText(/start/);
  fireEvent.click(button);
  const pause = getByRole(/stopCount/);
  fireEvent.click(pause);

  const stopped = getByRole('startCount');
  expect(stopped).toBeInTheDocument();
})