import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Login from './pages/Login'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import  getTheme from './themes/theme';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = getTheme(darkMode ? 'dark' : 'light');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId : clientId,
                scope : ""
            })
        };

        gapi.load('client:auth2', start);
    })



    return (
        <ThemeProvider theme={theme}>
            <GoogleOAuthProvider clientId={clientId}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
}

export default App;