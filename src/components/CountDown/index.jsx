import React from 'react';
import PropTypes from 'prop-types';
import { FaRegPauseCircle, FaRegPlayCircle } from 'react-icons/fa';
import './styles.scss'

const CountDown = ({minute, seconds, onPauseClick, countDownColor, shouldBlink, isRunning}) => {
  return ( 
    <div data-testid="app-countdown">
      <p className="countdown-content" >
        <span className={shouldBlink ? 'blinking': ''} style = {{ color: countDownColor }}> {minute}:{seconds} </span>  
        <span className="countdown-icon">
          {isRunning ? <FaRegPauseCircle onClick={onPauseClick} /> : <FaRegPlayCircle onClick={onPauseClick} />}
        </span>
      </p>
    </div>
  );
}
 
CountDown.propTypes = {
  minute: PropTypes.string,
  seconds: PropTypes.string,
  countDownColor: PropTypes.string,
  shouldBlink: PropTypes.bool,
}
export default CountDown;