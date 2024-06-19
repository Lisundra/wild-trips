import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, UsersType, UserSliceType } from '../types';
import { fetchCheckUser, fetchCreateUser, fetchLoginUser, fetchLogoutUser } from './thunkActions';

const initialState: UserSliceType = {
  count: 0,
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.count += 1;
      })
      .addCase(fetchCreateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.isLoading = false;
        // Assuming the login action returns the logged-in user
        // You might want to handle this differently depending on your app's logic
        state.user = action.payload;

      })
      .addCase(fetchLoginUser.rejected, (state) => {
        state.isLoading = false;
        
      })
      // .addCase(fetchLogoutUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(fetchLogoutUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.isLoading = true;
      })
      .addCase(fetchCheckUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;