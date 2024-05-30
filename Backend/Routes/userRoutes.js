import express from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updatePassword,
  updateUser,
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
} from "../Controllers/userController.js";

// Creating an Express router instance
const router = express.Router();

// Endpoint for adding a new user
router.post("/", addUser);

router.post("/register", registerUser);

// Endpoint for retrieving all users
router.get("/", findAllUsers);

// Endpoint for retrieving a specific user by ID
router.get("/:id", findOneUser);

// Endpoint for updating a user's password 
router.post("/update-password/:token", updatePassword);

// Endpoint for updating a user's details by ID
router.put("/update-details/:id", updateUser);

// Endpoint for deleting a user by ID
router.delete("/:id", deleteUser);
// Endpoint for logging in a user
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

//verify email link with token
router.get("/:id/verify/:token", verifyEmail);


// Exporting the router to make it available for other modules
export default router;