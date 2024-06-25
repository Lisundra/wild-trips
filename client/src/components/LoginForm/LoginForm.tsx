import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckUser, fetchLoginUser } from '../../redux/thunkActions';
import { RootState } from '../../redux/store';

const LoginForm = () => {
  const dispatch = useDispatch();
  const[ loginMessage, setLoginMessage ]= useState('')
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const user = useSelector((state: RootState) => state.user.user);
  const timeoutId = useRef(null);

  useEffect(() => {
    dispatch(fetchCheckUser());

    if (user?.message) {
      setLoginMessage(user?.message);
      timeoutId.current = setTimeout(() => {
        setLoginMessage('');
      }, 2500);
    }

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [user, dispatch]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
   void dispatch(fetchLoginUser(formData))


   console.log('Login data:', formData);

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
            Login
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="login"
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <div className="text-sm m-4 text-gray-600" style={{ minHeight: '40px',minWidth:'60px', visibility: loginMessage ? 'visible' : 'hidden' }}>
            {loginMessage}</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;