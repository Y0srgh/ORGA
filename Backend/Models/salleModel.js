import mongoose from "mongoose";

const salleSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: false, 
    },
   
    capacity: {
        type: Number,
        required: true,
      },
    availiblity: {
        type: Boolean,
        required: true,
      },

    },

  {
    timestamps: true,
  }
);



export const Salle = mongoose.model("salle", salleSchema);
