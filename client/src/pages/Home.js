import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog'; 
import Schedule from '../components/Schedule';
import { useSelector } from 'react-redux';

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [employees, setEmployees] = useState([]); // Add this line
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // Grab the user ID from the Redux state
  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    fetchOrganizations();
    fetchEmployees(); // Add this line
  }, [userId, selectedOrganization]); // Add selectedOrganization as a dependency

  const handleAddOrJoinOrganization = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    fetchOrganizations();
  };

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`https://localhost:8000/orgs/get?userId=${userId}`);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  };

  const fetchEmployees = async () => {
    // Replace with your actual API endpoint and logic to fetch employees for the selected organization
    if (selectedOrganization) {
      try {
        const response = await axios.get(`https://localhost:8000/employees/get?orgId=${selectedOrganization.id}`);
        setEmployees(response.data); // Adjust according to your backend response structure
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    }
  };

  const handleOrganizationSelected = (organization) => {
    setSelectedOrganization(organization);
  };

  const handleAddEmployee = () => {
    console.log('Add employee button clicked');
    // You might want to fetch employees again after adding a new one
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white relative">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <OrganizationDropdown
          organizations={organizations}
          onOrganizationSelected={handleOrganizationSelected}
          onAddOrJoinOrganization={handleAddOrJoinOrganization}
        />
        {dialogOpen && (
          <NewOrganizationDialog onClose={handleCloseDialog} />
        )}
        {/* ScheduleComponent integration */}
        <Schedule employees={employees.map(employee => employee.name)} />
      </div>
    </div>
  );
};

export default Home;