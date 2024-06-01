import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    motive: {
      type: String,
      required: true,
    },
    facility: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["En attente", "Approuvée", "Refusée", "Annulée"],
      default: "En attente",
    },
    club: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation = mongoose.model("reservations", reservationSchema);
