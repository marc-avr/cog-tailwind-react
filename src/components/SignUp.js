import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { TextField } from '@mui/material';

const SignUp = () => {
  const { signUp, error } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [lookupDisabled, setLookupDisabled] = useState(true);
  
  const [input, setInput] = useState({ firstname:'', lastname: '', phone_number: '', email: '', password: '', confirmPassword: '' });
  const [npi_number, set_npi_number] = useState('');
  const [npiObj, setNPIObj] = useState({});

 const lookupNPI = async (npi) => {
    const res = await fetch(`https://clinicaltables.nlm.nih.gov/api/npi_org/v3/search?terms=${npi}&ef=provider_type,name.full,addr_practice.full,licenses,other_ids`);
    
    const data = await res.json();
    console.log('DATA : ', data);
    if (data[0] === 0) {
      setSuccessMsg('');
      setErrMsg('NPI not found!');
      set_npi_number('');
    }else{
      setErrMsg('');
      setSuccessMsg('NPI found!')
      console.log(data[2]);
      setNPIObj(data[2]);
    }
    return;
  }


  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    if(name === 'npi_number') { 
      set_npi_number(value);
      if(value.length != 10) {
        setSuccessMsg('');
        setErrMsg('NPI must be 10 digits');
        setLookupDisabled(true);
      }else{
        setErrMsg('');
        setLookupDisabled(false);
      }
    }

    if (name === 'phone_number') {
      // Format the phone number and update the state
      const formatted = `+1${value}`;
  
      setInput(prevState => ({ ...prevState, [name]: formatted }));
    } else {
      setInput(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword, firstname, lastname, phone_number } = input;

    const npiObj_string = JSON.stringify(npiObj);
  
    if (!email || !password) {
      setSuccessMsg('');
      setErrMsg('Please enter your email and password.');
      return;
    }
  
    if (password !== confirmPassword) {
      setSuccessMsg('');
      setErrMsg('Passwords do not match.');
      return;
    }
  
    try {
      await signUp(email, password, email, firstname, lastname, phone_number, npi_number, npiObj_string );
    } catch (error) {
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div className="p-5">
      <h5 className="text-center text-2xl font-medium mb-5">Sign Up</h5>
      {error && <p className="text-red-600 text-sm mb-5">{error}</p>}
      {errMsg && <p className="text-red-600 text-sm mb-5">{errMsg}</p>}
      {successMsg && <p className="text-green-600 text-sm mb-5">{successMsg}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className='flex flex-row w-full justify-between mx-2 items-center'>
        <TextField
          type="text"
          name="npi_number"
          label="NPI Number"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4 mx-2"
          value={npi_number}
          onChange={handleInputChange}
        />
        <button 
          type="button"
          className={`${lookupDisabled === true ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'} w-1/2 h-1/2 max-w-xs p-2 mt-2 mx-2  text-white font-bold rounded`}
          disabled={lookupDisabled}
          onClick={() => lookupNPI(npi_number)}
        >
          Lookup
        </button>
      </div>
      <TextField
          type="text"
          name="firstname"
          label="First Name"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4"
          value={input.firstname}
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          name="lastname"
          label="Last Name"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4"
          value={input.lastname}
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          name="phone_number"
          label="Phone"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          className="mb-4"
          value={input._number}
          onChange={handleInputChange}
        />
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