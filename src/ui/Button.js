
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick, children, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled} className="custom-button">
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
};

export default Button; 
