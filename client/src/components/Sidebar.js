import React, { useState } from 'react';
import { List, X, UserCircle, Gear, SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice'; 

const SidebarItem = ({ icon, label, onClick }) => (
  <div 
    className="flex items-center space-x-2 p-2 rounded hover:bg-green-700 hover:text-white border-2 border-transparent cursor-pointer transition-all duration-200" 
    onClick={onClick}>
    <div className="text-white">{icon}</div>
    <span className="text-white hidden md:block">{label}</span>
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  const fName = useSelector(state => state.user.Fname);
  const lName = useSelector(state => state.user.Lname);

  const handleSignOut = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <div className="flex h-screen">
      {/* Mobile view menu icon */}
      <div className="text-white p-4 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X size={24} className="h-6 w-6" /> : <List size={24} className="h-6 w-6" />}
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-gradient-to-b from-gray-800 to-black text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out flex flex-col`}>
        {/* Name */}
        <div className="px-4 mb-10">
          <h2 className="text-center text-xl font-semibold mt-2">{fName} {lName}</h2>
        </div>

        {/* Navigation items */}
        <div className="flex-grow">
          <SidebarItem icon={<UserCircle size={20} className="h-5 w-5" />} label="Profile" onClick={() => navigate('/profile')} />
          <SidebarItem icon={<Gear size={20} className="h-5 w-5" />} label="Settings" onClick={() => navigate('/settings')} />
        </div>

        {/* Sign Out button */}
        <div>
          <SidebarItem icon={<SignOut size={20} className="h-5 w-5" />} label="Sign Out" onClick={handleSignOut} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
