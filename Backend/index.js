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

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware for parsing cookies
app.use(cookieParser());

// Set up route to handle OPTIONS requests for CORS preflight
app.options("*", cors());

// Set up middleware to add CORS headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

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
