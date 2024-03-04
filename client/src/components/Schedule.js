// Schedule.js
import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faClock, faPlus, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const shiftTypes = ['None', 'Morning', 'Night', 'Full'];

const Schedule = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [showInputForm, setShowInputForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const toggleInputForm = () => {
        setShowInputForm(!showInputForm);
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!newEmployeeName.trim()) return;

        try {
            const response = await axios.post('https://localhost:8000/orgs/addTempUser', { name: newEmployeeName });
            setEmployees([...employees, { name: newEmployeeName, schedule: {} }]);
            setNewEmployeeName('');
            setShowInputForm(false);
        } catch (error) {
            console.error('Failed to add employee:', error);
        }
    };

    const handleCancel = () => {
        setShowInputForm(false);
        setNewEmployeeName('');
    };

    const handleShiftChange = (employeeName, day, shiftType) => {
        setEmployees(employees.map(emp => {
            if (emp.name === employeeName) {
                const updatedSchedule = { ...emp.schedule, [day]: shiftType };
                return { ...emp, schedule: updatedSchedule };
            }
            return emp;
        }));
    };

    return (
        <div className="flex">
            <div className="p-4 rounded-lg shadow-lg bg-white text-black mr-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Employees</h2>
                    <button onClick={toggleInputForm} className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                {showInputForm && (
                    <form onSubmit={handleAddEmployee} className="flex items-center">
                        <input 
                            type="text" 
                            value={newEmployeeName} 
                            onChange={(e) => setNewEmployeeName(e.target.value)} 
                            placeholder="Employee name" 
                            className="input-text mr-2" 
                        />
                        <button type="submit" className="btn-create mr-2">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button type="button" onClick={handleCancel} className="btn-join">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </form>
                )}
                <ul className="mt-4">
                    {employees.map((employee, index) => (
                        <li key={index} className="mt-2">{employee.name}</li>
                    ))}
                </ul>
            </div>
            <div className="overflow-x-auto relative">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Employee
                            </th>
                            {days.map(day => (
                                <th key={day} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr key={employee.name} className="relative group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center justify-between">
                                    {employee.name}
                                    <span className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <FontAwesomeIcon icon={faPencilAlt} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                                        <FontAwesomeIcon icon={faClock} className="text-gray-400 hover:text-gray-600 ml-2 cursor-pointer" onClick={() => setSelectedEmployee(employee.name === selectedEmployee ? null : employee.name)} />
                                    </span>
                                </td>
                                {days.map(day => (
                                    <td key={day} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.schedule[day] || '—'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedEmployee && (
                    <div className="absolute z-10 -ml-12 mt-5 w-72 bg-white border rounded-lg shadow-lg p-4" style={{ left: '100%', top: '0' }}>
                        <h3 className="text-lg font-semibold mb-4">Set Shifts for {selectedEmployee}</h3>
                        {days.map(day => (
                            <div key={day} className="flex items-center justify-between mb-2">
                                <span className="font-medium">{day}:</span>
                                <div className="flex items-center">
                                    {shiftTypes.map(type => (
                                        <label key={type} className="ml-4 flex items-center">
                                            <input 
                                                type="radio" 
                                                name={`${selectedEmployee}-${day}`} 
                                                value={type} 
                                                checked={employees.find(emp => emp.name === selectedEmployee)?.schedule[day] === type}
                                                onChange={(e) => handleShiftChange(selectedEmployee, day, e.target.value)}
                                                className="form-radio h-4 w-4 text-green-600" 
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button 
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={() => setSelectedEmployee(null)}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;
