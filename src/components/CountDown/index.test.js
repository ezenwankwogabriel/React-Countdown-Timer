import React from 'react';
import { render } from '@testing-library/react';
import CountDown from './';

test('renders the countdown component renders correctly', async() => {
  const props = { minute: '00', seconds: '00', onPauseClick: jest.fn() }
  const { getByTestId } = render(<CountDown {...props} />)
  const countDown = getByTestId('app-countdown');
  
  expect(countDown).toBeTruthy()
})

