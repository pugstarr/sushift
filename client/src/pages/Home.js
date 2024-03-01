import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog';

const Home = () => {
  // State for organizations will now be initially empty and fetched from backend
  const [organizations, setOrganizations] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // Fetch organizations from the backend when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('https://localhost:8000/orgs/get');
        setOrganizations(response.data); // Adjust according to your backend response structure
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
        // Optionally, set organizations to an empty array or show an error message
      }
    };

    fetchOrganizations();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleAddOrJoinOrganization = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOrganizationSelected = (organization) => {
    setSelectedOrganization(organization);
    // Additional logic when an organization is selected
  };

  // Function to handle creating a new organization
  const handleCreateOrganization = async (newOrgName) => {
    try {
      const response = await axios.post('https://localhost:8000/orgs/create', { name: newOrgName });
      setOrganizations(prev => [...prev, response.data.organization]); // Assuming the backend sends back the created organization
      setDialogOpen(false); // Close the dialog after creation
    } catch (error) {
      console.error('Failed to create organization:', error);
      // Handle error, such as showing an error message to the user
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white relative">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Coming Soon</h1>
          <p className="mt-4 text-lg">Stay tuned for something amazing.</p>
        </div>
      </div>
      <div className="absolute top-16 left-72">
        <OrganizationDropdown
          organizations={organizations}
          onOrganizationSelected={handleOrganizationSelected}
          onAddOrJoinOrganization={handleAddOrJoinOrganization}
        />
        {/* Pass handleCreateOrganization to NewOrganizationDialog */}
        {dialogOpen && <NewOrganizationDialog onClose={handleCloseDialog} onCreate={handleCreateOrganization} />}
      </div>
    </div>
  );
};

export default Home;
