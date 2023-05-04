import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../../utils/types/types';

const modalRoot = document.getElementById('modal');

const Modal: FC<TModal> = ({ children, handleClick }) => {
  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        handleClick();
      }
    }
    function closeByClick(evt: MouseEvent) {
      const target = evt.target as Element
      if (target.id === 'overlay') {
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

  return createPortal(
    <ModalOverlay>
      <div className={styles.modal}>
        <button type='button' className={styles.button} onClick={handleClick} id='closeBtnModal'>
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot as HTMLDivElement
  );
};

export default Modal;