import { Suspense, lazy } from 'react';

import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { LoaderHeart } from 'common';

import AppNavigation from 'components/app-navigation';

const Home = lazy(() => import('./home'));
const Login = lazy(() => import('./login'));
const Memories = lazy(() => import('./memories'));

const Router = () => {
  const { auth, darkMode } = useSelector(state => state);
  return (
    <Suspense
      fallback={
        <div>
          <LoaderHeart />
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
              <Redirect to='/' exact />
            </Switch>
          </AppNavigation>
        ) : (
          <Switch>
            <Route path='/' exact>
              <Login />
            </Route>
            <Redirect to='/' exact />
          </Switch>
        )}
      </div>
    </Suspense>
  );
};

export default Router;
