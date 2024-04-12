import mongoose from "mongoose";

const clubSchema = mongoose.Schema(
  {
    clubName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Club = mongoose.model("club", clubSchema);
