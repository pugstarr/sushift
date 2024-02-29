import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:8000/users/register', {
                email,
                password,
                firstName,
                lastName
                
            });
            console.log('Registration successful', response.data);
            navigate('/login'); 
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Registration Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:w-1/3">
                <h3 className="text-3xl font-bold mb-6">Create Account</h3>
                <form onSubmit={handleRegister} className="w-full max-w-xs">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="mb-4 p-2 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="mb-4 p-2 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 p-2 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 p-2 w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    />
                    <button type="submit" className="p-2 bg-blue-500 w-full text-white rounded-md hover:bg-blue-600">Register</button>
                </form>
            </div>

            {/* Right Side Content */}
            <div className="lg:w-2/3 bg-gradient-to-br from-black to-green-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-4xl lg:text-5xl font-bold max-w-lg text-center">Welcome to Sushift!</h1>
            </div>
        </div>
    );
}

export default Register;