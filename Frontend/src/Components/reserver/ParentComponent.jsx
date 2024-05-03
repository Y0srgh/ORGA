import React, { useState } from 'react';
import ReserverTimeDate from "./ReserverTimeDate";
import ReserverSalleform from "./ReserverSalleform";
import ReservationDetails from "./DetailsReservation";

function ParentComponent() {
  const [reserverTimeDateSubmitted, setReserverTimeDateSubmitted] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ date: null, time: null, club: null });

  const handleReservationTimeDateSubmit = (date, time, club) => {
    // Handle logic when ReservationTimeDate form is submitted
    setReserverTimeDateSubmitted(true);
    setReservationDetails(prevState => ({ ...prevState, date, time, club }));
  };

  const handleReservationSalleformSubmit = (facility, motive) => {
    // Handle logic when ReservationSalleform form is submitted
    setShowReservationDetails(true); // Set state to show reservation details after salle form submission
    setReservationDetails(prevState => ({ ...prevState, facility, motive }));
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

  return (
    <div>
      {!reserverTimeDateSubmitted && (
        <ReserverTimeDate onSubmit={handleReservationTimeDateSubmit} />
      )}
      {reserverTimeDateSubmitted && !showReservationDetails && (
        <ReserverSalleform onSubmit={handleReservationSalleformSubmit} onBack={handleBackToTimeDate} />
      )}
      {showReservationDetails && (
        <ReservationDetails
          facility={reservationDetails.facility}
          date={reservationDetails.date}
          time={reservationDetails.time}
          club={reservationDetails.club}
          motive={reservationDetails.motive}
          onBack={handleBackToSalleForm}
        />
      )}
    </div>
  );
}

export default ParentComponent;
