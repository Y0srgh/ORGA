import React, { useState } from 'react';
import './ReserverTimeDate.css';

function ReservationDetails({ date, time, salle, motif }) {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({ salle: '', motif: '', date: '', time: '' });

  // Set the initial form data when the component mounts
  useState(() => {
    setFormData({ salle, motif, date, time });
  }, [date, time, salle, motif]);

  const handleSubmit = () => {
    // Add any submission logic here
    // For now, just close the form
    setFormVisible(false);
  };

  if (!formVisible) {
    return null; // If form is not visible, don't render anything
  }

  return (
    <div className="container">
      <h4 className="form-title">Détails de la Réservation</h4>
      <div className="form-group">
        <label htmlFor="salle" className="label">Salle n°</label>
        <input type="text" id="salle" value={formData.salle} onChange={(e) => setFormData({...formData, salle: e.target.value})} />
      </div>
      <div className="form-group">
        <label htmlFor="motif" className="label">Motifs de réservation</label>
        <textarea id="motif" rows="5" cols="20" value={formData.motif} onChange={(e) => setFormData({...formData, motif: e.target.value})}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="date" className="label">Date</label>
        <input type="date" id="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
      </div>
      <div className="form-group">
        <label htmlFor="temps" className="label">Temps</label>
        <input type="text" id="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
      </div>
      <button type="submit" className="button" onClick={handleSubmit}>Confirmer</button>
    </div>
  );
}

export default ReservationDetails;
