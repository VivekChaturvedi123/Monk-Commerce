import React from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';

const Dialog = ({ title, onClose, children, footer }) => {
    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                    <h2 className="dialog-title">{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">{children}</div>
                {footer && <div className="dialog-footer">{footer}</div>}
            </div>
        </div>
    );
};

Dialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
};

export default Dialog;
