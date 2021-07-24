import { Button, Snackbar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import useHttpClient from 'hooks/useHttpClient';
import { useState } from 'react';
import './modal.scss';

const GalleryModal = ({ open, onClose, img, deleteFromState }) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: '',
  });
  const deleteImage = async () => {
    if (window.confirm('Fotoğrafı silmek istediğine emin misin?')) {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + 'upload/' + img._id,
          'DELETE'
        );
        setSnackbar({
          isVisible: true,
          message: response?.message?.content ?? 'Silindiğinden emin değilim !',
        });
        deleteFromState(img._id);
        setTimeout(onClose, 5000);
      } catch (err) {}
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };
  return (
    <>
      {open && <div className='backdrop'></div>}
      <div
        className='img-box'
        style={
          open
            ? { opacity: 1, pointerEvents: 'visible' }
            : { opacity: 0, pointerEvents: 'none' }
        }
        onClick={e => {
          e.target.classList.contains('img-box') && onClose();
        }}
      >
        <Button
          className='deleteBtn'
          startIcon={<Delete />}
          variant='contained'
          onClick={deleteImage}
        >
          Fotoğrafı Sil
        </Button>
        <img src={process.env.REACT_APP_IMAGE_URL + img?.imageUrl} />
        <Snackbar
          open={snackbar.isVisible}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity='success'>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default GalleryModal;
