
import React from 'react';
import PropTypes from 'prop-types';
import './select.css';

const Select = ({ options, value, onChange }) => {
    const safeOptions = Array.isArray(options) ? options : [];

    return (
        <select value={value} onChange={onChange} className="custom-select">
            {safeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;
