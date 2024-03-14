import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../redux/slices/userSlice'; // Import the login action
import Logo from '../assets/sushift-logo.png';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use useDispatch to dispatch an action
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const API_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://sushift-server-lime.vercel.app';

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Register the user
            const registerResponse = await axios.post(`${API_URL}/users/register`, {
                email,
                password,
                Fname: firstName, 
                Lname: lastName,
            });

            if (registerResponse.status === 200 || registerResponse.status === 201) { // Check for successful response
                // Immediately log in the user after successful registration
                const loginResponse = await axios.post(`${API_URL}/users/login`, { email, password });

                if (loginResponse.data && loginResponse.data.user) {
                    const { id, username, email: userEmail, Fname, Lname, role } = loginResponse.data.user;
                    dispatch(login({ id, username, email: userEmail, Fname, Lname, role }));
                    navigate('/home');
                } else {
                    
                    navigate('/login');
                }
            } else {
                
                console.error('Registration was not successful');
            }
        } catch (error) {
            console.error('Registration or login error:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div className="flex flex-wrap min-h-screen w-full relative"> 
            <img 
                src={Logo} 
                alt="Sushift Logo" 
                className="absolute top-4 left-4 w-52 h-auto cursor-pointer" 
                onClick={() => navigate('/login')}
            /> 
            <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-900 flex flex-col justify-center items-center px-8 py-12 text-white">
                <h3 className="text-3xl font-bold mb-6">Create Account</h3>
                <form onSubmit={handleRegister} className="w-full max-w-sm"> {/* Change max-w-md to max-w-sm */}
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-4 p-3 w-full border-gray-700 rounded-md bg-gray-800 text-white"
                    />
                    <button type="submit" className="p-3 bg-red-700 w-full rounded-md hover:bg-red-800 transition duration-200 ease-in-out text-white">Register</button>
                </form>
                <button 
                    onClick={() => navigate('/login')} 
                    className="mt-4 text-red-300 hover:text-red-200 cursor-pointer"
                >
                    Have an account? Log In
                </button>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3 bg-gradient-to-br from-black to-red-900 flex items-center justify-center p-8 text-white">
                <h1 className="text-5xl font-bold max-w-lg text-center">Welcome to Sushift!</h1>
            </div>
        </div>
    );
}

export default Register;
