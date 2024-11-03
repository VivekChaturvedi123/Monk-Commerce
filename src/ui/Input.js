import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ value, onChange, placeholder, type = 'text' }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="custom-input"
        />
    );
};

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

export default Input;
