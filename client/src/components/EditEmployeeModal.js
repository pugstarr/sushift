// components/EditEmployeeModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DayAvailability = ({ day, availability, setAvailability }) => {
  const handleChange = (e) => {
    setAvailability({ ...availability, [day]: e.target.value });
  };

  return (
    <div>
      <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
      <select value={availability[day]} onChange={handleChange}>
        <option value="none">None</option>
        <option value="morning">Morning</option>
        <option value="night">Night</option>
        <option value="full">Full</option>
      </select>
    </div>
  );
};

const EditEmployeeModal = ({ employee, onClose }) => {
  const [name, setName] = useState(employee.name);
  const [availability, setAvailability] = useState(employee.availability || {});

  const handleSave = async () => {
    try {
      await axios.post('https://localhost:8000/orgs/editTempUser', {
        id: employee._id,
        name,
        availability,
      });
      onClose(true); // Refresh or re-fetch employees list if needed
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  return (
    <div className="edit-employee-modal">
      {/* Modal content with form for name and availability */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
        <DayAvailability key={day} day={day} availability={availability} setAvailability={setAvailability} />
      ))}
      <button onClick={handleSave}>Save</button>
      <button onClick={() => onClose()}>Close</button>
    </div>
  );
};

export default EditEmployeeModal;
