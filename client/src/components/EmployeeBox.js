import React from 'react';

const EmployeesBox = ({ onAddEmployee }) => {
  return (
    <div className="absolute top-40 left-72 bg-white text-black p-4 rounded-lg shadow-lg" style={{ minWidth: '300px' }}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Employees</h2>
        <button
          onClick={onAddEmployee}
          style={{
            background: '#107048', // Mossy green color
            color: 'white',
            borderRadius: '8px', // Rounded corners
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
      <p className="mt-4">No employees yet.</p>
    </div>
  );
};

export default EmployeesBox;
