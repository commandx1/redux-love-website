import { useState, useEffect } from 'react';
import useHttpClient from 'hooks/useHttpClient';

import { Grid, Paper } from '@material-ui/core';
import { Modal, Snackbar, LoaderHeart } from 'common';

import './memories.scss';
import MemoryModal from './memory-modal';

const Memories = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [memories, setMemories] = useState();
  const [selectedMemory, setSelectedMemory] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}memories`
        );
        setMemories(response.memories);
      } catch (error) {}
    })();
  }, [sendRequest]);

  const selectMemory = id => {
    setSelectedMemory(memories.find(m => m.id === id));
    setOpenModal(true);
  };

  const removeSelectedMemory = () => {
    setSelectedMemory(null);
    setOpenModal(false);
  };

  return (
    <Grid container spacing={3}>
      {memories?.map(m => (
        <Grid
          className='memory-titles'
          onClick={() => selectMemory(m.id)}
          item
          xs={12}
          md={6}
          lg={4}
          key={m.id}
        >
          <Paper className='paper'>
            <h4>{m.title}</h4>
          </Paper>
        </Grid>
      ))}
      <MemoryModal
        memory={selectedMemory}
        open={openModal}
        onClose={removeSelectedMemory}
      />
      <Snackbar open={error} onClose={clearError} text={error} />
      {isLoading && <LoaderHeart />}
    </Grid>
  );
};

export default Memories;
