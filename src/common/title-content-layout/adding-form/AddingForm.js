import { Button, IconButton } from '@material-ui/core';
import { Photo } from '@material-ui/icons';
import { Snackbar } from 'common';
import Input from 'common/input';
import LoaderHeart from 'common/loader-heart';
import useHttpClient from 'hooks/useHttpClient';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './AddingForm.scss';

const initialNewMemory = {
  title: '',
  content: '',
  imageUrl: '',
  file: null,
};

const initialStyle = { marginTop: -250, opacity: 0 };

const AddingForm = ({ onCancel, addMemoryToState, addButtonHeight }) => {
  const { auth } = useSelector(state => state);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [newMemory, setNewMemory] = useState(initialNewMemory);
  const [style, setStyle] = useState(initialStyle);
  const [formHeight, setFormHeight] = useState();

  const inputChangeHandler = e => {
    setNewMemory(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addNewMemory = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', newMemory.file);
      formData.append('username', auth.name);
      formData.append('kullanici', auth.id);
      formData.append('content', newMemory.content);
      formData.append('title', newMemory.title);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + 'memories',
        'POST',
        formData
      );
      setNewMemory(initialNewMemory);
      onCancel();
      addMemoryToState(responseData.memory);
    } catch (err) {}
  };

  const fileChangeHandler = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewMemory(prev => ({
          ...prev,
          imageUrl: reader.result,
          file: e?.target?.files?.[0],
        }));
      }
    };
    e?.target?.files?.[0]
      ? reader.readAsDataURL(e.target.files[0])
      : setNewMemory(prev => ({ ...prev, imageUrl: '', file: null }));
  };

  useEffect(() => {
    const formScrollHeight =
      document.querySelector('.add-new-form').scrollHeight;
    setFormHeight(formScrollHeight);
    setStyle({ marginTop: 0, opacity: 1 });
  }, []);
  return (
    <form className='add-new-form' onSubmit={addNewMemory} style={style}>
      <h4>Yeni An??</h4>
      <input type='file' onChange={fileChangeHandler} />
      <Button
        color='primary'
        variant='contained'
        startIcon={<Photo />}
        onClick={() => document.querySelector('input[type="file"]').click()}
        style={{ marginBottom: '1rem' }}
      >
        Resim Y??kle
      </Button>
      {newMemory.imageUrl && <img src={newMemory.imageUrl} />}
      <Input
        type='text'
        label='Ba??l??k'
        name='title'
        value={newMemory.title}
        onChange={inputChangeHandler}
      />
      <br />
      <Input
        element='textarea'
        label='????erik'
        name='content'
        value={newMemory.content}
        onChange={inputChangeHandler}
      />
      <div className='btn-group'>
        <Button type='submit' color='primary' variant='contained'>
          G??nder
        </Button>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => {
            setStyle({
              ...initialStyle,
              marginTop: -(formHeight - addButtonHeight) + 'px',
            });
            setTimeout(onCancel, 700);
          }}
        >
          ??ptal
        </Button>
      </div>
      <Snackbar open={error} onClose={clearError} text={error} />
      {isLoading && <LoaderHeart />}
    </form>
  );
};

export default AddingForm;
