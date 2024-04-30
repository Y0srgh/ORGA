import express from "express";
import {
  addReservation,
  deleteReservation,
  findAllReservations,
  findOneReservation,
  updateReservation,
  
  
} from "../Controllers/reservationController.js";

// Creating an Express router instance
const router = express.Router();

// Endpoint for adding a new reservation
router.post("/", addReservation);

// Endpoint for retrieving all reservations
router.get("/", findAllReservations);

// Endpoint for retrieving a specific reservation by ID
router.get("/:id", findOneReservation);





// Endpoint for deleting a reservation by ID
router.delete("/:id", deleteReservation);





export default router;