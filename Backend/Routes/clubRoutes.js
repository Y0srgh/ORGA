import express from "express";
import {
  createClub,
  deleteClub,
  getAllClub,
  getClub,
  updateClub,
} from "./../Controllers/clubContoller.js";

const router = express.Router();
router.post("/", createClub);
router.get("/:id", getClub);
router.get("/", getAllClub);
router.put("/:id", updateClub);
router.delete("/:id", deleteClub);
export default router;
