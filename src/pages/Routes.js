import { Suspense, lazy } from 'react';

import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import { LinearProgress } from '@material-ui/core';

import AppNavigation from 'components/app-navigation';

const Home = lazy(() => import('./home'));
const Login = lazy(() => import('./login'));
const Memories = lazy(() => import('./memories'));
const Poems = lazy(() => import('./poems'));
const Gallery = lazy(() => import('./gallery'));

const Router = () => {
  const { auth, darkMode } = useSelector(state => state);
  return (
    <Suspense
      fallback={
        <div>
          <LinearProgress color='secondary' />
        </div>
      }
    >
      <div className={darkMode ? 'dark' : ''}>
        {auth.isLoggedIn ? (
          <AppNavigation>
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/anilar'>
                <Memories />
              </Route>
              <Route path='/siirler'>
                <Poems />
              </Route>
              <Route path='/galeri'>
                <Gallery />
              </Route>
            </Switch>
          </AppNavigation>
        ) : (
          <Switch>
            <Route path='/' exact>
              <Login />
            </Route>
          </Switch>
        )}
      </div>
    </Suspense>
  );
};

export default Router;
