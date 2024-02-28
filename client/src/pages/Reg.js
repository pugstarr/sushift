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
            const response = await axios.post('http://localhost:8000/users/login', { email, password });
            console.log('Login successful', response.data);
            // Here you should handle login success, e.g., storing the returned token and redirecting the user
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Login Form */}
            <div className="w-1/2 flex flex-col justify-center items-center p-8">
                <h3 className="text-3xl font-bold mb-6">Log In</h3>
                <form onSubmit={handleLogin} className="w-full max-w-xs">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 p-2 w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 p-2 w-full"
                    />
                    <button type="submit" className="p-2 bg-blue-500 w-full text-white">Log In</button>
                </form>
                <button onClick={redirectToRegister} className="mt-4 underline">
                    Don't have an account? Register here.
                </button>
            </div>

            {/* Right Side Content */}
            <div className="w-1/2 bg-gradient-to-br from-black to-green-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-5xl font-bold max-w-lg text-center">Simplify your scheduling.</h1>
            </div>
        </div>
    );
}

export default Login;
