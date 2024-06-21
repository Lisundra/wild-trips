import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { fetchCheckUser } from '../../redux/thunkActions';

const withAuth = (Component) => {
  const AuthCheck = (props) => {
    let user = useSelector((state: RootState) => state.user.user);
    fetchCheckUser()

    const isAuthenticated = user?true:false 
    // console.log("🚀 ~ AuthCheck ~ isAuthenticated:", isAuthenticated)
    const userRole = user?.role || null 
    // console.log("🚀 ~ AuthCheck ~ userRole:", userRole)

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    if(userRole==='admin'){
        return <Component {...props}/>;     
     }else
    if(userRole==='traveler'){
        return <Component {...props}/>;     
     }else
    if (userRole === 'organizer') {
        return <Component {...props}/>
    }else  return <Navigate to="/" />;

    // return <Component {...props} />;
  };

  return AuthCheck;
};

export default withAuth;