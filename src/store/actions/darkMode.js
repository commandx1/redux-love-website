import { TOGGLE_DARK_MODE, GET_DM_FROM_LOCALSTORAGE } from '../types';

export const toggleDarkMode = () => {
  return {
    type: TOGGLE_DARK_MODE,
  };
};

export const getModeFromLocalStorage = () => {
  return {
    type: GET_DM_FROM_LOCALSTORAGE,
  };
};
