import mongoose from "mongoose"; // Import Mongoose for MongoDB interaction
// Importer l'URL de MongoDB et la configuration du port
import { mongoDBURL, PORT } from "./Configurations/config.js"; 
import  cors  from "cors";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
// Import Express framework
import express from "express"; 
export const app = express(); 

// Middleware pour l'analyse du corps de la requête (parsing request body)
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials:true,
    })
);
// Mount userRoutes middleware at the '/users' path
app.use('/users',userRoutes);

// Middleware for handling CORS POLICY
// option 1: Allow All Origins with Default of cors(*)
//app.use(cors());



// Option 2: Allow Custom Origins
/*app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)*/
// Middleware for parsing cookies
app.use(cookieParser());
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
