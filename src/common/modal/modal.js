import React from 'react';
import './modal.scss';

const Modal = ({ title, content, footer, open, onClose }) => {
  const style = open
    ? { transform: 'translateY(0%)', pointerEvents: 'visible' }
    : { transform: 'translateY(-100%)', pointerEvents: 'none' };
  return (
    <>
      <div className='backdrop' style={style}></div>
      <div className='modal-wrapper' onClick={onClose} style={style}>
        <div className='modal-container'>
          <h4 className='modal-title'>{title}</h4>
          <div
            className='modal-content'
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className='modal-footer'>{footer}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
