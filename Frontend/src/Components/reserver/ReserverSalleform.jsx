import React, { useState, useRef } from 'react';
import './Reserver.css';

const ReserverSalleform = ({ onSubmit, onBack }) => {
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
  const fileInputRef = useRef(null);

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
      // Determine which motif to send based on which one is filled
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
    setFormVisible(false);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="container1">
      
      <form className="form" onSubmit={handleFormSubmit}>
      <div className="button-group">
        <button type="button" className="back-button" onClick={onBack}>
          <span>&#8592;</span>
        </button>
        <button className="quit-button" onClick={handleQuitClick}>X</button>
      </div>
      <div className="form-title-container">
        <h4 className="form-title">Réservation</h4>
      </div>
        <div className="form-group">
          <label htmlFor="facility" className="required-label">
            Choisissez une salle
          </label>
          <select
            id="facility"
            className="input"
            value={facility}
            onChange={(e) => {
              setFacility(e.target.value);
              setFormData({ ...formData, facility: e.target.value });
            }}
          >
            <option value="">Sélectionner une salle</option>
            <option value="A8">Amphi A8</option>
            <option value="audito">Auditorium</option>
          </select>
          {errors.facility && <p className="error-message">{errors.facility}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="motif" className="required-label">
            Motifs de réservation
          </label>
          <select
            id="motif"
            className="input"
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
            className=" textarea"
            value={otherMotif}
            onChange={(e) => {
              setOtherMotif(e.target.value);
              setFormData({ ...formData, otherMotif: e.target.value });
            }}
            rows="6"
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
            style={{ display: 'none' }} // Hide the default file input
            multiple // Enable multiple file selection
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
  );
};

export default ReserverSalleform;
