import React from 'react';
import styles from './HeaderLinks.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const HeaderLinks = ({ children, text, path }) => {

    const activeClassName = `${styles.link} ${styles.active} text text_type_main-default`
    const inactiveClassName = `${styles.link} text text_type_main-default text_color_inactive`

    return (
        <NavLink to={path}
            className={({ isActive }) =>
                isActive ? `${activeClassName}` : `${inactiveClassName}`
            }
        >
            <div className={styles.header__item}>
                {children}
                <p>{text}</p>
            </div>
        </NavLink>
    );
};

HeaderLinks.propTypes = {
    text: PropTypes.string.isRequired,
    textClass: PropTypes.string,
}

export default HeaderLinks;