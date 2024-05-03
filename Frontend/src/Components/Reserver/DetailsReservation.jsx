import React, { useState } from 'react';
import './Reserver.css';
import axios from 'axios'; // Import Axios for making HTTP requests

function ReservationDetails({ date, time, salle, motif, onBack, onQuit }) {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({ salle: '', motif: '', date: '', time: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Set the initial form data when the component mounts
  useState(() => {
    setFormData({ salle, motif, date, time });
  }, [date, time, salle, motif]);

  const handleSubmit = async () => {
    try {
     
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.post('/api/reservations', { ...formData, token }); // Pass token along with form data
      console.log('Data sent to MongoDB:', response.data);
      setSubmissionStatus('success');
      setFormVisible(false); // If submission is successful, hide the form
    } catch (error) {
      console.error('Error sending data:', error);
      setSubmissionStatus('failed');
      // Handle error, show error message, etc.
    }
  };

  // Function to format date in "DD/MM/YYYY" format
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderPopup = () => {
    if (submissionStatus === 'success') {
      return (
        <div className="popup success">
          <p>La réservation a été envoyée avec succès!</p>
          {/* You can add additional content or styles here */}
        </div>
      );
    } else if (submissionStatus === 'failed') {
      return (
        <div className="popup failed">
          <p>Échec de la réservation. Veuillez réessayer.</p>
          {/* You can add additional content or styles here */}
        </div>
      );
    } else {
      return null; // If submissionStatus is null, don't render anything
    }
  };
  
  return (
    <div className="container">
      <div className="button-group">
        <button type="button" className="back-button" onClick={onBack}>
          <span>&#8592;</span>
        </button>
        <button className="quit-button" onClick={onQuit}>X</button>
      </div>
      <h4 className="form-title">Détails de la Réservation</h4>
      
      <div className="form-group">
        <label htmlFor="salle" className="label">Salle n°</label>
        <input type="text" id="salle" value={formData.salle} readOnly={true} />
      </div>
      <div className="form-group">
        <label htmlFor="motif" className="label">Motifs de réservation</label>
        <textarea id="motif" rows="5" cols="20" value={formData.motif} readOnly={true}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="date" className="label">Date</label>
        <input type="text" id="date" value={formatDate(formData.date)} readOnly={true} />
      </div>
      <div className="form-group">
        <label htmlFor="temps" className="label">Temps</label>
        <input type="text" id="time" value={formData.time} readOnly={true} />
      </div>
      {renderPopup()}
      <button type="button" className="button" onClick={handleSubmit}>Confirmer</button>
    </div>
  );
}

export default ReservationDetails;
