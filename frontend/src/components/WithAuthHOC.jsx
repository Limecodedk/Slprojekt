import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const userToken = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
      if (!userToken) {
        navigate('/login');
      }
    }, [userToken, navigate]);

    if (userToken) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
