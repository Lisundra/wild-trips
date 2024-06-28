import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { InputsTypeAuth } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchCheckUser, fetchCreateUser } from '../../redux/thunkActions';
import type { RootState } from '../../redux/store';
import styles from './RegistrationForm.module.css';
import RegImageUploadButton from '../RegImageUploadButton/RegImageUploadButton';
import RegButton from '../RegButton/RegButton';
import { UploadOutlined } from '@ant-design/icons';

function RegistrationForm({setIsUser}) {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const[ registrationMessage, setRegistrationMessage ]= useState('')
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [err, setErr] = useState(false);

  const [formData, setFormData] = useState<InputsTypeAuth>({
    login: '',
    email: '',
    password:'',
    full_name:'',
    role:'',
    profile_picture:null,
    bio:'',
  });

  console.log('консоль формы', formData);

  useEffect(() => {

    if (isUserCreated) {    
        setRegistrationMessage('Регистрация прошла успешно!');
        console.log('User created successfully');
        fetchCheckUser()
        // Очистка сообщения через полторы секунды
        const timeoutId = setTimeout(() => {
          setRegistrationMessage('');
        }, 1500);
 
        // Очистка таймаута при размонтировании компонента или изменении зависимостей
        return () => clearTimeout(timeoutId);
      }if(err){
        setRegistrationMessage('Такой пользователь уже существует');
        console.error('Error creating user:');
        const timeoutId = setTimeout(() => {
          setRegistrationMessage('');
        }, 2500);
    
        // Очистка таймаута при размонтировании компонента или изменении зависимостей
        return () => clearTimeout(timeoutId);
       } 
  //      else{
  //       setRegistrationMessage('Такой пользователь уже существует');
  //       console.error('Error creating user:');
  //       const timeoutId = setTimeout(() => {
  //         setRegistrationMessage('');
  //       }, 2500);

  //       // Очистка таймаута при размонтировании компонента или изменении зависимостей
  //       return () => clearTimeout(timeoutId);
  //  }
   


  
  }, [user, isUserCreated,err]);
  // const handleChange = (e) => {
      // ? рабочая версия
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('1');
    if (name === 'profile_picture') {
      console.log('2');
      const file = files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg') && file.size <= 2 * 1024 * 1024) {
        console.log('3');
        setFormData({
          ...formData,
          [name]: file,
        });
      } else {
        console.log('4');
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
    console.log('мы здесь');
    dispatch(fetchCreateUser(formDataToSend)).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res)
      if(res.payload){
      setIsUserCreated(true);
      setIsUser(true)
      setErr(false)

      }else{
        setIsUserCreated(false);
        setErr(true)
        setIsUser(false)
      }

    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="role">Ваша роль:</label>
          <select
            style={{ backgroundColor: '#F2E8CF' }}
            className="shadow  border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role" 
            name="role"  
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="traveler">Путешественик</option>
            <option value="organizer">Организатор</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
            Электронная почта (email)
          </label>
          <input
            style={{ backgroundColor: '#F2E8CF' }}
            className="shadow border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="login">
            Логин
          </label>
          <input
            style={{ backgroundColor: '#F2E8CF' }}
            className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="login"
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="full_name">
            Полное имя
          </label>
          <input
            style={{ backgroundColor: '#F2E8CF' }}
            className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="full_name"
            type="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
            Пароль
          </label>
          <input 
            style={{ backgroundColor: '#F2E8CF' }}
            className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="bio">
            О себе
          </label>
          <input
            style={{ backgroundColor: '#F2E8CF' }}
            className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            type="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }} >

        <div className={styles.inputWrapper} >
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_picture">
            Фото профиля
          </label>
          <input
            className={styles.inputFile}
            id="profile_picture"
            type="file"
            name="profile_picture"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
          <label htmlFor="profile_picture" className={styles.inputFileButton}>
            <span className={styles.inputFileIconWrapper}>
              <UploadOutlined style={{ fontSize: '25px', color: '#fff' }} />
            </span>
            <span className={styles.inputFileButtonText}>Выберите файл</span>
          </label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <RegButton
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Зарегистрироваться
          </RegButton>
          <div className="text-sm text-gray-600" style={{ width: '230px', height: '50px', display: 'inline-block', visibility: registrationMessage ? 'visible' : 'hidden' }}>
            {registrationMessage}
          </div>
        </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;