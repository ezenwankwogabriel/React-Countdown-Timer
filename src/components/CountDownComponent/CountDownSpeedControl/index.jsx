import React from 'react'
import ControlButton from './ControlButton'

const SpeedFlow = ({ handleClick }) => {
  const defaultTime = 1000;
  function calculateTime(ref) {
    return defaultTime / ref;
  }
  return (
  <div data-testid="app-control">
    <ControlButton onClick={() => handleClick(calculateTime(1))} value="1X" />
    <ControlButton onClick={() => handleClick(calculateTime(1.5))} value="1.5X" />
    <ControlButton onClick={() => handleClick(calculateTime(2))} value="2X" />
  </div> );
}
 
export default SpeedFlow;