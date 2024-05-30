/* import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "../Calendar";
import "./calendarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const events = [
  {
    start: moment("2024-05-01T09:00:00").toDate(),
    end: moment("2024-05-01T10:00:00").toDate(),
    title: "Auditorium",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-01T11:00:00").toDate(),
    end: moment("2024-05-01T12:00:00").toDate(),
    title: "A7",
    state: "Annulée",
  },
  {
    start: moment("2024-05-02T10:00:00").toDate(),
    end: moment("2024-05-02T11:00:00").toDate(),
    title: "A8",
    state: "Refusée",
  },
  {
    start: moment("2024-05-02T14:00:00").toDate(),
    end: moment("2024-05-02T15:00:00").toDate(),
    title: "Salle de conférence",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-03T08:30:00").toDate(),
    end: moment("2024-05-03T09:30:00").toDate(),
    title: "221",
    state: "Annulée",
  },
  {
    start: moment("2024-05-03T13:00:00").toDate(),
    end: moment("2024-05-03T14:00:00").toDate(),
    title: "A9",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-04T09:00:00").toDate(),
    end: moment("2024-05-04T10:00:00").toDate(),
    title: "A6",
    state: "En attente",
  },
  {
    start: moment("2024-05-04T11:00:00").toDate(),
    end: moment("2024-05-04T12:00:00").toDate(),
    title: "105",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-05T08:00:00").toDate(),
    end: moment("2024-05-05T09:00:00").toDate(),
    title: "Hall",
    state: "En attente",
  },
  {
    start: moment("2024-05-05T10:00:00").toDate(),
    end: moment("2024-05-05T11:00:00").toDate(),
    title: "CA7",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-06T10:00:00").toDate(),
    end: moment("2024-05-06T11:30:00").toDate(),
    title: "A8",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-07T09:00:00").toDate(),
    end: moment("2024-05-07T10:00:00").toDate(),
    title: "Salle de conférence 2",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-07T11:30:00").toDate(),
    end: moment("2024-05-07T12:30:00").toDate(),
    title: "A5",
    state: "Annulée",
  },
  {
    start: moment("2024-05-08T08:00:00").toDate(),
    end: moment("2024-05-08T09:00:00").toDate(),
    title: "A4",
    state: "Approuvée",
  },
  {
    start: moment("2024-05-08T13:30:00").toDate(),
    end: moment("2024-05-08T14:30:00").toDate(),
    title: "A2",
    state: "Refusée",
  },
  {
    start: moment("2024-05-09T10:00:00").toDate(),
    end: moment("2024-05-09T11:00:00").toDate(),
    title: "A1",
    state: "Approuvée",
  },
];

const colorsEvent = {
  "En attente": "#fcb96b",
  Annulée: "#fff493",
  Approuvée: "#a3f394",
  Refusée: "#fcacac",
};

export default function MyCalendar() {
  const navigate = useNavigate();
  const [EVENTS, setEVENTS] = useState([]);
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
    const userId = "logged-in-user-id";
    axios
      .get(`http://localhost:5500/reservations`)
      .then((response) => {
        //console.log('here');
        console.log(response.data.data);
        const fetchedEvents = response.data.data.map((event) => {
          const { date, time } = event;

          // Ensure the time is in the correct format and split it
          if (time && time.includes("-")) {
            const [startTime, endTime] = time.split("-").map((t) => t.trim());

            // Convert to 24-hour format and combine with date
            const start = moment(
              `${date.split("T")[0]} ${startTime}`,
              "YYYY-MM-DD hh:mm A"
            ).format("YYYY-MM-DDTHH:mm:ss");
            const end = moment(
              `${date.split("T")[0]} ${endTime}`,
              "YYYY-MM-DD hh:mm A"
            ).format("YYYY-MM-DDTHH:mm:ss");
            console.log(event._id,'&',date,'&',start,'&', end);

            return {
              start: moment(start).toDate(),
              end: moment(end).toDate(),
              title: event.facility,
              facility: event.facility,
              state: event.state,
              club: event.club,
              id: event._id,
            };
          }
        });
        console.log(fetchedEvents);
        

        setEVENTS(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
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
        onSelectEvent={event => {
          console.log(event.id);
          console.log(event);
          navigate(`/reservation/${event.id}`);
        }}
      />
    </div>
  );
}
 */

import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "../Calendar";
import "./calendarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


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
    const userIdLogIn = localStorage.getItem('userId');
    console.log(userIdLogIn);
    setUserIdLogIn(userIdLogIn);
    axios
      .get(`http://localhost:5500/reservations`)
      .then((response) => {
        const fetchedEvents = response.data.data.map((event) => {
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
        }).filter(event => event !== null);
        setEVENTS(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
    setShowModal(true);
  };
  const handleEditReservation = (event) => {
    console.log(event);
    
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Salle:</strong> {selectedEvent.facility}</p>
            <p><strong>État:</strong> {selectedEvent.state}</p>
            <p><strong>Club:</strong> {selectedEvent.club}</p>
            <p><strong>Date de début:</strong> {moment(selectedEvent.start).format('LLLL')}</p>
            <p><strong>Date de fin:</strong> {moment(selectedEvent.end).format('LLLL')}</p>
          </Modal.Body>
          <Modal.Footer>
          {selectedEvent.userId === userIdLogIn && (
              <Button variant="primary" onClick={()=>handleEditReservation(selectedEvent)}>
                Modifier
              </Button>
            )}
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
