import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import faTimes for the "X" icon

const EmployeesBox = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [showInputForm, setShowInputForm] = useState(false);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployeeName.trim()) return;
    setEmployees([...employees, newEmployeeName]);
    setNewEmployeeName('');
    setShowInputForm(false);
  };

  const toggleInputForm = () => {
    setShowInputForm(!showInputForm);
  };

  const handleCancel = () => {
    setShowInputForm(false); // Hide the input form
    setNewEmployeeName(''); // Optionally reset the input field
  };

  return (
    <div style={{ zIndex: 10 }} className="absolute top-48 left-72 bg-white text-black p-4 rounded-lg shadow-lg" style={{ minWidth: '300px' }}>
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
          +
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
        <ul>
          {employees.map((employee, index) => (
            <li key={index} className="mt-2">
              {employee}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeesBox;
