import React from 'react';
import './modal.scss';

const Modal = ({ children, open, onClose }) => {
  const style = open
    ? { transform: 'translateY(0%)', pointerEvents: 'visible' }
    : { transform: 'translateY(-100%)', pointerEvents: 'none' };
  return (
    <>
      <div className='backdrop' style={style}></div>
      <div className='modal-wrapper' onClick={onClose} style={style}>
        <div className='modal-container'>{children}</div>
      </div>
    </>
  );
};

export default Modal;
