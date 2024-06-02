import express from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updatePassword,
  updateUser,
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  updatePwd,
} from "../Controllers/userController.js";
import { User } from "../Models/userModel.js";
import multer from 'multer';

// Creating an Express router instance
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './uploads/profile_pictures') }, // Removed redundant return statement
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Removed redundant return statement
  }
});

const upload = multer({ storage: storage });

/*router.post('/update-profile', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Received request to update profile for user:', userName);

    if (!req.file) {
      console.log('No file provided in the request.');
      return res.status(400).json({ message: "File not provided." });
    }

    const file = req.file.filename;
    console.log('File received:', file);

    const existingUser = await User.findOne({ _id:id });
    if (!existingUser) {
      console.log('User not found:', userName);
      return res.status(404).json({ message: "User not found." });
    }

    console.log('User found:', existingUser);

    existingUser.profilePicture = file;
    await existingUser.save();

    console.log('Profile picture updated successfully for user:', userName);

    return res.status(200).json({ message: "Votre demande a été enregistrée.", file });

  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: error.message });
  }
});
*/

router.post('/update-profile/:id', upload.single('file'), async (req, res) => {
  try {
    //const { userName }= req.body
    const { id }= req.params
    if (!req.file) {
      return res.status(400).json({ message: "File not provided." });
    }

    console.log(req.file);
    // Retrieve file name from multer

    // Check if file field exists in request
    if (!req.file) {
      return res.status(400).json({ message: "File not provided." });
    }
    const file = req.file.filename;

    console.log("file", file);

    const existingUser = await User.findOne({
      _id:id,
    });

    existingUser.profilePicture = file;
    await existingUser.save();


    return res.status(200).json({ message: "Votre demande a été enregistrée." });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Endpoint for adding a new user
router.post("/", addUser);

router.post("/register", registerUser);

// Endpoint for retrieving all users
router.get("/", findAllUsers);

// Endpoint for retrieving a specific user by ID
router.get("/:id", findOneUser);

// Endpoint for updating a user's password 
router.post("/update-password/:token", updatePassword);
router.post("/modifier-password/:id", updatePwd);

// Endpoint for updating a user's details by ID
router.put("/update-details/:id", updateUser);

// Endpoint for deleting a user by ID
router.delete("/:id", deleteUser);
// Endpoint for logging in a user
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

//verify email link with token
router.get("/:id/verify/:token", verifyEmail);


// Exporting the router to make it available for other modules
export default router;