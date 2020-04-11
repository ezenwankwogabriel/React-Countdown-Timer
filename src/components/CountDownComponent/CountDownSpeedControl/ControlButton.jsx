import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const ControlButton = ({ value = 1, setCountState }) => {
  // on click, don't do anything if it is not running; 
  // if running, clearInterval and set newInterval;
  // update timeSpeed of state;
  const onClick = () => {
    // if (!isRunning) return;
    setCountState({action: 'increment', speed: value})
    // clearSetInterval();
    // setInterval(value);
  };
  return (
    <button onClick={onClick} data-testid="app-control-button" className="btn btn-light control-button">{`${value}X`}</button>
  );
}
 
ControlButton.propTypes = {
  value: PropTypes.number.isRequired,
  // onClick: PropTypes.func.isRequired
};

export default ControlButton;