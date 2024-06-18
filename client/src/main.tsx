//! #2 => go postSlice.ts

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux'; //! Provider для обертки App в store
import { BrowserRouter } from 'react-router-dom';

import App from './App';
// import './index.css';
// import '../output.css';
import { store } from './redux/store'; //! сам store

//! Оборачиваем App
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <BrowserRouter>
        {/* <ChakraProvider> */}
          <App />
        {/* </ChakraProvider> */}
      </BrowserRouter>
  </Provider>
);
