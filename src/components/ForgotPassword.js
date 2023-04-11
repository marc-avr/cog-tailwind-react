import React, { useState } from "react";
import { TextField } from '@mui/material';
import { Auth } from "aws-amplify";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (event, email) => {
        event.preventDefault();
      
        try {
          await Auth.forgotPassword(email);
          console.log("forgot password request sent successfully.");
          setStep(2);
        } catch (error) {
          console.log("error occurred", error);
          setErrorMessage(error.message);
        }
    };

    const handleResetPassword = async (event, email, verificationCode, new_password) => {
        event.preventDefault();
        try {
            await Auth.forgotPasswordSubmit(email, verificationCode, new_password);
            setSuccessMessage("Password reset successfully.");
            setTimeout(() => { 
                navigate('/');
            }, 2000);
            
            console.log("password reset successfully.");
        } catch (error) {
            console.log("error occurred", error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mt-8">
                {step === 1 && ( 
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg shadow-slate-900 p-8 mb-4">
                        <h5 className="text-center text-2xl font-medium mb-2">Forgot Password</h5>
                        <h5 className="text-center text-md font-normal mb-3">Step 1 of 2</h5>
                        {errorMessage && 
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                {errorMessage}
                            </div>
                        }
                        <form onSubmit={(event) => handleForgotPassword(event, email)}>
                            
                            <TextField
                                type="email"
                                className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:shadow-outline"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                            />
                            
                            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">
                                Submit
                            </button>
                        </form>
                        <hr className="my-4" />
                        <p>
                            Back to{" "}
                            <a href="/" className="text-blue-500 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                )}
                {step === 2 && ( 
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg shadow-slate-900 p-8 mb-4">
                        <h5 className="text-center text-2xl font-medium mb-2">Reset Password</h5>
                        <h5 className="text-center text-md font-normal mb-3">Step 2 of 2</h5>
                        {errorMessage && 
                            <div className="bg-green-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                {errorMessage}
                            </div>
                        }
                         {successMessage && 
                            <div className="bg-red-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                                {successMessage}
                            </div>
                        }
                        <form 
                            onSubmit={(event) => handleResetPassword(event, email, verificationCode, newPassword)} 
                            className="flex flex-col space-y-3"
                        >
                            <TextField
                                type="email"
                                className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:shadow-outline cursor-not-allowed"
                                name="email-reset"
                                disabled
                                value={email}
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                            />
                        
                            <TextField
                                type="text"
                                id="verification-code"
                                name="code"
                                value={verificationCode}
                                placeholder='Enter verification code'
                                onChange={(event) => setVerificationCode(event.target.value)}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                            />
                            
                            <TextField
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                className="mb-4"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />

                            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">
                                Reset
                            </button>
                        </form>
                        <hr className="my-4" />
                        <p>
                            Back to{" "}
                            <a href="/" className="text-blue-500 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;