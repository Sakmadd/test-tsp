import { configureStore } from '@reduxjs/toolkit';
import isPreloadedReducer from './slices/preLoadedSlice';
import loggedUserReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    isPreloaded: isPreloadedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
