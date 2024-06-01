import express from "express";
import {
  addReservation,
  deleteReservation,
  findAllReservations,
  findOneReservation,
  updateReservation,
  updateState,
  findReservationsByUserId,
  getAvailableFacilities
} from "../Controllers/ReservationController.js";

const router = express.Router();

router.get('/available-facilities', getAvailableFacilities); // Define this route first
router.post("/", addReservation);
router.get("/", findAllReservations);
router.get("/:id", findOneReservation);
router.put("/:id/update-state", updateState);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.get('/user/:userId', findReservationsByUserId);

export default router;
