import { Reservation } from "../Models/reservationModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Configurations/config.js";

export const addReservation = async (req, res) => {
  try {
    // Extract user ID from token
    const token = req.headers.authorization.split(" ")[1];
    console.log("token",token);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    console.log("hey",userId);
    // Destructure request body to extract reservation data
    const { facility, motive, date, time } = req.body;

    // Create a new reservation with the user ID
    const newReservation = await Reservation.create({
      facility,
      motive,
      date,
      time,
      userId,
    });

    return res.status(201).json(newReservation);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de la réservation.",
    });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    return res
      .status(200)
      .json({ message: "Réservation supprimée avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de la réservation.",
    });
  }
};

export const findAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    return res.status(200).json({
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des réservations.",
    });
  }
};

export const findOneReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    return res.status(200).json(reservation);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { facility, motive, date, time } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { facility, motive, date, time },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    return res
      .status(200)
      .json({ message: "Réservation mise à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de la réservation.",
    });
  }
};

export const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { state },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    return res
      .status(200)
      .json({ message: "État de la réservation mis à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'état de la réservation.",
    });
  }
};
