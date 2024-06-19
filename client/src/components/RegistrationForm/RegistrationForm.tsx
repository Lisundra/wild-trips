import React, { useEffect, useState } from 'react';
import { InputsTypeAuth } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchCreateUser } from '../../redux/thunkActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const[ registrationMessage, setRegistrationMessage ]= useState('')

  const [formData, setFormData] = useState<InputsTypeAuth>({
    login: '',
    email: '',
    password:'',
    full_name:'',
    role:'',
    profile_picture:null,
    bio:'',
  });
  useEffect(() => {
    console.log(user);
    if (user?.message) {
      setRegistrationMessage('Регистрация прошла успешно!')
      console.log('User created successfully');

    // Очистка сообщения через полторы секунды
      const timeoutId = setTimeout(() => {
        setRegistrationMessage('');
      }, 1500);
  
      // Очистка таймаута при размонтировании компонента или изменении зависимостей
      return () => clearTimeout(timeoutId);
    }
  }, [user]);

  // const handleChange = (e) => {
      //? рабочая версия
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      const file = files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg') && file.size <= 2 * 1024 * 1024) {
        setFormData({
          ...formData,
          [name]: file,
        });
      } else {
        alert('Please upload a valid PNG or JPG image less than 2MB.');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.role !== 'traveler' && formData.role !== 'admin' && formData.role !== 'organizer') {
      formData.role = 'traveler';
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('login', formData.login);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('full_name', formData.full_name);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('bio', formData.bio);
    if (formData.profile_picture) {
      formDataToSend.append('profile_picture', formData.profile_picture);
    }
  
    void dispatch(fetchCreateUser(formDataToSend));
    if (!user) {
      console.log(user);
      
      setRegistrationMessage('Такой пользователь уже существует')
      console.error('Error creating user:');
      const timeoutId = setTimeout(() => {
        setRegistrationMessage('');
      }, 2500);
  
      // Очистка таймаута при размонтировании компонента или изменении зависимостей
      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
      <label htmlFor="role">Ваша роль:</label>
        <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="role" 
        name="role"  
        value={formData.role}
        onChange={handleChange}
        required>
            <option value="traveler">Путешественик</option>
            <option value="organizer">Организатор</option>
            <option value="admin">Admin</option>
        </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Электронная почта (email)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
            Логин
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
          Полное имя
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="full_name"
            type="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Пароль
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
          О себе
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            type="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_picture">
            Фото профиля
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profile_picture"
            type="file"
            name="profile_picture"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <div className="text-sm m-4 text-gray-600" style={{ minHeight: '40px', visibility: registrationMessage ? 'visible' : 'hidden' }}>
            {registrationMessage}</div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;