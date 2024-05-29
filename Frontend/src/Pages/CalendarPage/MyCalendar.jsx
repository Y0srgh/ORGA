import React from "react";
import moment from "moment";
import Calendar from "../Calendar";
import "./calendarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
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
  return (
    <div className="calendar-container">
      <button
        className="reservation-btn"
        onClick={() => {
          console.log("Réserver");
          navigate("/reserver");
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Réserver
      </button>
      <Calendar
        events={events}
        defaultView={"month"}
        views={["month", "week", "day"]}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
