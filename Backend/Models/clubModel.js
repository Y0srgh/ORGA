import mongoose from "mongoose";

const clubSchema = mongoose.Schema(
  {
    clubName: {
      type: String,
      required: true,
      unique: true,
    },
    selected: {
      type: Boolean,
      default: false 
    }
  },
  {
    timestamps: true,
  }
);

export const Club = mongoose.model("club", clubSchema);
