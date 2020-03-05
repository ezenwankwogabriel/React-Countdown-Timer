import React from 'react';
import { render, within } from '@testing-library/react';
import FlowControl from './';
import ControlButton from './ControlButton';

test('renders the control button correctly', () => {
  const value = 'none'
  const { getByTestId } = render(<ControlButton value={value} onClick={() => {}} />)
  const controlButton = getByTestId('app-control-button');
  expect(controlButton).toBeTruthy();
})

test('renders the speed control component correctly', () => {
  const { getByTestId } = render(<FlowControl />);
  const display = getByTestId('app-control');
  const controlsWithin = within(display).getAllByTestId('app-control-button')  

  expect(display).toBeTruthy();
  expect(controlsWithin.length).toBe(3);
})
