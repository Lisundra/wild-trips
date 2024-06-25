import React, { useState } from 'react';
import { fetchDelete, fetchLogoutUser } from '../../redux/thunkActions';
import { useDispatch } from 'react-redux';

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className='justify-center flex flex-col'>
        <h3>Точно хотите выйти из системы?</h3>
          <button
            className="bg-blue-500 hover:bg-blue-700 mar text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
            type="submit"
          >
            Да
          </button>
      </form>
    </div>
  );
};

export default LoginForm;