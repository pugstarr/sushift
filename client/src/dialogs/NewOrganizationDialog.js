// OrganizationDialog.js
import React, { useState } from 'react';
import { X } from 'phosphor-react';

const NewOrganizationDialog = ({ onClose }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleCreate = () => {
    // Logic to create a new organization with the provided name
    onClose();
  };

  const handleJoin = () => {
    // Logic to join an organization with the provided link
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-5 rounded-lg shadow-lg w-96"
           style={{ background: 'linear-gradient(to bottom, #4b4b4b, #000000)' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-white">Add or Join Organization</h2>
          <X size={20} className="cursor-pointer text-white" onClick={onClose} />
        </div>
        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Organization Name" 
            className="border p-2 w-full" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <button 
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded w-full" 
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Join with Link" 
            className="border p-2 w-full" 
            value={link} 
            onChange={(e) => setLink(e.target.value)}
          />
          <button 
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded w-full" 
            onClick={handleJoin}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrganizationDialog;
