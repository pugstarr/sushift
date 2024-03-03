import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EditEmployeeModal from './EditEmployeeModal'; // Ensure this is the correct path

const ScheduleComponent = ({ employees, setEmployees }) => {
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [showInputForm, setShowInputForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployeeName.trim()) return;

    try {
      const response = await axios.post('https://localhost:8000/orgs/addTempUser', { name: newEmployeeName });
      console.log('Employee added:', response.data); // Log the new employee name
      setEmployees([...employees, response.data.name]); // Add the new employee to the state
    } catch (error) {
      console.error('Failed to add employee:', error); // Log any errors
    }

    setNewEmployeeName(''); // Reset the input field
    setShowInputForm(false); // Hide the input form
  };

  const toggleInputForm = () => {
    setShowInputForm(!showInputForm); // Toggle the display of the input form
  };

  const handleCancel = () => {
    setShowInputForm(false); // Hide the input form
    setNewEmployeeName(''); // Reset the input field
  };

  const handleCloseEditModal = (shouldRefresh) => {
    setEditingEmployee(null); // Close the edit modal
    if (shouldRefresh) {
      // Optionally, refresh the employees list here
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white">
      {/* Add new employee */}
      <div className="bg-gray-800 text-white w-full md:w-60 lg:w-80 p-5 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
        <div className="space-y-4">
          <div className="text-green-400 cursor-pointer" onClick={toggleInputForm}>
            + Add Employee...
          </div>
          {showInputForm && (
            <form onSubmit={handleAddEmployee} className="mt-4 flex items-center">
              <input
                type="text"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
                placeholder="Employee name"
                className="text-black p-2 rounded-lg flex-grow"
              />
              <button type="submit" className="ml-2 p-2 bg-gray-200 text-black rounded-lg">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button type="button" onClick={handleCancel} className="ml-2 p-2 bg-gray-600 text-white rounded-lg">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </form>
          )}
        </div>
        {editingEmployee && (
          <EditEmployeeModal employee={editingEmployee} onClose={handleCloseEditModal} />
        )}
      </div>

      {/* Schedule grid like Excel */}
      <div className="flex-grow p-5 overflow-auto">
        <div className="border-b border-gray-400">
          <div className="grid grid-cols-7 text-center font-semibold">
            {days.map((day, index) => (
              <div key={index} className="p-2 bg-gray-200 border-l border-gray-400">{day}</div>
            ))}
          </div>
        </div>
        <div className="mt-2">
          {/* Assuming a fixed number of rows for simplicity, could be dynamic */}
          {Array(10).fill().map((_, rowIndex) => (  // Example for 10 rows
            <div key={rowIndex} className="grid grid-cols-7 items-center">
              {days.map((day, colIndex) => (
                <div key={colIndex} className="p-2 border border-gray-400 hover:bg-gray-200 cursor-pointer">
                  {/* Implement your schedule cells here */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
