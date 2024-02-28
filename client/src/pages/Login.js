import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { login } from '../redux/slices/userSlice';
import GoogleButton from 'react-google-button';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const backendResponse = await axios.post('https://localhost:8000/users/google-login', {
                token,
            });

            console.log('Google login successful', backendResponse.data);

            dispatch(login({
                id: backendResponse.data.user.id,
                username: backendResponse.data.username,
            }));

            navigate('/home');
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Sign-in Panel with centered content */}
            <div className="w-1/3 bg-gray-900 flex flex-col justify-center items-center p-8 text-white">
                <div className="text-center">
                    <h3 className="text-4xl font-bold mb-6">Welcome to MERN</h3>
                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            clientId={clientId}
                            render={(renderProps) => (
                                <GoogleButton
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="transition ease-in duration-200"
                                />
                            )}
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <button
                        onClick={() => navigate('/about')}
                        className="mt-4 text-sm text-green-400 hover:text-green-300 transition duration-200 ease-in-out"
                    >
                        Learn more about Sushift
                    </button>
                </div>
            </div>

            {/* Cascading Style Panel */}
            <div className="w-2/3 bg-gradient-to-br from-black to-green-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-5xl font-bold max-w-lg text-center">
                    Simplify your scheduling.
                </h1>
            </div>
        </div>
    );
}

export default Login;
