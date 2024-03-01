// Home.js

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import OrganizationDropdown from '../components/OrganizationDropdown';
import NewOrganizationDialog from '../dialogs/NewOrganizationDialog'

const Home = () => {
  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Organization One' },
    { id: 2, name: 'Organization Two' },
    // Add your initial state or fetch from an API
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddOrJoinOrganization = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const handleOrganizationSelected = (organization) => {
    setSelectedOrganization(organization);
    // Additional logic when an organization is selected
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
        {dialogOpen && <NewOrganizationDialog onClose={handleCloseDialog} />}
      </div>
    </div>
  );
};

export default Home;
