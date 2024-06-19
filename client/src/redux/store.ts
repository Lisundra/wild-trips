//! #1 => go main.tsx

import { configureStore } from '@reduxjs/toolkit';
//! import ваших слайсов
import postSlice from './postSlice';
import userSlice from './userSlice';

const storeOptions = {
  reducer: {
    post: postSlice, //! слайс под сущность
    user: userSlice, //! слайс под сущность
    // someSlice, //! слайс под сущность
    // basketSlice, //! слайс под сущность
    // postSlice, //! слайс под сущность
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
