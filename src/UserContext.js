import React, { createContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const getUser = () => {
    const userString = localStorage.getItem('user');
    console.log('userString', userString);
    if (userString) {
      const userInfo = JSON.parse(userString);
      console.log('userInfo', userInfo);
      return userInfo;
    } else {
      return null;
    }
  };
  
  const [user, setUser] = useState(getUser());
  const [error, setError] = useState(null);
  const [autoSignup, setAutoSignup] = useState(null);
  const navigate = useNavigate();

  const signIn = async (username, password) => {
    try {
      const cognitoUser = await Auth.signIn(username, password);
      console.log('ATTRIBUTES: ',cognitoUser.attributes)
      const userInfo = {
        email: cognitoUser.attributes.email,
        username: cognitoUser.username,
        given_name: cognitoUser.attributes.given_name,
        family_name: cognitoUser.attributes.family_name,
        phone_number: cognitoUser.attributes.phone_number,
        npi_number: cognitoUser.attributes['custom:npi_number'],
        npi_data: JSON.parse(cognitoUser.attributes['custom:npi_data']),
      };
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      navigate('/dashboard');
      setError(null);
    } catch (error) {
      console.log('error signing in', error);
      setError(error.message);
      if (error.message === 'User is not confirmed.'){

        setAutoSignup({ username: username, password: password })
        navigate(`/verify/${username}`);
      }
      
    }
  };

  const signUp = async (username, password, email, firstName, lastName, phoneNumber, npi_number, npiObj_string) => {
    let temp = username;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
          phone_number: phoneNumber,
          'custom:npi_number': npi_number,
          'custom:npi_data': npiObj_string,
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
      localStorage.removeItem('user'); 
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