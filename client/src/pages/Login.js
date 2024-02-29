import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:8000/users/login', { email, password });
            console.log('Login successful', response.data);
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex min-h-screen">
            {/* Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:w-1/3">
                <h3 className="text-3xl font-bold mb-6">Log In</h3>
                <form onSubmit={handleLogin} className="w-full max-w-xs">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 p-2 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 p-2 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                    <button type="submit" className="p-2 bg-blue-500 w-full text-white rounded-md hover:bg-blue-600">Log In</button>
                </form>
                <button onClick={redirectToRegister} className="mt-4 text-blue-500 hover:underline">
                    Don't have an account? Register here.
                </button>
            </div>

            {/* Right Side Content */}
            <div className="lg:w-2/3 bg-gradient-to-br from-black to-green-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-4xl lg:text-5xl font-bold max-w-lg text-center">Simplify your scheduling.</h1>
            </div>
        </div>
    );
}

export default Login;
