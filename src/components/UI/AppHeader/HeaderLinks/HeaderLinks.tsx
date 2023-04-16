import React, { FC } from 'react';
import styles from './HeaderLinks.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { THeaderLinks } from '../../../../utils/types/types';

const HeaderLinks: FC<THeaderLinks> = ({ children, text, path }) => {

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

export default HeaderLinks;