import express from "express";
import {
  addSalle,
  deleteSalle,
  findAllSalles,
  findOneSalle,
  updateSalle,
} from "../Controllers/facilityController.js";

// Creating an Express router instance
const salleRouter = express.Router();

// Endpoint for adding a new salle
salleRouter.post("/", addSalle);

// Endpoint for retrieving all salles
salleRouter.get("/", findAllSalles);

// Endpoint for retrieving a specific salle by ID
salleRouter.get("/:id", findOneSalle);

// Endpoint for updating a salle's details by ID
salleRouter.put("/:id", updateSalle);

// Endpoint for deleting a salle by ID
salleRouter.delete("/:id", deleteSalle);


// Exporting the router to make it available for other modules
export default salleRouter;