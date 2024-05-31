


import mongoose from "mongoose"; // Import Mongoose for MongoDB interaction
import { mongoDBURL, PORT } from "./Configurations/config.js"; 
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import reservationRoutes from "./Routes/reservationRoutes.js";
import facilityRoutes from "./Routes/facilityRoutes.js";
import cookieParser from "cookie-parser";
import express from "express"; 

const app = express(); 

// Middleware for parsing request body
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', true); // Allow cookies
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(cookieParser());

// Mounting routes
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);
app.use('/facilities', facilityRoutes);

// Connect to MongoDB Atlas
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
    })
    .catch((error) => {
        console.error(error);
    });

export default app;
