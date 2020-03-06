import React from 'react';
import PropTypes from 'prop-types';

const CountDown = ({ value, buttonText, onChange, onClick, isRunning }) => {
  return (
    <form className="form-inline" onSubmit={e => { e.preventDefault(); } }>
      <div className="form-group font-weight-bold" data-testid="app-countdown-input">
        <label htmlFor="countdown-input">CountDown :</label>
        <input className="form-control m-3" id="countdown-input" type="number" value={value} onChange={onChange}/>
        <button onClick={onClick} className={"btn " + (isRunning ? "btn-danger " : "btn-success ") + "text-uppercase "} type="button">{ buttonText }</button>
      </div>
    </form>
  );
}

CountDown.propTypes = {
  value: PropTypes.number,
  buttonText: PropTypes.string,
  onChange: PropTypes.func,
  isRunning: PropTypes.bool
}

CountDown.defaultProps = {
  value: 0,
  buttonText: 'start',
  onChange: () => {},
  isRunning: false
}
 
export default CountDown;