//! #3 => go hooks.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchAdd, fetchDelete, fetchPosts } from './thunkActions';
import type { PostSliceType } from '../types';

const initialState: PostSliceType = {
  posts: [],
  count: 0,
  isLoading: true,
};

const rtkSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    //! action.payload === return response.data
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, () => {
      console.log('no answer 505');
    });
    //! action.payload === return response.data
    builder.addCase(fetchAdd.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    //! action.payload === return id
    builder.addCase(fetchDelete.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
  },
});

export default rtkSlice.reducer;
export const { increment, decrement } = rtkSlice.actions;
