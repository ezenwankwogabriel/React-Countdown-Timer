import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const ControlButton = ({ value, onClick }) => {
  return ( 
    <button onClick={onClick} data-testid="app-control-button" className="btn btn-light control-button">{value}</button>
  );
}
 
ControlButton.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ControlButton;