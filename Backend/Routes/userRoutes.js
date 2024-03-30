import express from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updatePassword,
  updateUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", findAllUsers);
router.get("/:id", findOneUser);
router.put("/update-password/:id", updatePassword);
router.put("/update-details/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;