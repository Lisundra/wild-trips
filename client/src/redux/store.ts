//! #1 => go main.tsx

import { configureStore } from '@reduxjs/toolkit';
//! import ваших слайсов
import postSlice from './postSlice';

const storeOptions = {
  reducer: {
    postSlice, //! слайс под сущность
    // userSlice, //! слайс под сущность
    // someSlice, //! слайс под сущность
    // basketSlice, //! слайс под сущность
    // postSlice, //! слайс под сущность
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
