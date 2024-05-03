import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true, // Date of the reservation
    },
    time: {
      type: String,
      required: true, // Time of the reservation
    },
    motive: {
      type: String,
      required: true, // Motive for the reservation
    },
    state: {
      type: String,
      enum: ["En attente", "Approuvée", "Refusée" ,"Annulée"], // State of the reservation
      default: "En attente", // Default state is pending
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility", // Reference to the facility collection
      required: true, // Reference to the facility for which the reservation is made
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Reference to the user who made the reservation
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null, 
      },
  },
  {
    timestamps: true,
  }
);

export const Reservation = mongoose.model("reservations", reservationSchema);
