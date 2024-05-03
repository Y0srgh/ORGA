import { Reservation } from "../Models/reservationModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Configurations/config.js";

export const addReservation = async (req, res) => {
  try {
    // Extract user ID from token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;

    // Destructure request body to extract reservation data
    const { salle, motif, date, time } = req.body;

    // Create a new reservation with the user ID
    const newReservation = await Reservation.create({
      salle,
      motif,
      date,
      time,
      user: userId,
    });

    return res.status(201).json(newReservation);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de la réservation.",
    });
  }
};


