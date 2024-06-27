import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { fetchCheckUser } from '../../redux/thunkActions';

const withAuth = (Component) => {
  const AuthCheck = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
      const checkUser = async () => {
        await dispatch(fetchCheckUser());
        setIsLoading(false);
      };

      checkUser();
    }, [dispatch]);
    useEffect(() => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, [user]);
    
    if (isLoading) {
      return <div className='mt-52 ml-20'>Loading...</div>; // или другой компонент загрузки
    }

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }


    // console.log("🚀 ~ AuthCheck ~ isAuthenticated:", isAuthenticated)
    const userRole = user?.role || null 
    // console.log("🚀 ~ AuthCheck ~ userRole:", userRole)

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

     if (userRole === 'admin' || userRole === 'organizer') {
      return <Component {...props} />;
     } else {
      if(userRole === 'traveler')
      return <Navigate to="/profile" />;
      else
      return <Navigate to="/" />;
     }
     };  

  return AuthCheck;
};

export default withAuth;