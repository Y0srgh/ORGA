import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Reserver.css";
import { useParams,useNavigate } from 'react-router-dom';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";

registerLocale("fr", fr);
const EditReservation = () => {
  const [formData, setFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const { reservationId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {

    // Fetch reservation details using reservationId
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/reservations/${reservationId}`);
        const reservationData = response.data; // Assuming response contains reservation data
        setFormData(reservationData);
        console.log("data fetched",reservationData);
        setSelectedDate(moment(reservationData.date).toDate());
      } catch (error) {
        console.error('Error fetching reservation details:', error);
      }
        try {
          const response = await axios.get("http://localhost:5500/facilities");
          setFacilities(response.data.data);
          console.log("facilities fetched",response.data.data);
        } catch (error) {
          console.error('Error fetching facilities:', error);
        }
      
    };

    fetchReservationDetails();
  }, [reservationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData(prevState => ({
      ...prevState,
      date: moment(date).toISOString() // Convert date to ISO string format
    }));
  };

  const handleReservationState = async (reservationId) => {
    try {
      const response = await axios.put(
        `http://localhost:5500/reservations/${reservationId}/update-state`,
        { state: "En attente" }
      );
      console.log(response.data.message);
      
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleSubmit = async () => {
    try {
     
        handleReservationState(reservationId);
        
     const response = await axios.put(`http://localhost:5500/reservations/${reservationId}`, formData);

      console.log('Reservation updated successfully:', response.data);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error updating reservation:', error);
      setSubmissionStatus('failed');
    }
  };
  const handleCloseForm = () => {
    navigate('/calendar');
  };

  return (
    <div className="container">
      <div className="button-group">
        <button className="quit-button"  onClick={handleCloseForm}>X</button>
      </div>
      <h4 className="form-title">Modifier la Réservation</h4>
      <div className="form-group">
        <label htmlFor="club" className="label">Club</label>
        <input type="text" id="club" name="club" value={formData.club || ''}  readonly />
      </div>
      <div className="form-group">
        <label htmlFor="salle" className="label">Salle n°</label>
        <select id="salle" name="facility" value={formData.facility || ''} onChange={handleInputChange}>
          <option value="">{formData.facility}</option>
          {facilities.map(facility => (
            <option key={facility._id} value={facility.label}>{facility.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="motive" className="label">Motifs de réservation</label>
        <textarea id="motive" name="motive" rows="5" cols="20" value={formData.motive || ''} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="label">Date</label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="form-control" // Add any additional CSS classes here
          locale="fr"
        />
      </div>
      <div className="form-group">
        <label htmlFor="time" className="label">Temps</label>
        <input type="text" id="time" name="time" value={formData.time || ''} onChange={handleInputChange} />
      </div>
      {submissionStatus === 'success' && (
        <div className="popup success">
          <p>Réservation mise à jour avec succès!</p>
        </div>
      )}
      {submissionStatus === 'failed' && (
        <div className="popup failed">
          <p>Échec de la mise à jour de la réservation. Veuillez réessayer.</p>
        </div>
      )}
      <button type="button" className="button" onClick={handleSubmit}>Enregistrer les modifications</button>
    </div>
  );
};

export default EditReservation;
