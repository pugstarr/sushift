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

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get(`https://localhost:8000/orgs/get?userId=${userId}`);
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
        fetchOrganizations();
    };

    const handleOrganizationSelected = (organization) => {
        setSelectedOrganization(organization);
        // Here you might also want to fetch new data based on the selected organization
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white">
            <Sidebar />
            <div className="flex-1">
                <div className="pt-8 pl-6">
                    <OrganizationDropdown
                        organizations={organizations}
                        onOrganizationSelected={handleOrganizationSelected}
                        onAddOrJoinOrganization={handleAddOrJoinOrganization}
                    />
                    {dialogOpen && <NewOrganizationDialog onClose={handleCloseDialog} />}
                </div>
                <div className="pt-16 pl-4 pr-4">
                    <Schedule />
                </div>
            </div>
        </div>
    );
};

export default Home;
