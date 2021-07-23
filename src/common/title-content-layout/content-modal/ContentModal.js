import { Button } from '@material-ui/core';
import { Delete, Photo } from '@material-ui/icons';
import { Modal, Snackbar, LoaderHeart } from 'common';
import Input from 'common/input';
import useHttpClient from 'hooks/useHttpClient';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './content-modal.scss';

const ContentModal = ({
  selectedData,
  open,
  onClose,
  dataType,
  deleteMemoryFromState,
  updateMemoryOnState,
  deleteImgFromMemory,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [memory, setMemory] = useState();
  const { auth } = useSelector(state => state);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const deleteMemory = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + 'memories/' + selectedData?._id,
        'DELETE'
      );
      onClose();
      setIsEditMode(false);
      deleteMemoryFromState(selectedData?._id);
    } catch (error) {}
  };
  useEffect(() => {
    setMemory({
      title: selectedData?.title ?? '',
      content: selectedData?.content ?? '',
    });
  }, [selectedData]);

  useEffect(() => {
    if (isEditMode && selectedData?.imageUrl)
      document.querySelector('#button').style.width =
        document.querySelector('#img').scrollWidth + 'px';
  }, [isEditMode, memory?.imageUrl]);

  const updateMemory = async () => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + 'memories/' + selectedData?._id,
        'PATCH',
        JSON.stringify({
          title: memory?.title,
          content: memory?.content,
        }),
        { 'Content-Type': 'application/json' }
      );
      onClose();
      setIsEditMode(false);
      updateMemoryOnState(response.memory);
    } catch (error) {}
  };

  const deleteImage = async () => {
    try {
      const res = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          'memories/image/' +
          selectedData?._id,
        'DELETE'
      );
      deleteImgFromMemory(selectedData?._id);
    } catch (error) {}
  };

  const fileChangeHandler = async e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMemory(prev => ({
          ...prev,
          imageUrl: reader.result,
          file: e?.target?.files?.[0],
        }));
      }
    };
    e?.target?.files?.[0]
      ? reader.readAsDataURL(e.target.files[0])
      : setMemory(prev => ({ ...prev, imageUrl: '', file: null }));

    try {
      const formData = new FormData();
      formData.append('image', e?.target?.files?.[0]);
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}memories/image/${selectedData._id}`,
        'PATCH',
        formData
      );
      updateMemoryOnState(res.memory);
    } catch (error) {}
  };

  switch (dataType) {
    case 'memories':
      return (
        <Modal
          open={open}
          onClose={() => {
            setIsEditMode(false);
            onClose();
          }}
        >
          {isEditMode ? (
            <div className='editable-memory'>
              {selectedData?.imageUrl || memory?.imageUrl ? (
                <>
                  <img
                    id='img'
                    src={
                      memory?.imageUrl ??
                      process.env.REACT_APP_IMAGE_URL + selectedData.imageUrl
                    }
                  />
                  <Button
                    id='button'
                    variant='contained'
                    startIcon={<Delete />}
                    style={{
                      margin: '0 auto .75rem',
                    }}
                    onClick={() =>
                      window.confirm('Resmi silmek istediğine emin misin?') &&
                      deleteImage()
                    }
                  >
                    Resmi Sil
                  </Button>
                </>
              ) : (
                <>
                  {' '}
                  <input
                    type='file'
                    onChange={fileChangeHandler}
                    style={{ display: 'none' }}
                  />
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<Photo />}
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                    style={{ margin: '1rem auto' }}
                  >
                    Resim Yükle
                  </Button>
                </>
              )}
              <Input
                label='Başlık'
                value={memory?.title}
                onChange={e =>
                  setMemory(prev => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                element='textarea'
                label='İçerik'
                value={memory?.content}
                onChange={e =>
                  setMemory(prev => ({ ...prev, title: e.target.value }))
                }
              />

              <div className='memory-modal-footer'>
                <div className='memory-modal-actions'>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={updateMemory}
                  >
                    Gönder
                  </Button>
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => setIsEditMode(false)}
                  >
                    Vazgeç
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 500,
                }}
              >
                <h4 className='modal-title'>{selectedData?.title}</h4>
                <small>
                  {selectedData?.update ?? selectedData?.date ?? '--'}
                </small>
              </div>
              <div
                className='modal-content'
                dangerouslySetInnerHTML={{
                  __html: selectedData?.content ?? 'İçerik yüklenemedi...',
                }}
              />
              {selectedData?.imageUrl && (
                <img
                  src={process.env.REACT_APP_IMAGE_URL + selectedData?.imageUrl}
                  alt={selectedData?.title}
                  width='250'
                />
              )}

              <div className='memory-modal-footer'>
                {auth.id === selectedData?.kullanici && (
                  <div className='memory-modal-actions'>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={() => setIsEditMode(true)}
                    >
                      Güncelle
                    </Button>
                    <Button
                      color='secondary'
                      variant='contained'
                      onClick={() =>
                        window.confirm(
                          selectedData?.title +
                            ' başlıklı anıyı silmek istediğinize emin misiniz?'
                        ) && deleteMemory()
                      }
                    >
                      Sil
                    </Button>
                  </div>
                )}
                <div style={{ flex: 1 }} />
                {selectedData?.username}
              </div>
            </>
          )}

          <Snackbar open={error} onClose={clearError} text={error} />
          {isLoading && <LoaderHeart />}
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
