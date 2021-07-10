import { Modal } from 'common';
import React from 'react';

const ContentModal = ({ selectedData, open, onClose, dataType }) => {
  switch (dataType) {
    case 'memories':
      return (
        <Modal open={open} onClose={onClose}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 500,
            }}
          >
            <h4 className='modal-title'>{selectedData?.title}</h4>
            <small>{selectedData?.update ?? selectedData?.date ?? '--'}</small>
          </div>
          <div
            className='modal-content'
            dangerouslySetInnerHTML={{
              __html: selectedData?.content ?? 'İçerik yüklenemedi...',
            }}
          />
          <div className='modal-footer'>{selectedData?.username}</div>
        </Modal>
      );

    case 'poems':
      return (
        <Modal
          wrapperStyle={
            open ? { transform: 'scale(1)' } : { transform: 'scale(0)' }
          }
          open={open}
          onClose={onClose}
        >
          <h3>{selectedData?.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: selectedData?.content,
            }}
          />
        </Modal>
      );
    default:
      break;
  }
};

export default ContentModal;
