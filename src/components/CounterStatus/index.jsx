import React from 'react'
import PropTypes from 'prop-types';
import './styles.scss';

const Status = ({ status }) => {
  return (
    <div data-testid="app-status" className="count-down-status">{status}</div>
   );
}
 
Status.propTypes = {
  status: PropTypes.string.isRequired
}

export default Status;