import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faClock, faPlus, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const shiftTypes = ['None', 'Morning', 'Night', 'Full'];

const Schedule = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [showInputForm, setShowInputForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [activeCell, setActiveCell] = useState({ employeeName: '', day: '' });
    //const weekOfTitle = `Week of ${weekStart} - ${weekEnd}`; // name
    const orgId = useSelector(state => state.user.currentOrganization?._id);

    useEffect(() => {
        const loadTempUsers = async () => {
            if (orgId) {
                try {
                    const response = await axios.get(`https://localhost:8000/orgs/${orgId}/tempUsers`);
                    setEmployees(response.data.tempUsers);
                } catch (error) {
                    console.error('Failed to load temp users:', error);
                }
            }
        };
        loadTempUsers();
    }, [orgId]);

    const toggleInputForm = () => setShowInputForm(!showInputForm);

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!newEmployeeName.trim() || !orgId) return;

        try {
            await axios.post('https://localhost:8000/orgs/addTempUser', { name: newEmployeeName, orgId });
            setNewEmployeeName('');
            setShowInputForm(false);
            loadTempUsers(); // Refresh the list after adding
        } catch (error) {
            console.error('Failed to add temp user:', error);
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
    const calculateShiftTotals = () => {
        const totals = { morning: {}, night: {}, full: {} };
        days.forEach(day => {
            employees.forEach(employee => {
                const shift = employee.schedule[day];
                if (shift === 'Morning') {
                    totals.morning[day] = (totals.morning[day] || 0) + 1;
                } else if (shift === 'Night') {
                    totals.night[day] = (totals.night[day] || 0) + 1;
                } else if (shift === 'Full') {
                    totals.full[day] = (totals.full[day] || 0) + 2; 
                    totals.morning[day] = (totals.morning[day] || 0) + 1;
                    totals.night[day] = (totals.night[day] || 0) + 1;
                }
            });
        });
        return totals;
    };
    
    const shiftTotals = calculateShiftTotals();

    return (
        <div className="overflow-visible relative">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employees
                            <button onClick={toggleInputForm} className="ml-2 bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded-lg">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            {showInputForm && (
                                <form onSubmit={handleAddEmployee} className="inline-flex items-center ml-2">
                                    <input 
                                        type="text"
                                        value={newEmployeeName}
                                        onChange={(e) => setNewEmployeeName(e.target.value)}
                                        placeholder="New Employee"
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
                        </th>
                        {days.map(day => (
                            <th key={day} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {employees.length > 0 ? employees.map((employee, index) => (
                        <tr key={index} className="relative group">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {employee.name}
                                <FontAwesomeIcon icon={faPencilAlt} className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                <FontAwesomeIcon icon={faClock} className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedEmployee(employee.name === selectedEmployee ? null : employee.name)} />
                            </td>
                            {days.map(day => (
    <td key={day} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
        <button onClick={() => setActiveCell({ employeeName: employee.name, day: day })}>
            {employee.schedule && employee.schedule[day] ? employee.schedule[day] : 'None'}
        </button>
        {activeCell.employeeName === employee.name && activeCell.day === day && (
            <div className="absolute z-10 mt-2 w-32 bg-white rounded-md shadow-lg">
                <ul className="py-1">
                    {shiftTypes.map(shiftType => (
                        <li key={shiftType} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
                            onClick={() => {
                                handleShiftChange(employee.name, day, shiftType);
                                setActiveCell({ employeeName: '', day: '' }); // Close dropdown
                            }}>
                            {shiftType}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </td>
))}

                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={8} className="text-center py-4">No temp users found.</td>
                        </tr>
                    )}
                
                </tbody>
                <tfoot className="bg-gray-50">
                    <tr>
                        <td className="px-6 py-4 font-medium text-black">Morning Total</td>
                        {days.map(day => (
                            <td key={day} className="px-6 py-4 text-black">{shiftTotals.morning[day] || 0}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className="px-6 py-4 font-medium text-black">Night Total</td>
                        {days.map(day => (
                            <td key={day} className="px-6 py-4 text-black">{shiftTotals.night[day] || 0}</td>
                        ))}
                    </tr>
                </tfoot>

            </table>
            {selectedEmployee && (
    <div className="absolute z-10 left-full top-0 mt-5 w-72 bg-white border rounded-lg shadow-lg p-4">
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
    );
};

export default Schedule;
