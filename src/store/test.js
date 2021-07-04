import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import crossBrowserListener from './storeListener';

import cartReducer from './slicers/cart';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], //Things u want to persist
};
const reducers = combineReducers({
  cart: cartReducer,
});
let middlewares = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
window.addEventListener('storage', crossBrowserListener(store, persistConfig));

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
