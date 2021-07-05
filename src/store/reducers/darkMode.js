import { TOGGLE_DARK_MODE, GET_DM_FROM_LOCALSTORAGE } from '../types';

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DM_FROM_LOCALSTORAGE:
      const darkMode = localStorage.getItem('dark_mode');
      if (darkMode !== null || darkMode !== undefined) {
        return darkMode === 'true' ? true : false;
      }
      break;
    case TOGGLE_DARK_MODE:
      localStorage.setItem('dark_mode', !state);
      return !state;
    default:
      return state;
  }
};

export default reducer;
