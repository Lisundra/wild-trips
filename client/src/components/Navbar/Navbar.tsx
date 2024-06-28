/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from '@reduxjs/toolkit';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import LogoutWindow from '../LogoutWindow/LogoutWindow';
import type { RootState } from '../../redux/store';
import { fetchCheckUser } from '../../redux/thunkActions';

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isUserCreated, setIsUserCreated] = useState(false);    
    const preventScroll = (e) => {
        e.preventDefault();
      };

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const checkedUser= () => {
        dispatch(fetchCheckUser())
        console.log('Проверка пользователя');
      };
      
      const openModal = (type) => {
          setModalType(type);
          setIsModalOpen(true);
          setTimeout(() => setIsModalVisible(true), 10); // Небольшая задержка для начала анимации
      };
      
      const closeModal = () => {        
          setIsModalVisible(false);
          setTimeout(() => setIsModalOpen(false), 300);
      };
      useEffect(() => {
          // Dispatch the fetchCheckUser action when the component mounts
          dispatch(fetchCheckUser() as unknown as AnyAction);

        }, [dispatch]);

        useEffect(() => {

            if (user) {
                setIsUserLoading(false);
            }
        }, [user]);

        useEffect(() => {
            dispatch(fetchCheckUser()) 

            if (user) {
                setIsUserLoading(false);
            }
        }, [isUserCreated]);

        useEffect(() => {
        //   console.log(user);
      
          if (user?.message || user?.err) {
            setTimeout(() => closeModal(), 1500);
          }
      
          // Функция очистки (если нужно)
          return () => {
            clearTimeout(); // Очистка таймера, если компонент размонтируется до истечения времени
          };
        }, [user, closeModal]);

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {  //! overflow hidden свдигает контент, поэтому не подходит
        if (isModalOpen) {
            document.addEventListener('wheel', preventScroll, { passive: false });
            document.addEventListener('touchmove', preventScroll, { passive: false });
        } else {
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
        }

        return()=>{
            document.body.style.overflow = '';
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
        }

    }, [isModalOpen]);

    return (
        <>
            <nav className="bg-custom-accent w-full fixed top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between h-16">
                    <div className="flex items-center"> {/* Добавленный общий контейнер */}
                            <img style={{ width: 70, height: 70, marginRight: 15 }} src="/src/assets/icons/logo.png" alt="logo" />
                            <Link to="/" style={{ fontFamily: 'ExcentraPro-Bold', fontSize: '30px', paddingTop: '10px', marginLeft: '-5px' }} className="ml-2 text-white font-bold text-lg"> {/* Добавленный отступ */}
                                Wild Tours
                            </Link>
                        </div>
                        <div className="flex space-x-9">
                            <button>
                                <Link to="/catalog" style={{ fontFamily: 'ExcentraPro-Bold', fontSize: '30px', paddingTop: '10px', marginLeft: '-5px' }} className="text-white">
                                    Каталог туров
                                </Link>
                            </button>
                            {(!user || isUserLoading ) && (
                                <>
                                    <button onClick={() => openModal('registration')} style={{ fontFamily: 'ExcentraPro-Bold', fontSize: '30px', paddingTop: '10px', marginLeft: '-5px' }} className="text-white">
                                        Регистрация
                                    </button>
                                    <button onClick={() => openModal('login')} className="text-white">
                                        Вход
                                    </button>
                                </>
                            )}
                            {(user && !isUserLoading)&& (
                                <>
                                    <button className="text-white" onClick={checkedUser}>
                                        <Link to="/MyTours" style={{ fontFamily: 'ExcentraPro-Bold', fontSize: '30px', paddingTop: '10px', marginLeft: '-5px' }} className="text-white">                                    
                                            {
                                            user.role==='organizer'?
                                            `Личный кабинет организатора`
                                            :
                                            user.role==='admin'?
                                            `Личный кабинет администратора`
                                            :
                                            `Личный кабинет`
                                            }                                       
                                                                               
                                        </Link>
                                    </button>
                                    <button className="text-white">
                                        <Link to="/profile" className="text-white">
                                            {}
                                        </Link>
                                    </button>
                                    <Link to="/profile" className="text-white m-0"> 
                                        <button className="flex items-center" style={{ fontFamily: 'ExcentraPro-Bold', fontSize: '30px', marginLeft: '-5px' }}>
                                            <div className='m-3'>{user.login}</div>
                                            <img src={user.src?user.src.replace(/\\/g, '/').replace(/^.*?src\//, 'src/'):'src/assets/avatars/ava.png'} 
                                            alt="Avatar" 
                                            className="w-8 h-8 rounded-full"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'src/assets/avatars/ava.png';
                                              }}
                                             />
                                        </button>
                                    </Link>
                                    <button onClick={() => openModal('logout')} className="text-white" style={{ fontFamily: 'ExcentraPro-Bold', fontSize: '30px', marginLeft: '10px' }}>
                                        Выход
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {isModalOpen && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleOutsideClick}>
                    <div className={`bg-white w-1/3 p-6 rounded-lg shadow-lg relative transition-transform duration-300 ${isModalVisible ? 'translate-y-0' : '-translate-y-10'}`} style={{top:'50px', right: '-550px'}}>
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">{modalType === 'registration' ? 'Регистрация' : modalType === 'logout' ? 'Выход' : 'Вход'}</h2>
                        {modalType === 'registration' ? (
                            <RegistrationForm setIsUser={setIsUserCreated} />
                        ) : (
                            modalType === 'login' ? (
                                <LoginForm />
                            ) : (
                                <LogoutWindow closeModal={closeModal} />
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;


