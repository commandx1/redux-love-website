import { LOGIN, LOGOUT } from '../types';

const initialState = {
  isLoggedIn: false,
  name: '',
  id: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const record = {
        isLoggedIn: true,
        name: action.payload?.user?.name,
        id: action.payload?.user?.id,
      };
      sessionStorage.setItem('user', JSON.stringify(record));
      if (action.payload.isRemember) {
        localStorage.setItem('user', JSON.stringify(record));
      }
      return {
        ...record,
      };
    case LOGOUT:
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
