import React, { useState } from 'react';

// Define the days and shifts
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const shifts = ['Morning', 'Night'];

// Initialize dummy data for employees
const initialEmployees = [
  {
    id: 1,
    name: 'Alice',
    availability: {
      'Monday Morning': true,
      'Friday Night': true,
    },
  },
  {
    id: 2,
    name: 'Bob',
    availability: {
      'Monday Night': true,
      'Saturday Night': true,
    },
  },
];

const AvailabilityModal = ({ employee, onClose, updateAvailability }) => {
  const toggleAvailability = (day, shift) => {
    const availabilityKey = `${day} ${shift}`;
    const updatedAvailability = {
      ...employee.availability,
      [availabilityKey]: !employee.availability[availabilityKey],
    };
    updateAvailability(employee.id, updatedAvailability);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-transparent flex justify-start items-start">
      <div className="mt-12 ml-64 bg-white p-4 rounded-lg shadow-lg max-w-xs">
        <h2 className="font-semibold text-lg mb-2">{employee.name}'s Availability</h2>
        <div>
          {days.map((day) => (
            <div key={day}>
              <strong>{day}:</strong>
              <div className="flex">
                {shifts.map((shift) => (
                  <div
                    key={shift}
                    className={`p-2 border cursor-pointer ${employee.availability[`${day} ${shift}`] ? 'bg-green-200' : 'bg-gray-200'}`}
                    onClick={() => toggleAvailability(day, shift)}
                  >
                    {shift}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const addEmployee = () => {
    const newEmployee = {
      id: employees.length + 1,
      name: newEmployeeName,
      availability: {},
    };
    setEmployees([...employees, newEmployee]);
    setNewEmployeeName('');
  };

  const showEmployeeAvailability = (employee) => {
    setSelectedEmployee(employee);
  };

  const updateEmployeeAvailability = (id, updatedAvailability) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, availability: updatedAvailability };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div className="home relative">
      <nav className="bg-green-800 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Scheduling App</h1>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </nav>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
          <h2 className="font-semibold mb-2">Employees</h2>
          <ul>
            {employees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => showEmployeeAvailability(employee)}
                className="mb-1 bg-gray-700 p-2 rounded hover:bg-gray-600 cursor-pointer"
              >
                {employee.name}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            placeholder="New Employee Name"
            className="border border-gray-500 p-1 mr-2 w-full rounded"
          />
          <button onClick={addEmployee} className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded w-full">
            Add Employee
          </button>
        </aside>

        <main className="flex-1 bg-gray-900 p-4 text-white">
          <h2 className="font-semibold mb-2">Weekly Schedule</h2>
          {/* Placeholder for schedule content */}
        </main>
      </div>

      {selectedEmployee && (
        <AvailabilityModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          updateAvailability={updateEmployeeAvailability}
        />
      )}
    </div>
  );
};

export default Home;
