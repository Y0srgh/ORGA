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
    },
    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export const Club = mongoose.model("club", clubSchema);
