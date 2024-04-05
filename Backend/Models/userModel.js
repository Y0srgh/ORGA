import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true, // the user name of the user
      unique: true
    },
    firstName: {
      type: String,
      required: true, // First name of the user
    },
    lastName: {
      type: String,
      required: true, // Last name of the user
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
      type:Number,
      enum: [1, 2, 3, 4, 5], // Enumerated levels of study (1-5)
      required: function () {
        return this.role === "Président"; // Level of study required only if the role is "Président"
      },
      default: null 
    },
    phoneNumber: {
      type: String,
      required: true, // Phone number of the user
      unique: true,
    },
    role: {
      type:String,
      enum: ["Président", "Admin", "Dvure"], // Enumerated roles for the user
      required: true,
    },
    StudentID: {
      type: String,
      required: function () {
        return this.role === "Président"; // Student ID
      },
      default: null 
    },
    clubs: {
      type: [String],
      required: function () {
        return this.role === "Président"; // Clubs information required only if the role is "Président"
      },
      default: null 
    },
  },
  {
    timestamps: true,
  }
);
/*
  Middleware to hash the password before saving the user to the database
*/
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  next();
});
/*
 Definition of the User model using the schema
*/

export const User = mongoose.model("user", userSchema);
