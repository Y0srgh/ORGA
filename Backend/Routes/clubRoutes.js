import express from "express";
import {
  createClub,
  deleteClub,
  findAllClubs,
  findClubById,
  updateClub,
} from "./../Controllers/clubContoller.js";

const router = express.Router();
router.post("/", createClub);
router.get("/:id", findClubById);
router.get("/", findAllClubs);
router.put("/:id", updateClub);
router.delete("/:id", deleteClub);
export default router;
