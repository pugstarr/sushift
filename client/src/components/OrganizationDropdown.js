import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CaretUp, Plus } from 'phosphor-react';
import { setCurrentOrganization } from '../redux/slices/userSlice';

const OrganizationDropdown = ({ organizations, onOrganizationSelected, onAddOrJoinOrganization }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);
    const buttonRef = useRef(null);

    const currentOrganization = useSelector((state) => state.user.currentOrganization);

    useEffect(() => {
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }
    }, [buttonRef.current]);

    const toggleDropdown = () => setIsOpen(!isOpen);

  
    const placeholderText = currentOrganization ? currentOrganization.name : "Select Organization";

    const dispatch = useDispatch();

    const handleOrganizationSelected = (org) => {
        onOrganizationSelected(org);
        dispatch(setCurrentOrganization(org));
        setIsOpen(false); 
    };

    return (
        <div style={{ zIndex: 20 }} className="relative inline-block text-white" ref={buttonRef}>
            <div onClick={toggleDropdown} className="cursor-pointer bg-transparent py-2 flex items-center justify-between">
                <h1 className="text-4xl font-bold">{placeholderText}</h1>
                <CaretUp size={20} weight="bold" className="text-gray-400 rotate-180" />
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2" style={{ width: `${buttonWidth}px` }}>
                    <div className="bg-gray-800 rounded-lg shadow-xl">
                        {organizations.length > 0 ? (
                            organizations.map((org) => (
                                <a
                                    key={org._id}
                                    href="#!"
                                    className="block px-4 py-2 text-sm hover:border-green-700 border-2 border-transparent transition-all duration-200"
                                    onClick={() => handleOrganizationSelected(org)}
                                >
                                    {org.name}
                                </a>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-400">No organizations found</div>
                        )}
                        <div className="flex items-center justify-start mt-2 px-4 py-2 hover:border-green-700 border-2 border-transparent transition-all duration-200">
                            <Plus size={20} className="text-green-500 mr-2" />
                            <a href="#!" className="font-bold" onClick={onAddOrJoinOrganization}>
                                Add New Organization
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganizationDropdown;
