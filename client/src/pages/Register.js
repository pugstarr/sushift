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
            const response = await axios.post('http://localhost:8000/users/register', {
                email,
                password,
                Fname: firstName, 
                Lname: lastName,
            });
            console.log('Registration successful', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex flex-wrap min-h-screen w-full">
            <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-900 flex flex-col justify-center items-center px-8 py-12 text-white">
                <h3 className="text-3xl font-bold mb-6">Create Account</h3>
                <form onSubmit={handleRegister} className="w-full max-w-md">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <button type="submit" className="p-3 bg-green-500 w-full rounded-md hover:bg-green-600 transition duration-200 ease-in-out">Register</button>
                </form>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3 bg-gradient-to-br from-black to-green-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-5xl font-bold max-w-lg text-center">Welcome to Sushift!</h1>
            </div>
        </div>
    );
}

export default Register;
