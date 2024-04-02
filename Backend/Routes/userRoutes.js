import express from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updatePassword,
  updateUser,
  loginUser,
  forgotPassword,
} from "../Controllers/userController.js";

// Creating an Express router instance
const router = express.Router();

// Endpoint for adding a new user
router.post("/", addUser);

// Endpoint for retrieving all users
router.get("/", findAllUsers);

// Endpoint for retrieving a specific user by ID
router.get("/:id", findOneUser);

// Endpoint for updating a user's password 
router.put("/update-password", updatePassword);

// Endpoint for updating a user's details by ID
router.put("/update-details/:id", updateUser);

// Endpoint for deleting a user by ID
router.delete("/:id", deleteUser);
// Endpoint for logging in a user
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

// Exporting the router to make it available for other modules
export default router;