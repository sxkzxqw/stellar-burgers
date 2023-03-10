import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({children, handleClick}) => {
    useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
            handleClick();
          }
        }
          document.addEventListener('keydown', closeByEscape);
          return () => {
            document.removeEventListener('keydown', closeByEscape);
          }
    
      }, []) 
    return (
        <div className={styles.modal}>
            {children}
        </div>
    );
};

export default Modal;