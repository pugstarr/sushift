import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice'; 
import Logo from '../assets/sushift-logo.png'; // Ensure this path is correct

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const API_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://sushift-server-lime.vercel.app';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/users/login`, { email, password });
            console.log('Login successful', response.data);

            const { id, username, email: userEmail, Fname, Lname, role } = response.data.user;

            dispatch(login({ id, username, email: userEmail, Fname, Lname, role }));

            navigate('/home');
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message;
            alert('Email or Password Incorrect.'); // You might want to handle this differently
            console.error('Login error:', message);
        }
    };

    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-wrap min-h-screen w-full relative"> 
            <img 
                src={Logo} 
                alt="Sushift Logo" 
                className="absolute top-4 left-4 w-52 h-auto cursor-pointer" 
                onClick={() => navigate('/login')}
            /> 
            <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-900 flex flex-col justify-center items-center p-8 text-white">
                <h3 className="text-3xl font-bold mb-6">Log In</h3>
                <form onSubmit={handleLogin} className="w-full max-w-xs sm:max-w-sm">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 p-2 w-full border-gray-700 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 p-2 w-full border-gray-700 rounded-md bg-gray-800 text-white"
                    />
                    <button type="submit" className="p-2 bg-red-700 w-full text-white rounded-md hover:bg-red-800">Log In</button>
                </form>
                <button onClick={redirectToRegister} className="mt-4 text-red-300 hover:text-red-200">
                    Don't have an account? Register here.
                </button>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3 bg-gradient-to-br from-black to-red-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-4xl lg:text-5xl font-bold max-w-lg text-center">Simplify your scheduling.</h1>
            </div>
        </div>
    );
}

export default Login;
