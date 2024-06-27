/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import OneTour from './Pages/OneTour/OneTour';
import MyTours from './Pages/MyTours/MyTours';
import withAuth from './components/WithAuth/WithAuth';
import Catalog from './Pages/Catalog/Catalog';
import Footer from './components/Footer/Footer';
import Profile from './Pages/Profile/Profile';

const ProtectedMyTours = withAuth(MyTours);
 
function App(): JSX.Element {
  

  return (
    <div className="App-page">
      <Navbar />
      <div className='App-container'>
        <Routes>
          <Route index element={<Home />} />  
          <Route path="catalog" element={<Catalog />} />
          <Route path="MyTours" element={<ProtectedMyTours />} />
          <Route path="Profile" element={<Profile initialUser={undefined} />} />
          <Route path=":id" element={<OneTour />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer /> 
    </div>
  );
}

export default App;
