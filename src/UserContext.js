import React, { createContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [autoSignup, setAutoSignup] = useState(null);
  const navigate = useNavigate();

  const signIn = async (username, password) => {
    try {
      const cognitoUser = await Auth.signIn(username, password);
      const userInfo = {
        email: cognitoUser.attributes.email,
        username: cognitoUser.username,
      };
      setUser(userInfo);
      navigate('/dashboard');
      setError(null);
    } catch (error) {
      console.log('error signing in', error);
      setError(error.message);
    }
  };

  const signUp = async (username, password, email) => {
    let temp = username;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setAutoSignup({ username: username, password: password })
      navigate(`/verify/${temp}`);
      setError(null);
    } catch (error) {
      console.log('error signing up', error);
      setError(error.message);
    }
  };

  const verify = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
      try {
        await signIn(autoSignup.username, autoSignup.password);
        navigate('/dashboard');
      }catch(error){
        setError(error.message);
        console.log('error signing in', error);
      }
      setError(null);
    } catch (error) {
      console.log('error verifying account', error);
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log('error signing out', error);
    }
  };

  const resendConfirmationCode = async username => {
    try {
      await Auth.resendSignUp(username);
      setError(null);
    } catch (error) {
      console.log('error resending confirmation code', error);
      setError(error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, error, autoSignup, signIn, signUp, verify, logout, resendConfirmationCode }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;