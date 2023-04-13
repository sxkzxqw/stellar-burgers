import React, { FC } from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
import { TModalOverlay } from '../../../utils/types/types';

const ModalOverlay: FC<TModalOverlay> = ({ handleClick, children }) => {
    return (
        <div className={styles.overlay} onClick={handleClick} id='overlay'>
            {children}
        </div>
    );
};

export default ModalOverlay;