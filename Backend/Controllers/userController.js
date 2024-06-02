import { User } from "../Models/userModel.js";
import { Club } from "../Models/clubModel.js";
import { Token } from "../Models/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import { updateSelected } from "./clubContoller.js";
import { JWT_SECRET } from "../Configurations/config.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import express from "express";



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
      studentId,
      clubs,
    } = req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !role
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    // Check if user with provided phone number already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({
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
      levelOfStudy: role === "Président" ? levelOfStudy : null, // Provide levelOfStudy only if the role is "Président"
      studentId: role === "Président" ? studentId : null, // Provide studentId only if the role is "Président"
      clubs: role === "Président" ? clubs : null, // Provide clubs only if the role is "Président"
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
    res.status(500).send({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    // Destructure request body to extract password and token
    const { password } = req.body;
    const { token } = req.params;
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const id = decodedToken.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const salt = await bcrypt.genSalt(10);

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe haché
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
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
      userName,
      email,
      mot_de_passe,
      phoneNumber,
      levelOfStudy,
      studentId,
      role,
      clubs,
    } = req.body;


    console.log("bodyyy",req.body);

    // Check if all required fields are provided
    if (
      !userName ||
      !email ||
      !phoneNumber
    ) {
      return res.status(400).json({
        message: "Veuillez fournir tous les champs requiseee",
      });
    }

   


    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(400).json({
        message:
          "Cet utilisateur n'existe pas",
      });
    }

    // Check if role is "Président" and required fields for students are missing
    /*if (role === "Président" && (!levelOfStudy || !studentId || !clubs)) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis pour le rôle de Président." });
    }*/

    // Check if role is not "Président" but student-related fields are provided
    if (role !== "Président" && (levelOfStudy || studentId || clubs)) {
      return res.status(400).json({
        message:
          "Vous ne pouvez pas mettre à jour des informations spécifiques aux étudiants pour un rôle autre que Président.",
      });
    }

    let updatedFields = {
      userName,
      email,
      password : mot_de_passe,
      phoneNumber,
      role,
      levelOfStudy,
      studentId: studentId,
      clubs,
    };
    // If password is provided, hash it
    if (mot_de_passe) {
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
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

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.clubs) {
      updateSelected(user);
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

export const registerUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      mot_de_passe,
      phoneNumber,
      role,
      levelOfStudy,
      studentId,
      clubs,
    } = req.body;
    console.log(req.body);

    // Check if all required fields are provided
    if (!userName || !email || !mot_de_passe || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    // Check if user with provided phone number already exists
    let existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({
        message: "Un utilisateur avec ce numéro de téléphone existe déjà.",
      });
    }

    existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        message: "Un utilisateur avec ce nom d'utilisateur existe déjà.",
      });
    }

    // Creating a new user in the database
    if (role === "Président") {
      existingUser = await User.findOne({ studentId });
      if (existingUser) {
        return res.status(400).json({
          message: "Un étudiant avec ce numéro d'inscription existe déjà.",
        });
      }

      if (!clubs || !studentId || !levelOfStudy) {
        console.log("clubs", clubs.length, "student", studentId, "level", levelOfStudy);
        return res
          .status(400)
          .json({ message: "Veuillez fournir tous les champs requiss." });
      }

      const newClubs = clubs.map(club => club.code)
      console.log(newClubs);

      var newUser = await User.create({
        userName,
        email,
        password : mot_de_passe,
        phoneNumber,
        role,
        levelOfStudy,
        studentId: studentId,
        clubs : newClubs,
      });

      let CLubs = [];
      // Parcourir la liste des identifiants de clubs et mettre à jour leur état "selected"
      for (const clubId of newClubs) {
        let club = await Club.findByIdAndUpdate(clubId, { selected: true });
        CLubs.push(club.clubName);
      }
      console.log("CLubs : ", CLubs);

      console.log("clubs : ", clubs);
    
      const token = await Token.create({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      const url = `http://localhost:5173/users/${newUser._id}/verify/${token.token}`;
      //await sendEmail(newUser.email, "Verifier votre Email", url);
      await sendEmail(
        newUser.email,
        "Verifier votre Email",
        url,
        newUser.studentId,
        newUser.levelOfStudy,
        CLubs
      );
    }
    // Si le rôle de l'utilisateur est "Dvure"
    if (role === "Dvure") {
      var newUser = await User.create({
        userName,
        email,
        password,
        phoneNumber,
        role,
        
      });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
    });
  }
};
/*
export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) {
      return res.status(404).json({ message: "Token invalide." });
    }
    await User.findByIdAndUpdate(user._id, {verified: true });
    await token.findByIdAndDelete(token._id);

    return res.status(200).json({ message: "Email vérifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la vérification de l'email.",
    });
  }
}*/
export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(404).json({ message: "Token invalide." });
    }
    await User.findByIdAndUpdate(user._id, { verified: true });
    //await Token.deleteOne({ _id: token._id }); // Remove the token from the database
    return res.status(200).json({ message: "Email vérifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la vérification de l'email.",
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    // envoi d'un email de réinitialisation du mot de passe
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zaynebfathalli1661@gmail.com",
        pass: "yzzq flkk iaka eckh",
      },
    });
    // Création du token avec une durée de validité de 5 minutes
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "5m" });
    // le contenu de l'email et les informations du destinataire
    var mailOptions = {
      from: "zaynebfathalli1661@gmail.com",
      to: email,
      subject: "Réinitialisation du mot de passe",
      // le lien qui redirige vers la page de réinitialisation
      text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : http://localhost:5173/reset-password/${token}`,
    };
    // envoi de l'email
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res.status(400).json({
          message: "Une erreur est survenue lors de l'envoi de l'email.",
        });
      } else {
        return res.status(200).json({ message: "Email envoyé avec succès." });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur.",
    });
  }
};

/*export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }
    // Création du token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { maxAge: 360000, httpOnly: true });

    return res
      .status(200)
      .json({ message: "Utilisateur connecté avec succès." });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la connexion de l'utilisateur.",
    });
  }
};*/
/* export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }
    // Création du token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    localStorage.setItem('token', token);

    return res
      .status(200)
      .json({ message: "Utilisateur connecté avec succès.", token });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la connexion de l'utilisateur.",
    });
  }
}; */

/*export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }
    // Création du token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { maxAge: 360000, httpOnly: true });

    // Return the UserID along with the success message
    return res
      .status(200)
      .json({ message: "Utilisateur connecté avec succès.", userID: user._id });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la connexion de l'utilisateur.",
    });
  }
};*/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { maxAge: 360000, httpOnly: true });

    // Return the UserID along with the success message
    return res.status(200).json({
      message: "Utilisateur connecté avec succès.",
      userID: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la connexion de l'utilisateur.",
    });
  }
};

export const updatePwd = async (req, res) => {
  try {
    // Destructure request body to extract password and token
    const { password } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const salt = await bcrypt.genSalt(10);

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe haché
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du mot de passe.",
    });
  }
};