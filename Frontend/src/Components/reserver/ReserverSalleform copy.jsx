import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Reserver.css';

const ReserverSalleform = ({ onSubmit, onBack, date, time }) => {
  const [facility, setFacility] = useState('');
  const [motif, setMotif] = useState('');
  const [otherMotif, setOtherMotif] = useState('');
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    facility: '',
    motif: '',
    otherMotif: '',
    files: []
  });
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [pendingFacilities, setPendingFacilities] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchAvailableFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5500/reservations/available-facilities', {
          params: { date, time }
        });
        setAvailableFacilities(response.data.availableFacilities.map(fac => fac.label)); // Extract labels
        setPendingFacilities(response.data.pendingFacilities);
      } catch (error) {
        console.error("Error fetching available facilities:", error);
      }
    };

    fetchAvailableFacilities();
  }, [date, time]);

  const handleFacilityChange = (e) => {
    const selectedFacility = e.target.value;
    setFacility(selectedFacility);
    setFormData({ ...formData, facility: selectedFacility });
    if (pendingFacilities.includes(selectedFacility)) {
      setWarningMessage('Attention : Cette salle est probablement déjà réservée pour ce créneau horaire.');
    } else {
      setWarningMessage('');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!facility) {
      newErrors.facility = 'Veuillez choisir une salle.';
    }
    if (!motif && !otherMotif) {
      newErrors.motif = 'Veuillez choisir ou saisir le motif de réservation.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const motifToSend = motif ? motif : otherMotif;
      onSubmit(formData.facility, motifToSend);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    setFormData({ ...formData, files: selectedFiles });
  };

  const handleQuitClick = () => {
    // Functionality to quit the form can be handled here
    // For example, you might want to reset the form or redirect the user
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="container">
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
            <label htmlFor="facility" className="required-label">
              Choisissez une salle
            </label>
            <select
              id="facility"
              value={facility}
              onChange={handleFacilityChange}
            >
              <option value="">Sélectionner une salle</option>
              {availableFacilities.map((fac, index) => (
                <option key={index} value={fac}>{fac}</option>
              ))}
            </select>
            {errors.facility && <p className="error-message">{errors.facility}</p>}
            {warningMessage && <p className="warning-message">{warningMessage}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="motif" className="required-label">
              Motifs de réservation
            </label>
            <select
              id="motif"
              value={motif}
              onChange={(e) => {
                setMotif(e.target.value);
                setFormData({ ...formData, motif: e.target.value });
              }}
            >
              <option value="">Sélectionner un motif</option>
              <option value="Réunion du club">Réunion du club</option>
              <option value="Atelier">Atelier</option>
              <option value="Conférence">Conférence</option>
              <option value="Événement spécial">Événement spécial</option>
            </select>
            {errors.motif && <p className="error-message">{errors.motif}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="otherMotif" className="label">
              Autres motifs (optionnel)
            </label>
            <textarea
              id="otherMotif"
              value={otherMotif}
              onChange={(e) => {
                setOtherMotif(e.target.value);
                setFormData({ ...formData, otherMotif: e.target.value });
              }}
              rows="6"
              cols="30"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file" className="label">
              Joindre un fichier
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              multiple
            />
            <button type="button" onClick={handleUploadButtonClick} className="custom-file-input">
              Joindre un fichier
            </button>
            {files.length > 0 && (
              <div>
                <p>Fichiers sélectionnés:</p>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="warning-message">
            Attention ! Les CV des formateurs et la liste des participants sont obligatoires à joindre pour les ateliers.
          </div>
          <button type="submit" className="button">
            Réserver
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserverSalleform;
