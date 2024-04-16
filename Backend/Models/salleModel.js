import mongoose from "mongoose";

const salleSchema = mongoose.Schema(
  {
    numero: {
      type: Number,
      required: false, 
    },
    libelle : {
      type: String,
      required: true, 
    },
    capacity: {
        type: Number,
        required: true,
      },

    },

  {
    timestamps: true,
  }
);



export const Salle = mongoose.model("salle", salleSchema);
