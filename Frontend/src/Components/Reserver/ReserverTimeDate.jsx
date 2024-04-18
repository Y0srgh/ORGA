import React, { useState } from "react";
import * as yup from "yup";
import "./Reserver.css";

// Define the validation schema using yup
const schema = yup.object().shape({
  date: yup.date().required("La date est requise"),
  time: yup
    .string()
    .matches(
      /^(0?[1-9]|1[0-2]):([0-5]\d)-(0?[1-9]|1[0-2]):([0-5]\d)\s?(?:AM|PM)$/i,
      "Veuillez saisir l'heure dans ce format 'HH:MM-HH:MM AM/PM'"
    )
    .required("Le temps est requis"),
  club: yup.string().required("Le choix d'un club est obligatoire"),
});

function ReserverTimeDate({ onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: "09:00-10:30 AM",
    club: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        onSubmit(formData.date, formData.time, formData.club);
      })
      .catch((error) => {
        const newErrors = {};
        error.inner.forEach((err) => {
          if (err.path === 'date' && formData.date === 'mm/dd/yyyy') {
            newErrors[err.path] = 'Veuillez sélectionner une date.'; 
          } else {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      });
  };
  
  

  return (
    <div className="container">
      <h4 className="form-title">Réservation</h4>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="date" className="required-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]} // Set min date to today
            onChange={handleInputChange}
          /></div>
          {errors.date && <p className="error-message">{errors.date}</p>}
        
        <div className="form-group">
          <label htmlFor="time" className="required-label">
            Temps
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          /></div>
          {errors.time && <p className="error-message">{errors.time}</p>}
        
        <div className="form-group">
          <label htmlFor="club" className="required-label">
            Choisissez le club
          </label>
          <select
            id="club"
            name="club"
            value={formData.club}
            onChange={handleInputChange}
          >
            <option value="">Select a club</option>
            <option value="Aerobotix">Aerobotix</option>
            <option value="IEEE">IEEE</option>
            {/* Option elements for clubs */}
          </select></div>
          {errors.club && <p className="error-message">{errors.club}</p>}
       
        <button type="submit" className="button">
          Suivant
        </button>
      </form>
    </div>
  );
}

export default ReserverTimeDate;
