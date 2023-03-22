import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal');

const Modal = ({children, handleClick}) => {
    useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
            handleClick();
          }
        }
        function closeByClick(evt) {
          if(evt.target.id === 'overlay') {
            handleClick(); 
          }
        }

          document.addEventListener('keydown', closeByEscape);
          document.addEventListener('click', closeByClick);
          return () => {
            document.removeEventListener('click', closeByClick);
            document.removeEventListener('keydown', closeByEscape);
          }
      }, []) 

    return createPortal (
      <ModalOverlay>
        <div className={styles.modal}>
          <button type='button' className={styles.button} onClick={handleClick}>
                <CloseIcon type='primary' />
          </button>
            {children}
        </div>
      </ModalOverlay>,
        modalRoot
    );
};

Modal.propTypes = {
  handleClick: PropTypes.func
}

export default Modal;