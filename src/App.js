import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModeFromLocalStorage } from './store/actions/darkMode';
import { login } from 'store/actions/auth';
import Routes from './pages/Routes';
import './App.scss';

function App() {
  const { darkMode } = useSelector(state => state);
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(getModeFromLocalStorage());
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser?.isLoggedIn) {
      localUser?.isLoggedIn && dispatch(login({ user: localUser }));
    } else sessionUser?.isLoggedIn && dispatch(login({ user: sessionUser }));
  }, [dispatch]);

  return (
    <div className={darkMode ? 'dark app' : 'app'}>
      <Routes />
    </div>
  );
}

export default App;
