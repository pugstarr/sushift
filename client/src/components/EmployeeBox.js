import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes, faPlus, faClock } from '@fortawesome/free-solid-svg-icons';
import EditEmployeeModal from './EditEmployeeModal'; // Ensure this path is correct

const EmployeesBox = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [showInputForm, setShowInputForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // State for the employee being edited

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployeeName.trim()) return;

    try {
      const response = await axios.post('https://localhost:8000/orgs/addTempUser', { name: newEmployeeName });
      console.log('Employee added:', response.data);
      setEmployees([...employees, newEmployeeName]);
    } catch (error) {
      console.error('Failed to add employee:', error);
    }

    setNewEmployeeName('');
    setShowInputForm(false);
  };

  const toggleInputForm = () => {
    setShowInputForm(!showInputForm);
  };

  const handleCancel = () => {
    setShowInputForm(false);
    setNewEmployeeName('');
  };

  const handleCloseEditModal = (refresh) => {
    setEditingEmployee(null);
    if (refresh) {
      // Optionally re-fetch or update the employees list here
    }
  };

  return (
    <div style={{ zIndex: 10, minWidth: '300px' }} className="absolute top-48 left-72 bg-white text-black p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Employees</h2>
        <button
          onClick={toggleInputForm}
          style={{
            background: '#107048',
            color: 'white',
            borderRadius: '8px',
            fontSize: '20px',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="hover:bg-green-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
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
      <div className="mt-4">
        {employees.map((employee, index) => (
          <div key={index} className="bg-gray-200 p-2 my-2 rounded-lg flex justify-between items-center">
            {employee}
            <FontAwesomeIcon icon={faClock} onClick={() => setEditingEmployee(employee)} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        ))}
      </div>
      {editingEmployee && (
        <EditEmployeeModal employee={editingEmployee} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default EmployeesBox;
