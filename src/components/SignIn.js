import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { TextField } from '@mui/material';

const SignIn = () => {
  const { signIn, error } = useContext(UserContext);
  const [input, setInput] = useState({ email: '', password: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = input;
    await signIn(email, password);
  };

  return (
    <div className="p-5">
      <h5 className="text-center text-2xl font-medium mb-5">Sign In</h5>
      {error && <p className="text-red-600 text-sm mb-5">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="flex w-1/2 bg-blue-500 hover:bg-blue-600 text-white justify-center font-bold py-2 px-4 mt-4 mx-auto rounded">
            Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;