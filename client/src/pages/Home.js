import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog';
import EmployeeBox from '../components/EmployeeBox'; 
import  Schedule from '../components/Schedule'; 
import { useSelector } from 'react-redux';

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // Grab the user ID from the Redux state
  const userId = useSelector(state => state.user.id);

  // Fetch organizations from the backend when the component mounts
  useEffect(() => {
    fetchOrganizations();
  }, [userId]); // Add userId as a dependency to refetch if the user changes

  const handleAddOrJoinOrganization = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchOrganizations();
  };

  const fetchOrganizations = async () => {
    try {
      // Include the userId in the request if needed by your backend logic
      const response = await axios.get(`https://localhost:8000/orgs/get?userId=${userId}`);
      setOrganizations(response.data); // Adjust according to your backend response structure
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      // Optionally, set organizations to an empty array or show an error message
    }
  };

  const handleOrganizationSelected = (organization) => {
    setSelectedOrganization(organization);
    // Additional logic when an organization is selected, if necessary
  };

  const handleAddEmployee = () => {
    // Placeholder for future implementation
    console.log('Add employee button clicked');
  };

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice', schedule: { Monday: 'Morning', Tuesday: 'None', Wednesday: 'Night', Thursday: 'Full', Friday: 'None', Saturday: 'Morning', Sunday: 'None' }},
    { id: 2, name: 'Bob', schedule: { Monday: 'Night', Tuesday: 'Full', Wednesday: 'None', Thursday: 'Morning', Friday: 'Night', Saturday: 'None', Sunday: 'Full' }},
    // Add more employees as needed
]);

return (
  <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white relative">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
          <OrganizationDropdown
            organizations={organizations}
            onOrganizationSelected={handleOrganizationSelected}
            onAddOrJoinOrganization={handleAddOrJoinOrganization}
          />
          {dialogOpen && <NewOrganizationDialog onClose={handleCloseDialog} />}
          <Schedule />
      </div>
  </div>
);
};

export default Home;
