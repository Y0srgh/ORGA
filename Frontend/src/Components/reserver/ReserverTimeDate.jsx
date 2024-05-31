import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from "yup";
import "./Reserver.css";

// Define the validation schema using yup
const schema = yup.object().shape({
  date: yup.date().required("Veuillez choisir une date"),
  time: yup
    .string()
    .matches(
      /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(?:AM|PM)\s*-\s*(0?[1-9]|1[0-2]):([0-5]\d)\s?(?:AM|PM)$/i,
      "Veuillez saisir l'heure dans ce format 'HH:MM-HH:MM AM/PM'"
    )
    .required("Veuillez saisir le temps de la réservation"),
});

function ReserverTimeDate({ onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: "09:00 AM - 10:30 AM",
    club: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserClub = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5500/users/${userId}`);
        const user = response.data;
        setFormData((prevState) => ({
          ...prevState,
          club: user.clubName || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserClub();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container1">
      
      <form className="form" onSubmit={handleFormSubmit}>
      <div className="form-title-container">
        <h4 className="form-title">Réservation</h4>
      </div>
        <div className="form-group">
          <label htmlFor="date" className="required-label">Date</label>
          <div className="input-container">
            <input
              type="date"
              id="date"
              name="date"
              className="input"
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="time" className="required-label">Temps</label>
          <div className="input-container">
            <input
              type="text"
              id="time"
              name="time"
              className="input"
              value={formData.time}
              onChange={handleInputChange}
            />
            {errors.time && <p className="error-message">{errors.time}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="club" className="label">Club</label>
          <div className="input-container">
            <input
              type="text"
              id="club"
              name="club"
              className="input"
              value={formData.club}
              onChange={handleInputChange}
              readOnly
            />
          </div>
        </div>

        <div className="info-message">
          Les réservations doivent être effectuées le mercredi après-midi ou le week-end, sauf exception.
        </div>

        <button type="submit" className="button">Suivant</button>
      </form>
    </div>
  );
}

export default ReserverTimeDate;
