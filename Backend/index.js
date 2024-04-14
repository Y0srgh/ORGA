import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { mongoDBURL, PORT } from "./Configurations/config.js";
import userRoutes from "./Routes/userRoutes.js";
import clubRoutes from "./Routes/clubRoutes.js";
import cron from "node-cron"; // Import the cron module
import "./cron/tokenCleanup.js"; // Import the cron job logic
import "./cron/usersCleanup.js"; // Import the cron job logic

export const app = express();

// Middleware for parsing request body
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount userRoutes middleware at the '/users' path
app.use("/users", userRoutes);

// Mount clubRoutes middleware at the '/clubs' path
app.use("/clubs", clubRoutes);

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

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT || 8080, () =>
      console.log(`Server running on port ${PORT || 8080} 🔥`)
    );

    // Schedule the cron job to run every 2 hours
    cron.schedule("15 * * * *", () => {
      tokenCleanup(); // Execute the cron job logic
      usersCleanup(); // Execute the cron job logic
    });
  })
  .catch((error) => {
    console.error(error);
  });
