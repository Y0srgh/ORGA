import React, { useState } from 'react';
import './Reserver.css';

function ReserverTimeDate({ onSubmit, onDateChange, onTimeChange }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00-10:30 AM');
  const [club, setClub] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Submit form data
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Club:', club);
    // Call the onSubmit function passed as a prop
    onSubmit(date, time, club);
  };

  const handleQuitClick = () => {
    setFormVisible(false);
  };

  return (
    <>
      {formVisible && (
        <div className="container">
          <div className="button-group">
            <div> </div>
          <button className="quit-button" onClick={handleQuitClick}>X</button></div>
          <h4 className="form-title">Réservation</h4>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="date" className="required-label">Date</label>
              <input type="date" id="date" value={date.toISOString().substring(0, 10)} min={new Date().toISOString().split('T')[0]} onChange={(e) => {
                const newDate = new Date(e.target.value);
                setDate(newDate);
                onDateChange(newDate);
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="temps" className="required-label">Temps</label>
              <input type="text" id="time" value={time} onChange={(e) => {
                setTime(e.target.value);
                onTimeChange(e.target.value);
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="club" className="required-label">Choisissez le club</label>
              <select id="club" value={club} onChange={(e) => setClub(e.target.value)}>
                <option value="">Choisissez le club</option>
                <option value="aero">Aerobotix</option>
                <option value="IEEE">IEEE</option>
                {/* Option elements for clubs */}
              </select>
            </div>
            <button type="submit" className="button">Suivant</button>
          </form>
        </div>
      )}
    </>
  );
}

export default ReserverTimeDate;
