import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, IconButton, Link } from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';

import DarkModeSwitch from 'components/dark-mode-switch';
import Footer from 'components/footer';

import './navigation.scss';
import { logout } from 'store/actions/auth';

const AppNavigation = props => {
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const showNavigation = () => setShowNav(true);
  const closeNavigation = () => setShowNav(false);

  return (
    <>
      <div className={'navigation-container' + (showNav ? ' show-nav' : '')}>
        <div className='circle-container'>
          <div className='circle'>
            <IconButton className='close' onClick={closeNavigation}>
              <Close />
            </IconButton>
            <IconButton onClick={showNavigation}>
              <Menu />
            </IconButton>
          </div>
        </div>
        <div className='content'>
          <Container fixed className='content-container'>
            {' '}
            {props.children}
          </Container>
          <div style={{ flex: 1 }}></div>
          <Footer />
        </div>
      </div>
      <nav className='nav'>
        <ul>
          <a>
            <DarkModeSwitch />
          </a>
          <NavLink to='/' exact>
            Anasayfa
          </NavLink>
          <NavLink to='/hakkimizda' exact>
            Hakkımızda
          </NavLink>
          <NavLink to='/anilar' exact>
            Anılar
          </NavLink>
          <NavLink to='/siirler' exact>
            Şiirler
          </NavLink>
          <Link onClick={() => dispatch(logout())}>Çıkış Yap</Link>
        </ul>
      </nav>
    </>
  );
};

export default AppNavigation;
