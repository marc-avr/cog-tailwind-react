import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const WithAuth = () => {
    const { user } = useContext(UserContext);

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent />;
  };

  return WithAuth;
};

export default withAuth;