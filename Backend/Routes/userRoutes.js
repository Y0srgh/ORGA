import express from "express";
import {
  addUser,
  findAllUsers,
  findOneUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", findAllUsers);
router.get("/:id", findOneUser);



export default router;