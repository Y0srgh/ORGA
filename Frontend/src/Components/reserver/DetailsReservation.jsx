import React, { useState, useEffect } from 'react';
import './Reserver.css';
import axios from 'axios';

const ReservationDetails = ({ date, time, club, facility, motif, otherMotif, onBack, onQuit }) => {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({ club: '', facility: '', motif: '', date: '', time: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    setFormData(prevState => ({
      ...prevState,
      club,
      facility,
      date,
      time,
      motif: motif || otherMotif,
    }));
  }, [date, time, club, facility, motif, otherMotif]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Ensure userId is defined here
    try {
      console.log('Data to be sent:', { ...formData });

      const response = await axios.post('http://localhost:5500/reservations', {
        facility: formData.facility,
        motive: formData.motif,
        date: formData.date,
        time: formData.time,
        club: formData.club,
        userId: userId, // Use the retrieved userId
      });

      console.log('Data sent to MongoDB:', response.data);
      setSubmissionStatus('success');
      setFormVisible(false);
    } catch (error) {
      console.error('Error sending data:', error);
      setSubmissionStatus('failed');
    }
  };

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
        </div>
      );
    } else if (submissionStatus === 'failed') {
      return (
        <div className="popup failed">
          <p>Échec de la réservation. Veuillez réessayer.</p>
        </div>
      );
    } else {
      return null;
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
        <label htmlFor="club" className="label">Club</label>
        <input type="text" id="club" value={formData.club} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="salle" className="label">Salle n°</label>
        <input type="text" id="salle" value={formData.facility} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="motif" className="label">Motifs de réservation</label>
        <textarea id="motif" rows="5" cols="20" value={formData.motif} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="label">Date</label>
        <input type="text" id="date" value={formatDate(formData.date)} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="temps" className="label">Temps</label>
        <input type="text" id="time" value={formData.time} readOnly />
      </div>
      {renderPopup()}
      <button type="button" className="button" onClick={handleSubmit}>Confirmer</button>
    </div>
  );
};

export default ReservationDetails;
