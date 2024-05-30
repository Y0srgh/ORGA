import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../Configurations/config.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const addUser = async (req, res) => {
  try {
    // Destructure request body to extract user data
    const {      
      firstName,
      lastName,
      email,
      password,
      levelOfStudy,
      phoneNumber,
      role,
      StudentID,
      club,
    } = req.body;

    // Check if all required fields are provided

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !role ||
      (role === "Président" && (!StudentID || !club || !levelOfStudy))
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({
        message: "Un utilisateur avec ce numéro de téléphone existe déjà.",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      levelOfStudy,
      phoneNumber,
      role,
      StudentID,
      club,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
    });
  }
};

export const findAllUsers = async (req, res) => {
  try {
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
    // modification du mot de passe
    user.password = password;
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
      firstName,
      lastName,
      email,
      password,
      levelOfStudy,
      phoneNumber,
      role,
      StudentID,
      club,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !levelOfStudy ||
      !phoneNumber ||
      !role ||
      (role === "Président" && (!StudentID || !club || !levelOfStudy))
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
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
      club,
    };

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

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de l'utilisateur.",
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

