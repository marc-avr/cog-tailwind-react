import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import withAuth from './withAuth';

const Dashboard = () => {
  const { user, error, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default withAuth(Dashboard);