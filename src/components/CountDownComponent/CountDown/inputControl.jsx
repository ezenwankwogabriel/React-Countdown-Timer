import React from 'react';
import PropTypes from 'prop-types';

const CountDown = ({ setCountState, value, started }) => {

    const handleInputChange = (event) => {
        const value = event.target.value;
        setCountState({value: Number(value)});
    }
    
    const handleStopButtonClick = () => {
        if (value <= 0 || value >>> 0 !== parseFloat(value)) return;
        if (started) {
            setCountState({value: 0, started: false, action: 'reset'});
        } else {
            setCountState({started: true, action: 'start'});
        }
    };
    
    return (
        <form className="form-inline" onSubmit={e => { e.preventDefault(); } }>
        <div className="form-group font-weight-bold" data-testid="app-countdown-input">
            <label htmlFor="countdown-input">CountDown :</label>
            <input className="form-control m-3" id="countdown-input" type="number" value={value} onChange={handleInputChange}/>
            <button onClick={handleStopButtonClick} className={"btn " + (started ? "btn-danger " : "btn-success ") + "text-uppercase "} type="button">{ started ? 'stop' : 'start' }</button>
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