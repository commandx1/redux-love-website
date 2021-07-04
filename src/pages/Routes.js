import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import { Home, Login, Memories } from 'pages';
import AppNavigation from 'components/app-navigation';

const Router = () => {
  const { auth } = useSelector(state => state);
  return (
    <>
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
    </>
  );
};

export default Router;
