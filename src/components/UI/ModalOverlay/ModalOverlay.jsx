import React from 'react';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({handleClick}) => {
    return (
        <div className={styles.overlay} onClick={handleClick}>
            
        </div>
    );
};

export default ModalOverlay;