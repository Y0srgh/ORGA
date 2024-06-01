import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "../Calendar";
import "./calendarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const colorsEvent = {
  "En attente": "#fcb96b",
  Annulée: "#fff493",
  Approuvée: "#a3f394",
  Refusée: "#fcacac",
};

export default function MyCalendar() {
  const navigate = useNavigate();
  const [EVENTS, setEVENTS] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userIdLogIn, setUserIdLogIn] = useState([]);
  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {};
    style.backgroundColor = colorsEvent[event.state];
    style.display = "flex";
    style.alignItems = "center";
    style.justifyContent = "center";
    style.textAlign = "center";
    style.padding = "4px";
    style.borderRadius = "8px";
    style.height = "25px";
    return { style };
  };

  useEffect(() => {
    const userIdLogIn = localStorage.getItem("userId");
    console.log(userIdLogIn);
    setUserIdLogIn(userIdLogIn);
    axios
      .get(`http://localhost:5500/reservations`)
      .then((response) => {
        const fetchedEvents = response.data.data
          .map((event) => {
            const { date, time } = event;
            if (time && time.includes("-")) {
              const [startTime, endTime] = time.split("-").map((t) => t.trim());
              const start = moment(
                `${date.split("T")[0]} ${startTime}`,
                "YYYY-MM-DD hh:mm A"
              ).format("YYYY-MM-DDTHH:mm:ss");
              const end = moment(
                `${date.split("T")[0]} ${endTime}`,
                "YYYY-MM-DD hh:mm A"
              ).format("YYYY-MM-DDTHH:mm:ss");
              return {
                start: moment(start).toDate(),
                end: moment(end).toDate(),
                title: event.facility,
                facility: event.facility,
                state: event.state,
                club: event.club,
                id: event._id,
                userId: event.userId,
              };
            }
            return null;
          })
          .filter((event) => event !== null);
        setEVENTS(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  const handleCancelReservation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5500/reservations/${selectedEvent.id}/update-state`,
        { state: "Annulée" }
      );
      console.log(response.data.message);
      // Update the local state of the event
      const updatedEvents = EVENTS.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, state: "Annulée" }
          : event
      );
      setEVENTS(updatedEvents);
      handleCloseModal();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleSelectEvent = (event) => {

    console.log(event);
    console.log(new Date(event.start));

    setSelectedEvent(event);
    setShowModal(true);
  };
  const handleEditReservation = (event) => {
    const reservationId = event.id;
    console.log(reservationId);
    navigate(`/reserver/edit-reservation/${reservationId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <button
        className="reservation-btn"
        onClick={() => {
          navigate("/reserver");
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Réserver
      </button>
      <Calendar
        events={EVENTS}
        defaultView={"month"}
        views={["month", "week", "day"]}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="custom-modal"
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">
              {selectedEvent.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="modal-detail">
              <span className="modal-detail-label">
                <strong>Salle</strong>
              </span>
              <input
                type="text"
                className="modal-detail-value"
                value={selectedEvent.facility}
                readOnly
              />
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">
                <strong>État</strong>
              </span>
              <input
                type="text"
                className="modal-detail-value"
                value={selectedEvent.state}
                readOnly
              />
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">
                <strong>Club</strong>
              </span>
              <input
                type="text"
                className="modal-detail-value"
                value={selectedEvent.club}
                readOnly
              />
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">
                <strong>Date de début</strong>
              </span>
              <input
                type="text"
                className="modal-detail-value"
                value={moment(selectedEvent.start).format("LLLL")}
                readOnly
              />
            </div>
            <div className="modal-detail">
              <span className="modal-detail-label">
                <strong>Date de fin</strong>
              </span>
              <input
                type="text"
                className="modal-detail-value"
                value={moment(selectedEvent.end).format("LLLL")}
                readOnly
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
           {selectedEvent.userId === userIdLogIn &&
  selectedEvent.state !== "Approuvée" &&
  (new Date(selectedEvent.start) > new Date()) && (  
    <Button
      variant="secondary"
      onClick={() => handleEditReservation(selectedEvent)}
      className="button"
    >
      Modifier
    </Button>
)}
              {selectedEvent.userId === userIdLogIn &&
              (selectedEvent.state == "Approuvée" || selectedEvent.state == "En attente")  && (
            <Button
              variant="secondary"
              onClick={handleCancelReservation}
              className="button"
            >
              Annuler
            </Button>)}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
