import mongoose from "mongoose"; // Import Mongoose for MongoDB interaction
// Importer l'URL de MongoDB et la configuration du port
import { mongoDBURL, PORT } from "./Configurations/config.js"; 
import userRoutes from "./Routes/userRoutes.js";
// Import Express framework
import express from "express"; 
const app = express(); 

// Middleware pour l'analyse du corps de la requête (parsing request body)
app.use(express.json());
// Mount userRoutes middleware at the '/users' path
app.use('/users',userRoutes);
app.use(cors());
// Se connecter à la base de données MongoDB Atlas
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");

        // Start Express server to listen for incoming requests on specified port
        app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
    })
    .catch((error) => {
        console.error(error);
    });
