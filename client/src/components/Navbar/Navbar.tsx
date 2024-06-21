import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import LogoutWindow from '../LogoutWindow/LogoutWindow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCheckUser } from '../../redux/thunkActions';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    let user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    
    useEffect(() => {

        console.log(user);
        
        
        if (user?.message) {
            setTimeout(() => closeModal(), 1500);
        }
        if (user?.err) {
            // Handle error if needed
        }else setTimeout(() => closeModal(), 1500);

    }, [user]);

    useEffect(() => {
        // Dispatch the fetchCheckUser action when the component mounts
        dispatch(fetchCheckUser() as unknown as AnyAction);
    }, [dispatch]);

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
        setTimeout(() => setIsModalVisible(true), 10); // Небольшая задержка для начала анимации
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden'); // Предотвращает прокрутку заднего фона
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isModalOpen]);

    return (
        <>
            <nav className="bg-custom-accent w-full fixed top-0 z-10">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between h-16">
                        <div>
                            <Link to="/" className="flex items-center text-white font-bold text-lg">
                                Wild Trail
                            </Link>
                        </div>
                        <div className="flex space-x-9">
                            <button>
                                <Link to="/catalog" className="text-white">
                                    Каталог туров
                                </Link>
                            </button>
                            <button>
                                <Link to="/tour-selection" className="text-white">
                                    Подбор тура
                                </Link>
                            </button>
                            {(!user ) && (
                                <>
                                    <button onClick={() => openModal('registration')} className="text-white">
                                        Регистрация
                                    </button>
                                    <button onClick={() => openModal('login')} className="text-white">
                                        Вход
                                    </button>
                                </>
                            )}
                            {(user) && (
                                <>
                                    <button className="text-white">
                                        <Link to="/MyTours" className="text-white">
                                            Мои туры
                                        </Link>
                                    </button>
                                    <button className="text-white">
                                        <Link to="/profile" className="text-white">
                                            {}
                                        </Link>
                                    </button>
                                    <Link to="/profile" className="text-white m-0">
                                        <button className="flex items-center">
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
                                    <button onClick={() => openModal('logout')} className="text-white">
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
                    <div className={`bg-white w-1/3 p-6 rounded-lg shadow-lg relative transition-transform duration-300 ${isModalVisible ? 'translate-y-0' : '-translate-y-10'}`}>
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">{modalType === 'registration' ? 'Регистрация' : modalType === 'logout' ? 'Выход' : 'Вход'}</h2>
                        {modalType === 'registration' ? (
                            <RegistrationForm />
                        ) : (
                            modalType === 'login' ? (
                                <LoginForm />
                            ) : (
                                <LogoutWindow />
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;


