import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  try {
    // Destructure request body to extract user data
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      levelOfStudy,
      StudentID,
      clubs,
    } = req.body;

    // Check if all required fields are provided

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      //
      !phoneNumber ||
      !role
      //
      //
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    // Check if role is "Président" and required fields for students are missing
    if (role === "Président" && (!levelOfStudy || !StudentID || !clubs)) {
      return res
        .status(400)
        .json({
          message:
            "Veuillez fournir tous les champs requis pour le rôle de Président.",
        });
    }

    // Check if role is not "Président" but student-related fields are provided
    if (role === "Dvure" && (levelOfStudy || StudentID || clubs)) {
      return res
        .status(400)
        .json({
          message:
            "Vous ne pouvez pas ajouter des informations spécifiques aux étudiants.",
        });
    }

    // Check if user with the provided phone number already exists

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(409)
        .json({
          message: "Un utilisateur avec ce numéro de téléphone existe déjà.",
        });
    }
    // Creating a new user in the database

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      levelOfStudy,
      StudentID,
      clubs,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
    });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find({});
    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des utilisateurs.",
    });
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Vérification si l'utilisateur existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe haché
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du mot de passe de l'utilisateur :",
      error
    );
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du mot de passe.",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      levelOfStudy,
      StudentID,
      clubs,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !levelOfStudy ||
      !phoneNumber ||
      !role ||
      !StudentID ||
      !clubs
    ) {
      return res.status(400).json({
        message: "Veuillez fournir tous les champs requis",
      });
    }

    let updatedFields = {
      firstName,
      lastName,
      email,
      password,
      levelOfStudy,
      phoneNumber,
      role,
      StudentID,
      clubs,
    };
    // If password is provided, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    return res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérification si l'utilisateur existe
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de l'utilisateur.",
    });
  }
};
