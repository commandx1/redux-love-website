import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useHttpClient from 'hooks/useHttpClient';

import {
  Button,
  TextField,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import { login } from 'store/actions/auth';
import Snackbar from 'common/snackbar';

import './login.scss';

const GreenCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})(props => <Checkbox color='default' {...props} />);

const Login = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [user, setUser] = useState({
    username: {
      value: '',
      valid: true,
      isTouched: false,
    },
    password: {
      value: '',
      valid: true,
      isTouched: false,
    },
    isRemember: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    let updatedUser = { ...user };
    switch (name) {
      case 'password':
        if (value.length < 6) {
          updatedUser.password.valid = false;
        } else updatedUser.password.valid = true;
        break;
      case 'username':
        if (value.length === 0) {
          updatedUser.username.valid = false;
        } else updatedUser.username.valid = true;
        break;
      default:
        break;
    }

    updatedUser = { ...user, [name]: { ...user[name], value } };
    setUser(updatedUser);
  };

  const handleValidation = () => {
    let userClone = { ...user };
    let formValid = true;
    if (user.username.value.length === 0) {
      userClone.username.valid = false;
      formValid = false;
    }
    if (user.password.value.length < 6) {
      userClone.password.valid = false;
      formValid = false;
    }
    setUser(userClone);
    return formValid;
  };

  const submitForm = async e => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + 'users/login',
          'POST',
          JSON.stringify({
            username: user.username.value,
            password: user.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        dispatch(login({ ...responseData, isRemember: user.isRemember }));
        history.push('/');
      } catch (err) {}
    }
  };

  const onFocus = e => {
    const name = e.target.name;
    let updatedUser = { ...user, [name]: { ...user[name], isTouched: true } };
    setUser(updatedUser);
  };

  return (
    <div className='login-container'>
      <div className='login-content'>
        <form onSubmit={submitForm}>
          <Snackbar
            open={error}
            onClose={clearError}
            text='Hatalı giriş yaptınız. Lütfen tekrar deneyiniz.'
          />
          <TextField
            autoComplete='off'
            type='text'
            label='Kullancı Adı'
            name='username'
            value={user.username.value}
            onChange={handleInputChange}
            error={!user.username.valid}
            helperText={
              user.username.valid ? '' : 'Kullanıcı adı boş bırakılamaz.'
            }
          />
          <TextField
            autoComplete='off'
            type='password'
            label='Şifre'
            name='password'
            onFocus={onFocus}
            value={user.password.value}
            onChange={handleInputChange}
            error={!user.password.valid}
            helperText={
              user.password.valid ? '' : 'Şifre en az 6 haneli olmalıdır.'
            }
          />
          <FormControlLabel
            control={<GreenCheckbox name='checkedG' />}
            label='Beni Hatırla'
            style={{ zIndex: 2, color: blue[300] }}
            value={user.isRemember}
            onChange={() =>
              setUser(prev => ({ ...prev, isRemember: !prev.isRemember }))
            }
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={{ pointerEvents: isLoading ? 'none' : 'visible' }}
          >
            {isLoading ? (
              <CircularProgress
                size={24}
                style={{
                  color: '#fff',
                }}
              />
            ) : (
              'Giriş Yap'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
