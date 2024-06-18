import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-custom-accent w-full fixed top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/" className="flex items-center text-white font-bold text-lg">
              Wild Trail
            </Link>
          </div>
          <div className="flex space-x-7">
            <Link to="/catalog" className="text-white">
              Каталог туров
            </Link>
            <Link to="/tour-selection" className="text-white">
              Подбор тура
            </Link>
            <Link to="/registration" className="text-white">
              Регистрация
            </Link>
            <Link to="/login" className="text-white">
              Вход
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;