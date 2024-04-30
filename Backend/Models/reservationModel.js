import mongoose from "mongoose";

// Définition du schéma de réservation
const reservationSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    temps: {
        type: String,
        required: true,
    },
    motif: {
        type: String,
        required: true,
    },
    salle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salles', 
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true,
    },
    club: {
        type: String,
        required: true,
    }
});

// Définition du modèle de réservation
const Reservation = mongoose.model("Reservation", reservationSchema);

// Export du modèle de réservation
export default Reservation;






