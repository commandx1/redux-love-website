import React from 'react';
import './modal.scss';

const Modal = ({
  children,
  open,
  onClose,
  wrapperStyle,
  wrapperClass,
  containerClass,
}) => {
  const style = open
    ? { transform: 'translateY(0%)', pointerEvents: 'visible' }
    : { transform: 'translateY(-100%)', pointerEvents: 'none' };
  return (
    <>
      <div className='backdrop' style={style}></div>
      <div
        className={`modal-wrapper ${wrapperClass}`}
        onClick={onClose}
        style={wrapperStyle ?? style}
      >
        <div className={`modal-container ${containerClass}`}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
