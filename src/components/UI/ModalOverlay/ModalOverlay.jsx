import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({handleClick, children}) => {
    return (
        <div className={styles.overlay} onClick={handleClick} id='overlay'>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    handleClick: PropTypes.func
}

export default ModalOverlay;