import React from 'react';
import { render } from '@testing-library/react';
import CounterStatus from './';

test('renders the counter status correctly', () => {
  const status="started"
  const { getByTestId } = render(<CounterStatus status={status} />)
  const controlButton = getByTestId('app-status');
  
  expect(controlButton).toBeTruthy();
  expect(controlButton.textContent).toBe(status)
})

