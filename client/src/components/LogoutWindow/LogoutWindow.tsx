import React, { useState } from 'react';
import { fetchDelete, fetchLogoutUser } from '../../redux/thunkActions';
import { useDispatch } from 'react-redux';
import RegButton from '../RegButton/RegButton';

const LoginForm = ({closeModal}) => {
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    dispatch(fetchLogoutUser());
    closeModal()
    console.log('LOGOUT');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <h3 style={{ marginBottom: '20px' }}>Вы точно хотите выйти из системы?</h3>
          <RegButton
            className="bg-blue-500 hover:bg-blue-700 mar text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
            type="submit"
          >
            Да
          </RegButton>
      </form>
    </div>
  );
};

export default LoginForm;