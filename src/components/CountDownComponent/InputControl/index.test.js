import React from 'react';
import { render } from '@testing-library/react';
import CountDownInput from './';

test('renders the countdown input correctly', async() => {
  const props = { value: 2, buttonText: 'start', onChange: jest.fn(), onClick: jest.fn() }
  const { getByTestId } = render(<CountDownInput {...props} />)
  const countDownInput = getByTestId('app-countdown-input');
  
  expect(countDownInput).toBeTruthy()
})

