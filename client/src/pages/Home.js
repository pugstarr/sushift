import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog';
import Schedule from '../components/Schedule';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/sushift-logo.png';
// Import icons
import { FiMenu, FiArrowLeft } from 'react-icons/fi';

const Home = () => {
    const [organizations, setOrganizations] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const userId = useSelector(state => state.user.id);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const API_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://sushift-server-lime.vercel.app';

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`${API_URL}/orgs/get?userId=${userId}`);
            setOrganizations(response.data);
        } catch (error) {
            console.error('Failed to fetch organizations:', error);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, [userId]);

    const handleAddOrJoinOrganization = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchOrganizations();
    };

    const handleOrganizationSelected = (organization) => {
        setSelectedOrganization(organization);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white">
            {isSidebarOpen && <Sidebar />}
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center p-4">
                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        {isSidebarOpen ? <FiArrowLeft size="1.5em" /> : <FiMenu size="1.5em" />}
                    </button>
                    <img src={Logo} alt="Sushift Logo" className="w-48 h-auto cursor-pointer" onClick={() => navigate('/home')} />
                </div>
                <div className="px-4">
                    <OrganizationDropdown
                        organizations={organizations}
                        onOrganizationSelected={handleOrganizationSelected}
                        onAddOrJoinOrganization={handleAddOrJoinOrganization}
                    />
                    {dialogOpen && <NewOrganizationDialog onClose={handleCloseDialog} />}
                </div>
                <div className="flex-grow px-4">
                    <Schedule />
                </div>
            </div>
        </div>
    );
};

export default Home;
