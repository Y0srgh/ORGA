import { Salle } from "../Models/salleModel.js";



export const addSalle = async (req, res) => {
  try {
    // Destructure request body to extract salle data
    const {
       numero,
       libelle,
       capacity,
    } = req.body;

    // Check if all required fields are provided

    if (
      !libelle ||
      !capacity 
     )
     {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    const existingSalle = await Salle.findOne({ numero , libelle });
    if (existingSalle) {
      return res.status(400).json({
        message: "Une salle avec ce numéro et ce libellé  existe déjà.",
      });
    }

    const newSalle = await Salle.create({
        numero,
        libelle,
        capacity,
    });

    return res.status(201).json(newSalle);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout d'une salle.",
    });
  }
};

export const findAllSalles = async (req, res) => {
  try {
    const salles = await Salle.find({});
    return res.status(200).json({
      count: salles.length,
      data: salles,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des salles.",
    });
  }
};

export const findOneSalle = async (req, res) => {
  try {
    const { id } = req.params;
    const salle = await Salle.findById(id);
    return res.status(200).json(salle);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



export const updateSalle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        numero,
        libelle,
        capacity,
     
    } = req.body;

    if (
        !libelle ||
        !capacity 
    ) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    let updatedFields = {
        numero,
        libelle,
        capacity,
    };


    const updatedSalle = await Salle.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedSalle) {
      return res.status(404).json({ message: "Salle introuvable." });
    }

    return res
      .status(200)
      .json({ message: "Salle mise à jour avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour de la salle.",
    });
  }
};

export const deleteSalle = async (req, res) => {
  try {
    const { id } = req.params;

    const salle = await Salle.findByIdAndDelete(id);

    if (!salle) {
      return res.status(404).json({ message: "Salle introuvable." });
    }

    return res
      .status(200)
      .json({ message: "Salle supprimée avec succès." });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de la salle.",
    });
  }
};



