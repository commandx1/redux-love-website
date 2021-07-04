import { useState, useEffect } from 'react';
import useHttpClient from 'hooks/useHttpClient';

import { Grid, Paper } from '@material-ui/core';
import { Modal, Snackbar, LoaderHeart } from 'common';

import './memories.scss';

const Memories = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [memories, setMemories] = useState();
  const [selectedMemory, setSelectedMemory] = useState();

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
      <Modal
        open={selectedMemory}
        title={selectedMemory?.title}
        content={selectedMemory?.content}
        onClose={() => setSelectedMemory(null)}
        footer={selectedMemory?.username}
      />
      <Snackbar open={error} onClose={clearError} text={error} />
      {isLoading && <LoaderHeart />}
    </Grid>
  );
};

export default Memories;
