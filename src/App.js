import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getModeFromLocalStorage } from './store/actions/darkMode';
import { login } from 'store/actions/auth';
import Routes from './pages/Routes';
import './App.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModeFromLocalStorage());
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser?.isLoggedIn) {
      localUser?.isLoggedIn && dispatch(login({ user: localUser }));
    } else sessionUser?.isLoggedIn && dispatch(login({ user: sessionUser }));
  }, []);

  return (
    <div className='app'>
      <Routes />
    </div>
  );
}

export default App;
