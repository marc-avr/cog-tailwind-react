import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { TextField } from '@mui/material';


const SignUp = () => {
  const { signUp, error } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState('');
  
  const [input, setInput] = useState({ email: '', password: '', confirmPassword: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = input;
  
    if (!email || !password) {
      setErrMsg('Please enter your email and password.')
      return;
    }
  
    if (password !== confirmPassword) {
      setErrMsg('Passwords do not match.')
      return;
    }
  
    try {
      await signUp(email, password);
      
    } catch (error) {
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className="p-5">
      <h5 className="text-center text-2xl font-medium mb-5">Sign Up</h5>
      {error && <p className="text-red-600 text-sm mb-5">{error}</p>}
      {errMsg && <p className="text-red-600 text-sm mb-5">{errMsg}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4"
          value={input.email}
          onChange={handleInputChange}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4"
          value={input.password}
          onChange={handleInputChange}
        />
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4"
          value={input.confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className="w-1/2 max-w-xs mt-4 block mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;