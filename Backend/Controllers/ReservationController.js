import { Reservation } from "../Models/reservationModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Configurations/config.js";
import moment from 'moment';
import { Salle } from "../Models/facilityModel.js";

export const addReservation = async (req, res) => {
  try {
    // Destructure request body to extract reservation data
    const { facility, motive, date, time, state, club, userId } = req.body;

    // Create a new reservation with the user ID
    const newReservation = new Reservation({
      date,
      time,
      motive,
      facility,
      state,
      club,
      userId,
    });

    const savedReservation = await newReservation.save();

    return res.status(201).json(savedReservation);
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

    return res.status(200).json({ message: "Réservation supprimée avec succès." });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de la réservation.",
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
    return res.status(200).json(reservation);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { facility, motive, date, time, club } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { facility, motive, date, time, club },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    return res.status(200).json({ message: "Réservation mise à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour de la réservation.",
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

    return res.status(200).json({ message: "État de la réservation mis à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour de l'état de la réservation.",
    });
  }
};

export const findReservationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.find({ userId });

    if (!reservations.length) {
      return res.status(404).json({ message: "Aucune réservation trouvée pour cet utilisateur." });
    }

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

// Time overlap function
const timesOverlap = (time1, time2) => {
  const [start1, end1] = time1.split('-').map(t => moment(t.trim(), 'hh:mm A'));
  const [start2, end2] = time2.split('-').map(t => moment(t.trim(), 'hh:mm A'));
  return start1.isBefore(end2) && start2.isBefore(end1);
};

export const getAvailableFacilities = async (req, res) => {
  try {
    const { date, time } = req.query;
    
    console.log("hello",req.query);
    const reservations = await Reservation.find({ date });
    
    const approvedReservations = reservations.filter(reservation => reservation.state === "Approuvée");
    const pendingReservations = reservations.filter(reservation => reservation.state === "En attente");

    const overlappingApprovedReservations = approvedReservations.filter(reservation => timesOverlap(reservation.time, time));
    const overlappingPendingReservations = pendingReservations.filter(reservation => timesOverlap(reservation.time, time));

    // Extract the facility names from the overlapping reservations
    const reservedFacilityNames = overlappingApprovedReservations.map(reservation => reservation.facility);
    const pendingFacilityNames = overlappingPendingReservations.map(reservation => reservation.facility);

    // Find all facilities
    const allFacilities = await Salle.find();

    // Filter out reserved facilities
    const availableFacilities = allFacilities.filter(facility => !reservedFacilityNames.includes(facility.label));

    // Return the available and pending facilities
    return res.status(200).json({ 
      availableFacilities,
      pendingFacilities: pendingFacilityNames 
    });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des salles disponibles.",
    });
  }
};
