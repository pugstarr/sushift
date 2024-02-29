// OrganizationDropdown.js
import React, { useState } from 'react';
import { X } from 'phosphor-react';

const OrganizationDropdown = ({ organizations, onOrganizationSelected, onAddOrJoinOrganization }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="bg-gray-800 bg-opacity-75 text-white py-3 px-6 rounded text-xl hover:border-green-700 border-2 border-transparent transition-all duration-200">
        Select Organization
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-64 bg-gray-300 rounded-md shadow-xl z-20">
          <div className="flex justify-end px-4">
            <X size={20} className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={toggleDropdown} />
          </div>
          {organizations.map((org) => (
            <a
              key={org.id}
              href="#!"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
              onClick={() => onOrganizationSelected(org)}
            >
              {org.name}
            </a>
          ))}
          <a href="#!" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-400" onClick={onAddOrJoinOrganization}>
            + Add New Organization
          </a>
        </div>
      )}
    </div>
  );
};

export default OrganizationDropdown;
