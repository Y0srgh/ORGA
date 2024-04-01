import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { mongoDBURL, PORT } from "./Configurations/config.js";
import userRoutes from "./Routes/userRoutes.js";

export const app = express();

// Middleware for parsing request body
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount userRoutes middleware at the '/users' path
app.use('/users', userRoutes);

// Set up route to handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Set up middleware to add CORS headers to all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
    })
    .catch((error) => {
        console.error(error);
    });