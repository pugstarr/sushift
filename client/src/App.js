import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    useEffect(() => {
        function start() {
            gapi.auth2.init({
                clientId: clientId,
                scope: ""
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
