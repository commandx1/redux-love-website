import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import darkModeReducer from './reducers/darkMode';
import authReducer from './reducers/auth';

const middlewares = [];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
 
  middlewares.push(logger);
}

const reducers = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer,
});

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);