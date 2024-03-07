import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CaretUp, Plus } from 'phosphor-react';
import { setCurrentOrganization } from '../redux/slices/userSlice';

const OrganizationDropdown = ({ organizations, onOrganizationSelected, onAddOrJoinOrganization }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [alignLeft, setAlignLeft] = useState(false); // State to determine if dropdown should align to the left
    const buttonRef = useRef(null);

    const currentOrganization = useSelector((state) => state.user.currentOrganization);

    useEffect(() => {
        function updateButtonWidthAndAlignment() {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setButtonWidth(buttonRef.current.offsetWidth);
                
                const spaceRight = window.innerWidth - rect.right;
                const dropdownWidth = Math.max(buttonRef.current.offsetWidth, 200);

                // Align left if there is not enough space to the right
                if (spaceRight < dropdownWidth) {
                    setAlignLeft(true);
                } else {
                    setAlignLeft(false);
                }
            }
        }

        updateButtonWidthAndAlignment();
        
        // Add event listener to handle window resize
        window.addEventListener('resize', updateButtonWidthAndAlignment);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', updateButtonWidthAndAlignment);
    }, [isOpen]);

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
                <CaretUp size={20} weight="bold" className={`text-gray-400 ${isOpen ? '' : 'rotate-180'}`}/>
            </div>
            {isOpen && (
                <div className={`absolute ${alignLeft ? 'left-0' : 'right-0'} mt-2`} style={{ width: `${Math.max(buttonWidth, 200)}px` }}>
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
