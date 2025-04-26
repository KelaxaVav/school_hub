
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import loadingReducer from './features/loadingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
