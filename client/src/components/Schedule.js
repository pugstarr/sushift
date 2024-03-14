import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format, startOfWeek } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faClock, faPlus, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const shiftTypes = ['None', 'Morning', 'Night', 'Full'];

const Schedule = () => {
    const [employees, setEmployees] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [showInputForm, setShowInputForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [activeCell, setActiveCell] = useState({ employeeName: '', day: '' });
    const [selectedWeek, setSelectedWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const orgId = useSelector(state => state.user.currentOrganization?._id);
    const API_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://sushift-server-lime.vercel.app';

    useEffect(() => {
        const loadTempUsers = async () => {
            if (orgId) {
                try {
                    const response = await axios.get(`${API_URL}/orgs/${orgId}/tempUsers`);
                    setEmployees(response.data.tempUsers);
                    console.log('Fetched Employees:', response.data.tempUsers); // Log fetched employees
                } catch (error) {
                    console.error('Failed to load temp users:', error);
                }
            }
        };
        loadTempUsers();
    }, [orgId]);
    
    useEffect(() => {
        const fetchSchedule = async () => {
            if (orgId) {
                try {
                    const weekOf = format(selectedWeek, 'yyyy-MM-dd');
                    const response = await axios.get(`${API_URL}/schedules/${orgId}/${weekOf}`);
                    setSchedule(response.data.schedule || {});
                    console.log('Fetched Schedule:', response.data.schedule); // Log fetched schedule
                } catch (error) {
                    console.error('Failed to fetch schedule:', error);
                }
            }
        };
        fetchSchedule();
    }, [orgId, selectedWeek]);
        
    const toggleInputForm = () => setShowInputForm(!showInputForm);

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!newEmployeeName.trim() || !orgId) return;

        try {
            await axios.post(`${API_URL}/orgs/addTempUser`, { name: newEmployeeName, orgId });
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

    const handleShiftChange = async (employeeId, day, shiftType) => {
        console.log(`Changing shift for employee ID: ${employeeId}, day: ${day}, to shift type: ${shiftType}`); // Log the shift change attempt
        try {
            const dayKey = day.charAt(0).toLowerCase() + day.slice(1); // Corrected line
                const updatedSchedule = {
                    ...schedule,
                    [dayKey]: { // Corrected line
                        ...schedule[dayKey], // Corrected line
                        morning: shiftType === 'Morning'
                            ? [...(schedule[dayKey]?.morning || []), employeeId] // Corrected line
                            : (schedule[dayKey]?.morning || []).filter(id => id !== employeeId), // Corrected line
                        night: shiftType === 'Night'
                            ? [...(schedule[dayKey]?.night || []), employeeId] // Corrected line
                            : (schedule[dayKey]?.night || []).filter(id => id !== employeeId), // Corrected line
                        fullDay: shiftType === 'Full'
                            ? [...(schedule[dayKey]?.fullDay || []), employeeId] // Corrected line
                            : (schedule[dayKey]?.fullDay || []).filter(id => id !== employeeId), // Corrected line
                    }
                };
    
            await axios.put(`${API_URL}/schedules/${schedule._id}`, updatedSchedule);
            setSchedule(updatedSchedule);
            console.log('Updated Schedule:', updatedSchedule);
        } catch (error) {
            console.error('Failed to update schedule:', error);
        }
    };

    const calculateShiftTotals = () => {
        const totals = { morning: {}, night: {}, full: {} };
        days.forEach(day => {
            const dayKey = day.charAt(0).toLowerCase() + day.slice(1); // Corrected line
                if (schedule && schedule[dayKey]) { // Corrected line
                    const shift = schedule[dayKey];
                if (shift.morning && shift.morning.length > 0) {
                    totals.morning[day] = (totals.morning[day] || 0) + 1;
                }
                if (shift.night && shift.night.length > 0) {
                    totals.night[day] = (totals.night[day] || 0) + 1;
                }
                if (shift.fullDay && shift.fullDay.length > 0) {
                    totals.full[day] = (totals.full[day] || 0) + 2;
                    totals.morning[day] = (totals.morning[day] || 0) + 1;
                    totals.night[day] = (totals.night[day] || 0) + 1;
                }
            }
        });
        return totals;
    };

    const shiftTotals = calculateShiftTotals();

    const handleWeekChange = (date) => {
        setSelectedWeek(startOfWeek(date, { weekStartsOn: 1 }));
    };

    return (
        <div className="overflow-visible relative">
            <h2>Schedule for Week of {format(selectedWeek, 'MMM d, yyyy')}</h2>
            {/* Date picker or navigation */}
            <input
                type="date"
                value={format(selectedWeek, 'yyyy-MM-dd')}
                onChange={(e) => handleWeekChange(new Date(e.target.value))}
            />
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
                        console.log(`Rendering employee ${employee.name}, ID: ${employee._id}`),
                        <tr key={index} className="relative group">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {employee.name}
                                {/* Icons for pencil and clock can remain unchanged */}
                            </td>
                            {days.map(day => (
                                <td key={day} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                                    <button onClick={() => setActiveCell({ employeeName: employee.name, day: day })}>
                                        {schedule[day.toLowerCase()] ? (
                                            schedule[day.toLowerCase()].morning.some(e => e._id === employee._id) ? 'Morning' :
                                            schedule[day.toLowerCase()].night.some(e => e._id === employee._id) ? 'Night' :
                                            schedule[day.toLowerCase()].fullDay.some(e => e._id === employee._id) ? 'Full' : 'None'
                                        ) : 'None'}
                                    </button>
                                    {activeCell.employeeName === employee.name && activeCell.day === day && (
                                        <div className="absolute z-10 mt-2 w-32 bg-white rounded-md shadow-lg">
                                            <ul className="py-1">
                                                {shiftTypes.map(shiftType => (
                                                    <li key={shiftType} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => {
                                                            handleShiftChange(employee._id, day.toLowerCase(), shiftType);
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
                            <td colSpan={8} className="text-center py-4">No employees found.</td>
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
                                            onChange={(e) => handleShiftChange(employees.find(emp => emp.name === selectedEmployee)._id, day.toLowerCase(), e.target.value)}
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