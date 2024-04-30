import { Reservation } from "../Models/reservationModel.js";
import Salle from "../Models/salleModel.js";
import User from "../Models/userModel.js";

export const addReservation = async (req, res) => {
  try {
    const { date, temps, motif, salle, user, club } = req.body;

    if (!date || !temps || !motif || !salle || !user || !club) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }


    const newReservation = await Reservation.create({
      date,
      temps,
      motif,
      salle,
      user,
      club,
    });

    return res.status(201).json(newReservation);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de la réservation.",
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
      message: "Une erreur est survenue lors de la récupération des réservations.",
    });
  }
};


export const findOneReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }
    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }
    return res.status(200).json({ message: "Réservation supprimée avec succès." });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de la réservation.",
    });
  }
};
          
