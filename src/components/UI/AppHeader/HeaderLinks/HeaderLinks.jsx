import React from 'react';
import styles from './HeaderLinks.module.css';
import PropTypes from 'prop-types';

const HeaderLinks = ({ children, text, textClass, value, handleClick, active, ...props }) => {
    return (
        <div className={styles.header__item} {...props} onClick={() => { handleClick(value) }}>
            {children}
            <p className={!active ? 'text text_type_main-default text_color_inactive' : 'text text_type_main-default'}>{text}</p>
        </div>
    );
};

HeaderLinks.propTypes = {
    text: PropTypes.string.isRequired,
    textClass: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    active: PropTypes.bool
}

export default HeaderLinks;