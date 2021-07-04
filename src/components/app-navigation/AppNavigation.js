import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Container, IconButton } from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';

import DarkModeSwitch from 'components/dark-mode-switch';
import Footer from 'components/footer';

import './navigation.scss';

const AppNavigation = props => {
  const [showNav, setShowNav] = useState(false);

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
          <Container className="content-container"> {props.children}</Container>
          <div style={{ flex: 1 }}></div>
          <Footer />
        </div>
      </div>
      <nav className='nav'>
        <ul>
          <DarkModeSwitch />
          <NavLink to='/' exact>
            Anasayfa
          </NavLink>
          <NavLink to='/hakkimizda' exact>
            Hakkımızda
          </NavLink>
          <NavLink to='/anilar' exact>
            Anılar
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default AppNavigation;
