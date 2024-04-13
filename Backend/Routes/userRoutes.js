import express from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updatePassword,
  updateUser,
  registerUser,
  verifyEmail
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

// Endpoint for updating a user's password by ID
router.put("/update-password/:id", updatePassword);

// Endpoint for updating a user's details by ID
router.put("/update-details/:id", updateUser);

// Endpoint for deleting a user by ID
router.delete("/:id", deleteUser);

//verify email link with token
router.get("/:id/verify/:token", verifyEmail);


// Exporting the router to make it available for other modules
export default router;