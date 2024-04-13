import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true, // the user name of the user
      unique: true,
    },
    firstName: {
      type: String,
      required: false, // First name of the user
    },
    lastName: {
      type: String,
      required: false, // Last name of the user
    },
    email: {
      type: String,
      required: true, // Email of the user
    },
    password: {
      type: String,
      required: true, // Password of the user
    },
    levelOfStudy: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // Enumerated levels of study (1-5)
      required: function () {
        return this.role === "Président"; // Level of study required only if the role is "Président"
      },
      default: null,
    },
    phoneNumber: {
      type: String,
      required: true, // Phone number of the user
      unique: true,
    },
    role: {
      type: String,
      enum: ["Président", "Admin", "Dvure"], // Enumerated roles for the user
      required: true,
    },
    StudentID: {
      type: String,
      required: function () {
        return this.role === "Président"; // Student ID
      },
      default: null,
    },
    clubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: function () {
        return this.role === "Président"; // Clubs information required only if the role is "Président"
      },
      default: null,
    }],
    verified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  next();
});

export const User = mongoose.model("user", userSchema);
