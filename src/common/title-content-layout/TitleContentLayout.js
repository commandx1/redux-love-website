import { useState, useEffect } from 'react';
import useHttpClient from 'hooks/useHttpClient';

import { Grid, Paper } from '@material-ui/core';
import { Snackbar, LoaderHeart } from 'common';
import ContentModal from './content-modal';

import './title-content-layout.scss';

const TitleContentLayout = ({ dataType }) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <Grid container spacing={3}>
      {data?.map(d => (
        <Grid
          className='content-titles'
          onClick={() => selectData(d.id)}
          item
          xs={12}
          md={6}
          lg={4}
          key={d.id}
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
      />
      <Snackbar open={error} onClose={clearError} text={error} />
      {isLoading && <LoaderHeart />}
    </Grid>
  );
};

export default TitleContentLayout;
