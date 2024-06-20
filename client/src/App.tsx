/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//! npm i @reduxjs/toolkit
//! npm i react-redux

import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Box, Button, Center } from '@chakra-ui/react';
import Form from './components/Form/Form';
import Post from './components/Post/Post';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { decrement, increment } from './redux/postSlice';
import { fetchPosts } from './redux/thunkActions';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import OneTour from './Pages/OneTour/OneTour';
// import { fetchPosts } from './redux/thunkActions';
// import { PostsType } from './types';

//* useDispatch - дает команде диспетчеру
//* useSelector - выбирать состояние
//! useAppSelector
//! useAppDispatch

function App(): JSX.Element {
  const posts = useAppSelector((store) => store.post.posts);
  const count = useAppSelector((store) => store.post.count);
  const isLoading = useAppSelector((store) => store.post.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchPosts());
  }, []);

  const incrementHandler = (): void => {
    dispatch(increment());
  };

  // const decrementHandler = (): void => {
  //   dispatch(decrement());
  // };

  return (
    <div className="App-page">
      <Navbar />
      <div className='App-container'>
        <Routes>
          <Route index element={<Home />} />  
          <Route path="tours/:id" element={<OneTour />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
