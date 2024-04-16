import React, { useState } from 'react';
import ReserverTimeDate from './ReserverTimeDate';
import ReserverSalleform from './ReserverSalleform';
import ReservationDetails from './DetailsReservation'; // Import ReservationDetails component

function ParentComponent() {
  const [reserverTimeDateSubmitted, setReserverTimeDateSubmitted] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ date: null, time: null, salle: null, motif: null });

  const handleReservationTimeDateSubmit = () => {
    // Handle logic when ReservationTimeDate form is submitted
    // For example, you can set the reservationTimeDateSubmitted state to true
    setReserverTimeDateSubmitted(true);
  };

  const handleReservationSalleformSubmit = (date, time, salle, motif) => {
    // Handle logic when ReservationSalleform form is submitted
    // For example, you can perform any necessary action
    setShowReservationDetails(true); // Set state to show reservation details after salle form submission
    setReservationDetails({ salle, motif ,date, time}); // Save the submitted date, time, salle, and motif
  };

  return (
    <div>
      {!reserverTimeDateSubmitted && (
        <ReserverTimeDate onSubmit={handleReservationTimeDateSubmit} />
      )}
      {reserverTimeDateSubmitted && !showReservationDetails && (
        <ReserverSalleform onSubmit={handleReservationSalleformSubmit} />
      )}
      {showReservationDetails && (
        <ReservationDetails 
          date={reservationDetails.date} 
          time={reservationDetails.time} 
          salle={reservationDetails.salle} 
          motif={reservationDetails.motif} 
        />
      )}
    </div>
  );
}

export default ParentComponent;
