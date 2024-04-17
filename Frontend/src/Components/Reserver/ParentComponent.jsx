import React, { useState } from 'react';
import ReserverTimeDate from './ReserverTimeDate';
import ReserverSalleform from './ReserverSalleform';
import ReservationDetails from './DetailsReservation'; 

function ParentComponent() {
  const [reserverTimeDateSubmitted, setReserverTimeDateSubmitted] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ date: null, time: null, salle: null, motif: null });

  const handleReservationTimeDateSubmit = (date, time) => {
    // Handle logic when ReservationTimeDate form is submitted
    setReserverTimeDateSubmitted(true);
    setReservationDetails(prevState => ({ ...prevState, date, time }));
  };

  const handleReservationSalleformSubmit = (salle, motif) => {
    // Handle logic when ReservationSalleform form is submitted
    setShowReservationDetails(true); // Set state to show reservation details after salle form submission
    setReservationDetails(prevState => ({ ...prevState, salle, motif }));
  };

  const handleBackToTimeDate = () => {
    // Handle navigating back to ReserverTimeDate form
    setReserverTimeDateSubmitted(false);
    setShowReservationDetails(false);
  };

  const handleBackToSalleForm = () => {
    // Handle navigating back to ReserverSalleform from ReservationDetails
    setShowReservationDetails(false);
  };

  // Define functions for handling input changes
  const handleDateChange = (date) => {
    console.log('Date changed to:', date);
    // Implement your logic here
  };

  const handleTimeChange = (time) => {
    console.log('Time changed to:', time);
    // Implement your logic here
  };

  const handleClubChange = (club) => {
    console.log('Club changed to:', club);
    // Implement your logic here
  };

  return (
    <div>
      {!reserverTimeDateSubmitted && (
        <ReserverTimeDate onSubmit={handleReservationTimeDateSubmit} onDateChange={handleDateChange} onTimeChange={handleTimeChange} />
      )}
      {reserverTimeDateSubmitted && !showReservationDetails && (
        <ReserverSalleform onSubmit={handleReservationSalleformSubmit} onBack={handleBackToTimeDate} />
      )}
      {showReservationDetails && (
        <ReservationDetails
          date={reservationDetails.date}
          time={reservationDetails.time}
          salle={reservationDetails.salle}
          motif={reservationDetails.motif}
          onBack={handleBackToSalleForm}
        />
      )}
    </div>
  );
}

export default ParentComponent;
