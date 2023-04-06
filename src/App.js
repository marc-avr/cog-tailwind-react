import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import UserContextProvider from './UserContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verify from './components/Verify';
import Dashboard from './components/Dashboard';

Amplify.configure(awsConfig);

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };
  return (
    <UserContextProvider>
      <div className="container mx-auto px-4">
        <header className="text-center py-6">
          <h1 className="text-3xl font-bold">Cognito Authentication</h1>
        </header>
      
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center mt-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg shadow-slate-900 p-8 mb-4" 
            style={showSignUp ? { display: 'none' } : {}}
          >
            <SignIn />
            <p className="text-center text-sm mt-4">
              Don't have an account?{' '}
              <span className="text-blue-500 hover:underline cursor-pointer" onClick={toggleForm}>
                Sign up here
              </span>
            </p>
          </div>
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg shadow-slate-900 p-8" 
            style={showSignUp ? {} : { display: 'none' }}
          >
            <SignUp />
            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <span className="text-blue-500 hover:underline cursor-pointer" onClick={toggleForm}>
                Sign in here
              </span>
            </p>
          </div>
        </div>

          } />
          <Route path="/verify/:username" element={<Verify />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
};

export default App;