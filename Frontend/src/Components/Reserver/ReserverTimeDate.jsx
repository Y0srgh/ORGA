import React, { useState } from 'react';
import './Reserver.css';

function ReserverTimeDate({ onSubmit, onDateChange, onTimeChange }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('09:00-10:30 AM');
  const [club, setClub] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  // State variables for validation and error messages
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [clubError, setClubError] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are valid and no errors
    if (!dateError && !timeError && !clubError) {
      // Submit form data
      onSubmit(date, time, club);
    }
  };

  const handleQuitClick = () => {
    setFormVisible(false);
  };

  const validateDate = (value) => {
    console.log('Validating date:', value);
    // Check if a valid date is entered
    const parsedDate = new Date(value);
    if (isNaN(parsedDate.getTime())) {
      console.log('Invalid date entered');
      return 'Please enter a valid date';
    }
    console.log('Date is valid');
    return ''; // No error
  };
  
  const validateTime = (value) => {
    console.log('Validating time:', value);
    // Basic time format validation (replace with a more complex regex if needed)
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(?:\s*AM|PM)?$/i;
    if (!timeRegex.test(value)) {
      console.log('Invalid time entered');
      return 'Please enter a valid time format (e.g., 10:00 AM)';
    }
    console.log('Time is valid');
    return ''; // No error
  };
  
  const validateClub = (value) => {
    console.log('Validating club:', value);
    // Check if a club is selected
    return value !== '' ? '' : 'Please select a club';
  };
  

// Handle input change with error handling
const handleDateChange = (e) => {
  console.log('Date changed:', e.target.value);
  const newDate = new Date(e.target.value);
  setDate(newDate);
  onDateChange(newDate);
  setDateError(validateDate(e.target.value)); // Update error based on validation
};

const handleTimeChange = (e) => {
  console.log('Time changed:', e.target.value);
  setTime(e.target.value);
  onTimeChange(e.target.value);
  setTimeError(validateTime(e.target.value)); // Update error based on validation
};

const handleClubChange = (e) => {
  console.log('Club changed:', e.target.value);
  setClub(e.target.value);
  setClubError(validateClub(e.target.value)); // Update error based on validation
};


  return (
    <>
      {formVisible && (
        <div className="container">
          <div className="button-group">
            <div></div>
            <button className="quit-button" onClick={handleQuitClick}>X</button>
          </div>
          <h4 className="form-title">Réservation</h4>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="date" className="required-label">Date</label>
              <input type="date" id="date" value={date.toISOString().substring(0, 10)} min={new Date().toISOString().split('T')[0]} onChange={handleDateChange} />
              {dateError && <span className="error-message">{dateError}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="temps" className="required-label">Temps</label>
              <input type="text" id="time" value={time} onChange={handleTimeChange} />
              {timeError && <span className="error-message">{timeError}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="club" className="required-label">Choisissez le club</label>
              <select id="club" value={club} onChange={handleClubChange}>
                <option value="">Choisissez le club</option>
                <option value="aero">Aerobotix</option>
                <option value="IEEE">IEEE</option>
                {/* Option elements for clubs */}
              </select>
              {clubError && <span className="error-message">{clubError}</span>}
            </div>
            <button type="submit" className="button" disabled={dateError || timeError || clubError}>Suivant</button>
          </form>
        </div>
      )}
    </>
  );
}

export default ReserverTimeDate;
