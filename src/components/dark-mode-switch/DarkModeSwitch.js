import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from 'store/actions/darkMode';
import './darkModeSwitch.scss';

const DarkModeSwitch = () => {
  const { darkMode } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(toggleDarkMode())}
      className={darkMode ? 'darkModeSwitch' : 'darkModeSwitch active'}
    >
      <div className={darkMode ? 'slider' : 'slider active'}></div>
      <div className={darkMode ? 'delik' : 'delik active'}></div>
    </div>
  );
};

export default DarkModeSwitch;
