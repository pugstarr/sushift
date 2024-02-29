// Home component

import React from 'react';
import Sidebar from '../components/Sidebar'; // Ensure the path to Sidebar is correct based on your file structure

function Home() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white relative">
            <Sidebar /> {/* This will be your full-height sidebar */}
            <div className="flex-1 flex items-center justify-center">
                {/* Aesthetic "Coming Soon" placeholder */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Coming Soon</h1>
                    <p className="mt-4 text-lg">Stay tuned for something amazing.</p>
                </div>
            </div>
            <div className="absolute top-16 left-72"> {/* Adjusted left value */}
                <h1 className="text-4xl font-bold">Akira Ramen &amp; Izakaya</h1> {/* Changed text size to text-4xl */}
            </div>
        </div>
    );
}

export default Home;
