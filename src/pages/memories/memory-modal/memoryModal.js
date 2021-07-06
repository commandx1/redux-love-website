import { Modal } from 'common';
import React from 'react';

const MemoryModal = ({ memory, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 500,
        }}
      >
        <h4 className='modal-title'>{memory?.title}</h4>
        <small>{memory?.update ?? memory?.date ?? '--'}</small>
      </div>
      <div
        className='modal-content'
        dangerouslySetInnerHTML={{ __html: memory?.content ?? 'İçerik yüklenemedi...' }}
      />
      <div className='modal-footer'>{memory?.username}</div>
    </Modal>
  );
};

export default MemoryModal;
