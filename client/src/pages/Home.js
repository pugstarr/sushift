import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog';
import EmployeesBox from '../components/EmployeeBox'; // Import the EmployeesBox component

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleAddOrJoinOrganization = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchOrganizations();
  };

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('https://localhost:8000/orgs/get');
      setOrganizations(response.data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  };

  const handleOrganizationSelected = (organization) => {
    setSelectedOrganization(organization);
  };

  const handleAddEmployee = () => {
    // Placeholder for future implementation
    console.log('Add employee button clicked');
  };

return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white relative">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        {/* Existing content */}
      </div>
      <div className="absolute top-16 left-72">
        <OrganizationDropdown
          organizations={organizations}
          onOrganizationSelected={handleOrganizationSelected}
          onAddOrJoinOrganization={handleAddOrJoinOrganization}
        />
        {dialogOpen && (
          <NewOrganizationDialog onClose={handleCloseDialog} />
        )}
      </div>
      {/* Adjust the EmployeesBox component with new style props */}
      <EmployeesBox
        onAddEmployee={handleAddEmployee}
        style={{ top: 'calc(16px + 50px)', left: '72px' }} // Position it below the dropdown
      />
    </div>
  );
};

export default Home;
