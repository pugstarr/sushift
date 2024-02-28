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
            {/* Sign-in Panel */}
            <div className="w-1/3 bg-white flex flex-col justify-center p-8">
                <div className="max-w-sm m-auto">
                    <h3 className="text-4xl font-bold mb-6">Welcome to MERN</h3>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Login</h4>
                        <div className="flex justify-center"> {/* Centering the login button */}
                            <GoogleLogin
                                clientId={clientId}
                                render={(renderProps) => (
                                    <div className="flex justify-center"> {/* Added for extra centering */}
                                        <GoogleButton
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            className="transition ease-in duration-200"
                                        />
                                    </div>
                                )}
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={handleGoogleLoginFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/about')}
                        className="mt-4 text-sm text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out block mx-auto"
                    >
                        Learn more about Berbai
                    </button>
                </div>
            </div>

            {/* Cascading Style Panel */}
            <div className="w-2/3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8 text-white">
                <h1 className="text-5xl font-bold max-w-lg text-center">
                    Simplify your scheduling
                </h1>
            </div>
        </div>
    );
}

export default Login;
