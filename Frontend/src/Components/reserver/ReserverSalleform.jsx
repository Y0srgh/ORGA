import React, { useState } from 'react';
import './Reserver.css';

function ReserverSalleform({ onSubmit, onSalleChange, onMotifChange, onBack }) {
  // Define state variables
  const [salle, setSalle] = useState('');
  const [motif, setMotif] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [errors, setErrors] = useState({}); // Add state for errors

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {}; // Create new errors object

    if (!salle) {
      newErrors.salle = 'Veuillez choisir une salle.';
    }
    if (!motif) {
      newErrors.motif = 'Veuillez saisir le motif de réservation.';
    }

    // Update errors state
    setErrors(newErrors);

    // Submit only if no errors
    if (Object.keys(newErrors).length === 0) {
      onSubmit(salle, motif);
    }
  };

  const handleQuitClick = () => {
    setFormVisible(false);
  };

  return (
    <div className="container">
      {formVisible && (
        <>
          <div className="button-group">
            <button type="button" className="back-button" onClick={onBack}>
              <span>&#8592;</span>
            </button>
            <button className="quit-button" onClick={handleQuitClick}>X</button>
          </div>
          <div>
            <h4 className="form-title">Réservation</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="salle" className="required-label">
                  Choisissez une salle
                </label>
                <select
                  id="salle"
                  value={salle}
                  onChange={(e) => {
                    setSalle(e.target.value);
                    onSalleChange(e.target.value);
                  }}
                >
                  <option value="">Sélectionner une salle</option>
                  <option value="A8">Amphi A8</option>
                  <option value="audito">Auditorium</option>
                  {/* Option elements for clubs */}
                </select></div>
                {errors.salle && <p className="error-message">{errors.salle}</p>}
              
              <div className="form-group">
                <label htmlFor="motif" className="required-label">
                  Motifs de réservation
                </label>
                <textarea
                  id="motif"
                  value={motif}
                  onChange={(e) => {
                    setMotif(e.target.value);
                    onMotifChange(e.target.value);
                  }}
                  rows="6"
                  cols="30"
                ></textarea></div>
                {errors.motif && <p className="error-message">{errors.motif}</p>}
              
              <button type="submit" className="button">
                Réserver
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ReserverSalleform;
