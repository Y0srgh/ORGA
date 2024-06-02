import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { mongoDBURL, PORT } from "./Configurations/config.js";
import userRoutes from "./Routes/userRoutes.js";
import clubRoutes from "./Routes/clubRoutes.js";
import cron from "node-cron"; // Import the cron module
import "./cron/tokenCleanup.js"; // Import the cron job logic
import "./cron/usersCleanup.js"; // Import the cron job logic
import reservationRoutes from "./Routes/reservationRoutes.js";
import facilityRoutes from "./Routes/facilityRoutes.js";
import cookieParser from "cookie-parser";

const app = express(); // Initialize Express framework

// Middleware for parsing request body
app.use(express.json());

app.use(express.static('uploads/profile_pictures'))


// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware for parsing cookies
app.use(cookieParser());

// Mount routes middleware
app.use("/users", userRoutes);
app.use("/clubs", clubRoutes);
app.use('/reservations', reservationRoutes);
app.use('/facilities', facilityRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT || 8080, () =>
      console.log(`Server running on port ${PORT || 8080} 🔥`)
    );

    // Schedule the cron job to run every 2 hours
    cron.schedule("*/2 * * * *", () => {
      tokenCleanup(); // Execute the cron job logic
      usersCleanup(); // Execute the cron job logic
    });
  })
  .catch((error) => {
    console.error(error);
  });

export default app; // Export the app for testing or further usage
