import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog';
import Schedule from '../components/Schedule';
import { useSelector } from 'react-redux';

const Home = () => {
    const [organizations, setOrganizations] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const userId = useSelector(state => state.user.id);

    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`https://localhost:8000/orgs/get?userId=${userId}`);
            setOrganizations(response.data);
        } catch (error) {
            console.error('Failed to fetch organizations:', error);
        }
    };
        useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/orgs/get?userId=${userId}`);
                setOrganizations(response.data);
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
            }
        };
        fetchOrganizations();
    }, [userId]);

    const handleAddOrJoinOrganization = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        setDialogOpen(false);
        fetchOrganizations(); // Make sure this function is defined or use effect directly here if needed
    };

    const handleOrganizationSelected = (organization) => {
        setSelectedOrganization(organization);
    };

    return (
        <div className="flex flex-wrap min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white">
            <div className="w-full sm:w-1/4 xl:w-1/5 min-h-screen"> {/* Ensure full height for the sidebar */}
                <Sidebar />
            </div>
            <div className="flex-1 sm:w-3/4 xl:w-4/5">
                <div className="pt-8 px-6">
                    <OrganizationDropdown
                        organizations={organizations}
                        onOrganizationSelected={handleOrganizationSelected}
                        onAddOrJoinOrganization={handleAddOrJoinOrganization}
                    />
                    {dialogOpen && <NewOrganizationDialog onClose={handleCloseDialog} />}
                </div>
                <div className="pt-16 px-4">
                    <Schedule />
                </div>
            </div>
        </div>
    );
};

export default Home;
