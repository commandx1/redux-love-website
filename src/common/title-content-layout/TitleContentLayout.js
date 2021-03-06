import { useState, useEffect } from 'react';
import useHttpClient from 'hooks/useHttpClient';

import { Grid, Paper } from '@material-ui/core';
import { Snackbar, LoaderHeart } from 'common';
import ContentModal from './content-modal';

import './title-content-layout.scss';
import AddingForm from './adding-form';

const TitleContentLayout = ({ dataType }) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [isAddingFormVisible, setIsAddingFormVisible] = useState(false);
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [addButtonHeight, setAddButtonHeight] = useState();

  const deleteMemoryFromState = id =>
    setData(prev => prev.filter(d => d._id !== id));

  const addMemoryToState = newMemory => setData(prev => [newMemory, ...prev]);

  useEffect(() => {
    if (!isAddingFormVisible) {
      const buttonHeight = document.querySelector('.new-memory')?.scrollHeight;
      setAddButtonHeight(buttonHeight);
    }
  }, [isAddingFormVisible]);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + dataType // memories,poems...
        );
        setData(response?.[dataType]);
      } catch (error) {}
    })();
  }, [sendRequest]);

  const selectData = id => {
    setSelectedData(data.find(d => d.id === id));
    setOpenModal(true);
  };

  const removeSelectedData = () => {
    setSelectedData(null);
    setOpenModal(false);
  };

  const updateMemoryOnState = updatedMemory => {
    setData(prev =>
      prev.map(p => (p._id === updatedMemory._id ? updatedMemory : p))
    );
    setSelectedData(prev => ({ ...prev, imageUrl: updatedMemory?.imageUrl }));
  };

  const deleteImgFromMemory = id => {
    setData(prev =>
      prev.map(p => (p._id === id ? { ...p, imageUrl: null } : p))
    );
    setSelectedData(prev => ({ ...prev, imageUrl: null }));
  };

  const cancelForm = () => setIsAddingFormVisible(false);

  return (
    <>
      {!isLoading && data && (
        <Grid container spacing={3} style={{ paddingBottom: 12 }}>
          {isAddingFormVisible ? (
            <div style={{ padding: 12, width: '100%' }}>
              <AddingForm
                onCancel={cancelForm}
                addMemoryToState={addMemoryToState}
                setIsAddingFormVisible={setIsAddingFormVisible}
                addButtonHeight={addButtonHeight}
              />
            </div>
          ) : (
            <Grid
              className='content-titles'
              style={{ marginLeft: 'auto' }}
              item
              xs={12}
              md={6}
              lg={4}
            >
              <Paper
                className='paper new-memory'
                onClick={() => setIsAddingFormVisible(true)}
              >
                <h3>Yeni Ekle</h3>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}

      <Grid container spacing={3}>
        {data?.map(d => (
          <Grid
            className='content-titles'
            onClick={() => selectData(d.id)}
            item
            xs={12}
            md={6}
            lg={4}
            key={d._id}
          >
            <Paper className='paper'>
              <h4>{d.title}</h4>
            </Paper>
          </Grid>
        ))}
        <ContentModal
          selectedData={selectedData}
          open={openModal}
          onClose={removeSelectedData}
          dataType={dataType}
          deleteMemoryFromState={deleteMemoryFromState}
          updateMemoryOnState={updateMemoryOnState}
          deleteImgFromMemory={deleteImgFromMemory}
        />
        <Snackbar open={error} onClose={clearError} text={error} />
        {isLoading && <LoaderHeart />}
      </Grid>
    </>
  );
};

export default TitleContentLayout;
