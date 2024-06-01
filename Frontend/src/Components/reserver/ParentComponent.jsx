import React, { useState } from 'react';
import ReserverTimeDate from "./ReserverTimeDate";
import ReserverSalleform from "./ReserverSalleform";
import ReservationDetails from "./DetailsReservation";

function ParentComponent() {
  const [reserverTimeDateSubmitted, setReserverTimeDateSubmitted] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({ date: null, time: null, club: null, facility: null, motif: null });

  const handleReservationTimeDateSubmit = (date, time, club) => {
    setReserverTimeDateSubmitted(true);
    setReservationDetails(prevState => ({ ...prevState, date, time, club }));
  };

  const handleReservationSalleformSubmit = (facility, motif) => {
    setShowReservationDetails(true);
    setReservationDetails(prevState => ({ ...prevState, facility, motif }));
  };

  const handleBackToTimeDate = () => {
    setReserverTimeDateSubmitted(false);
    setShowReservationDetails(false);
  };

  const handleBackToSalleForm = () => {
    setShowReservationDetails(false);
  };

  return (
    <div>
      {!reserverTimeDateSubmitted && (
        <ReserverTimeDate onSubmit={handleReservationTimeDateSubmit} />
      )}
      {reserverTimeDateSubmitted && !showReservationDetails && (
        <ReserverSalleform 
          onSubmit={handleReservationSalleformSubmit} 
          onBack={handleBackToTimeDate} 
          date={reservationDetails.date} 
          time={reservationDetails.time} 
        />
      )}
      {showReservationDetails && (
        <ReservationDetails
          date={reservationDetails.date}
          time={reservationDetails.time}
          facility={reservationDetails.facility}
          club={reservationDetails.club}
          motif={reservationDetails.motif}
          onBack={handleBackToSalleForm}
          onQuit={() => setShowReservationDetails(false)}
        />
      )}
    </div>
  );
}

export default ParentComponent;
