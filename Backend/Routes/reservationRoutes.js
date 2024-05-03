import express from "express";
import {
  addReservation,
  deleteReservation,
  findAllReservations,
  findOneReservation,
  updateReservation,
  updateState
} from "../Controllers/reservationController.js";

// Creating an Express router instance
const router = express.Router();

// Endpoint for adding a new reservation
router.post("/", addReservation);

// Endpoint for retrieving all reservations
router.get("/", findAllReservations);

// Endpoint for retrieving a specific reservation by ID
router.get("/:id", findOneReservation);

// Endpoint for updating reservation state
router.put("/:id/update-state", updateState);

// Endpoint for updating a reservation
router.put("/:id", updateReservation);

// Endpoint for deleting a reservation by ID
router.delete("/:id", deleteReservation);

export default router; 
