import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'phosphor-react';
import { useSelector } from 'react-redux';

const NewOrganizationDialog = ({ onClose, onCreate }) => {
  const [orgName, setName] = useState('');
  const [link, setLink] = useState('');
  const userId = useSelector(state => state.user.id); // Get the user ID from Redux state

  const handleCreate = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
        // Include userId in the request body
        const response = await axios.post('http://localhost:8000/orgs/create', { name: orgName, userId });
        // onCreate(response.data.organization); Uncomment and use as needed
        onClose(); // Close the dialog
    } catch (error) {
        console.error('Failed to create organization:', error);
    }
  };

  const handleJoin = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/orgs/addUser', {userId: userId, orgId : link});
      onClose();
    } catch(error){
      console.error('aye', error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Add or Join Organization</h2>
          <X size={24} className="cursor-pointer text-gray-400 hover:text-green-400" onClick={onClose} />
        </div>
        <form>
          <div className="mb-5">
            <label htmlFor="organizationName" className="block text-sm font-semibold text-gray-300">Organization Name</label>
            <input 
              type="text"
              id="organizationName"
              className="mt-2 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white shadow placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              placeholder="Your organization's name"
              value={orgName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="joinLink" className="block text-sm font-semibold text-gray-300">Join with Link</label>
            <input 
              type="text"
              id="joinLink"
              className="mt-2 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white shadow placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              placeholder="Organization invite link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button 
              type="button"
              className="flex-1 inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:border-green-500"
              onClick={handleCreate}
            >
              Create
            </button>
            <button 
              type="button"
              className="flex-1 inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 hover:border-green-500"
              onClick={handleJoin}
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrganizationDialog;
