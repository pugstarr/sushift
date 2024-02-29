import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, X, UserCircle, Gear, SignOut } from 'phosphor-react';

const SidebarItem = ({ icon, label, onClick }) => (
  <div 
    className="flex items-center space-x-2 p-2 rounded hover:border-green-700 border-2 border-transparent cursor-pointer transition-all duration-200" 
    onClick={onClick}>
    <div className="text-white">{icon}</div>
    <span className="text-white hidden md:block">{label}</span>
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Mobile view menu icon */}
      <div className="text-white p-4 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X size={24} className="h-6 w-6" /> : <List size={24} className="h-6 w-6" />}
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-gradient-to-b from-gray-800 to-black text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        {/* Logo or branding area */}
        <div className="px-4 mb-10">
          <UserCircle size={48} className="h-12 w-12 mx-auto" />
          <h2 className="text-center text-xl font-semibold mt-2">Brand</h2>
        </div>

        {/* Navigation items */}
        <div>
          <SidebarItem icon={<UserCircle size={20} className="h-5 w-5" />} label="Profile" onClick={() => navigate('/profile')} />
          <SidebarItem icon={<Gear size={20} className="h-5 w-5" />} label="Settings" onClick={() => navigate('/settings')} />
        </div>

        {/* Sign Out button */}
        <div className="mt-auto">
          <SidebarItem icon={<SignOut size={20} className="h-5 w-5" />} label="Sign Out" onClick={() => console.log('Signing out')} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
