import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Verify = () => {
  const { username } = useParams();

  const { verify, error, resendConfirmationCode } = useContext(UserContext);
  const [verificationCode, setVerificationCode] = useState('');

  const handleResendConfirmationCode = async () => {
    try {
      await resendConfirmationCode(username);
    } catch (error) {
      console.log('error resending confirmation code', error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await verify(username, verificationCode);
      
      //signed-in user
      
    } catch (error) {
      console.log('error verifying account', error);
    }
  };

  const handleChange = event => {
    setVerificationCode(event.target.value);
  };

  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <h3 className="text-center text-3xl font-bold mb-5">Verify</h3>
          {error && <p className="text-red-600 mb-5">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                disabled
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="verification-code" className="block text-gray-700 font-bold mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="verification-code"
                name="code"
                value={verificationCode}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Verify
              </button>
              <button
                onClick={handleResendConfirmationCode}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Resend confirmation code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;