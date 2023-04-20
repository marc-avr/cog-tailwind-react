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
          <p>Name: {user.given_name} {user.family_name}</p>
          <p>Phone Number: {user.phone_number}</p>
          <p>NPI Number: {user.npi_number}</p>
          <p>NPI Data: {JSON.stringify(user.npi_data)}</p>
        </div>
      )}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default withAuth(Dashboard);