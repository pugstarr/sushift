import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog';
import EmployeeBox from '../components/EmployeeBox'; // Ensure this path is correct
import { useSelector } from 'react-redux';
import { setOrg } from '../redux/slices/orgSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  //const [selectedOrganization, setSelectedOrganization] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(setOrg(organization));
    // Additional logic when an organization is selected, if necessary
  };

  const handleAddEmployee = () => {
    // Placeholder for future implementation
    console.log('Add employee button clicked');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white relative">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        {/* Existing content placeholder */}
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
      <EmployeeBox
        onAddEmployee={handleAddEmployee}
        style={{ top: 'calc(16px + 50px)', left: '72px' }} // Adjust the positioning as needed
      />
    </div>
  );
};

export default Home;
