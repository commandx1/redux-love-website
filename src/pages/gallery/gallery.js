import { useEffect } from 'react';
import useHttpClient from 'hooks/useHttpClient';

import './gallery.scss';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import { LoaderHeart, Snackbar } from 'common';
import { Pagination } from '@material-ui/lab';
import GalleryModal from './gallery-modal';

const Gallery = () => {
  const [images, setImages] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: null,
  });
  const [selectedImage, setSelectedImage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const handleModalOpen = img => {
    setSelectedImage(img);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const deleteFromState = id => {
    setImages(images.filter(i => i._id !== id));
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + 'upload/' + pagination?.pageNumber
        );
        setImages(response.images);
        setPagination({
          pageNumber: response?.pageNumber,
          total: response?.total,
        });
      } catch (error) {}
    })();
  }, [sendRequest, pagination?.pageNumber]);

  return (
    <div className='gallery-container'>
      <Grid container spacing={2} id='test'>
        {!isLoading &&
          images &&
          images.map(i => (
            <Grid
              item
              xs={6}
              md={4}
              lg={3}
              key={i.id}
              className='thumbnails'
              onClick={() => handleModalOpen(i)}
            >
              <img
                src={process.env.REACT_APP_IMAGE_URL + i.imageUrl}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '100%',
                }}
              />
            </Grid>
          ))}

        <Snackbar open={error} onClose={clearError} text={error} />
        {isLoading && <LoaderHeart />}
      </Grid>
      <div style={{ flex: 1 }} />
      <Pagination
        count={pagination?.total ? Math.ceil(pagination.total / 8) : 1}
        page={parseInt(pagination?.pageNumber ?? 1)}
        onChange={(e, page) =>
          setPagination(prev => ({ ...prev, pageNumber: page }))
        }
        variant='outlined'
        color='primary'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 24,
        }}
      />
      <GalleryModal
        open={openModal}
        onClose={handleModalClose}
        img={selectedImage}
        deleteFromState={deleteFromState}
      />
    </div>
  );
};

export default Gallery;
