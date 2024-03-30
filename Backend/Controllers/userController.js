import { User } from "./../models/User.js";

export const addUser = async (req, res) => {
  try {
    const {
        firstName,
        lastName,
        email,
        password,
        levelOfStudy,
        phoneNumber,
        role,
        StudentID,
        clubs
      } =req.body;

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
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }



    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec ce numéro de téléphone existe déjà." });
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
        clubs
    });

    return res.status(201).json(newUser);
  } 
  catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
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
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des utilisateurs.",
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


