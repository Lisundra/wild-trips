/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { InputsType, InputsTypeAuth, PostsType, PostType, UserType } from '../types';

export const fetchPosts = createAsyncThunk('posts/all', async () => {
  const response = await axios.get<PostsType>(
    `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/posts`,
  );
  return response.data;
});

export const fetchAdd = createAsyncThunk('posts/add', async (inputs: InputsType) => {
  const response = await axios.post<InputsType, AxiosResponse<PostType>>(
    `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/posts`,
    inputs,
  );
  return response.data;
});

export const fetchDelete = createAsyncThunk('posts/del', async (id: number) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/posts/${id}`,
  );
  if (response.status === 200) {
    return id;
  }
});


// export const fetchUsers= createAsyncThunk('posts/all', async () => { //!Сделать запрос всех пользователей если нужно
//   const response = await axios.get<PostsType>(
//     `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/posts`,
//   );
//   return response.data;
// });

export const fetchCreateUser = createAsyncThunk('users', async (inputs: InputsTypeAuth) => {
  const response = await axios.post<InputsTypeAuth, AxiosResponse<UserType>>(
    `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/users`,
    inputs,
  );
  return response.data;
});

export const fetchLoginUser = createAsyncThunk('users/login', async (inputs: InputsTypeAuth) => {
  const response = await axios.post<InputsTypeAuth, AxiosResponse<UserType>>(
    `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/users`,
    inputs,
  );
  return response.data;
});

export const fetchLogoutUser = createAsyncThunk('users', async (id: number) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/users`,

  );
  if (response.status === 200) {
    return id;
  }
});