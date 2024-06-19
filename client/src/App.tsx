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
// import { fetchPosts } from './redux/thunkActions';
// import { PostsType } from './types';

//* useDispatch - дает команде диспетчеру
//* useSelector - выбирать состояние
//! useAppSelector
//! useAppDispatch

function App(): JSX.Element {
  const posts = useAppSelector((store) => store.postSlice.posts);
  const count = useAppSelector((store) => store.postSlice.count);
  const isLoading = useAppSelector((store) => store.postSlice.isLoading);
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
    <>
       <div className="App-page">
       <Navbar />

      <div className='App-container'>
    <Routes>
    {/* <Route index element={<Home />} />   */}

      //? Старый код перенесён в маршрут, чтобы тестить функции редакса. Потом будет удалён
    <Route path='olderVersionCode'  
       element={
              <>
                  <div className="main">
        <Button onClick={() => dispatch(decrement())} size="xs">
          -
        </Button>
        <Center borderRadius="12px" w="40px" h="40px" bg="second">
          <Box as="span" fontWeight="bold" fontSize="lg">
            {count}
          </Box>
        </Center>
        <Button onClick={incrementHandler} size="xs">
          +
        </Button>
      </div>

      <Form />

      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
              </>
    }>

            </Route>
      </Routes>
      </div>

      </div>
    </>
  );
}

export default App;
