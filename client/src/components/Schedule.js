import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EditEmployeeModal from './EditEmployeeModal'; // Ensure this is the correct path

const Schedule = ({ setEmployees }) => {
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [showInputForm, setShowInputForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Use useSelector to access the organization state from Redux
  const organization = useSelector(state => state.organization);
  const employees = organization.tempUsers; // Assuming organization state contains a tempUsers array

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployeeName.trim()) return;

    try {
      const response = await axios.post('https://localhost:8000/orgs/addTempUser', { name: newEmployeeName });
      console.log('Employee added:', response.data);
      setEmployees([...employees, response.data]); // Update the local component's state
    } catch (error) {
      console.error('Failed to add employee:', error);
    }

    setNewEmployeeName('');
    setShowInputForm(false);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white">
      {/* Add new employee section */}
      <div className="bg-gray-800 text-white w-full md:w-60 lg:w-80 p-5 overflow-auto">
        {/* Content omitted for brevity */}
      </div>

      {/* Dynamic schedule grid */}
      <div className="flex-grow p-5 overflow-auto">
        <div className="border-b border-gray-400">
          <div className="grid grid-cols-8 text-center font-semibold">
            <div className="p-2 bg-gray-200">Employee</div>
            {days.map((day, index) => (
              <div key={index} className="p-2 bg-gray-200 border-l border-gray-400">{day}</div>
            ))}
          </div>
        </div>
        {employees.map((employee, index) => (
          <div key={index} className="grid grid-cols-8 items-center">
            <div className="p-2 bg-gray-300 border-r border-gray-400">{employee.name}</div>
            {days.map((day, colIndex) => (
              <div key={colIndex} className={`p-2 border border-gray-400 hover:bg-gray-200 cursor-pointer ${employee.availability[day.toLowerCase()]}`}>
                {/* You can customize this part to show different styles or icons based on the availability */}
                {employee.availability[day.toLowerCase()]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
