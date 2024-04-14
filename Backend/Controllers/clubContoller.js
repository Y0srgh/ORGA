import { Club } from "../Models/clubModel.js";

export const findAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    return res.status(200).json({
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const findClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    return res.status(200).json(club);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const findAvailableClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ selected: "false" }).lean();
    return res.status(200).json({
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createClub = async (req, res) => {
  try {
    const { clubName, selected } = req.body;

    if (!clubName) {
      return res.status(400).json({ message: "Club name is required" });
    }

    const existingClub = await Club.findOne({ clubName });
    if (existingClub) {
      return res.status(400).json({ message: "Club already exists" });
    }

    const club = await Club.create({ clubName, selected });
    return res.status(201).json(club);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { clubName, selected } = req.body;
    if (!clubName && (selected === undefined || selected === null)) {
      return res
        .status(400)
        .json({ message: "You must update at least one field" });
    }
    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      { clubName, selected },
      { new: true }
    );
    return res.status(200).json(updatedClub);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    return res.status(200).json(club);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//update the selected field of the clubs when we delete a president
export const updateSelected = (user) => {
  if (user.role !== "President") {
    const userClubs = user.clubs;
    userClubs.forEach(async (club) => {
      const updatedClub = await Club.findByIdAndUpdate(
        club._id,
        { selected: "false" },
        { new: true }
      );
      console.log("updated ---------", updateClub);
    });
  }
};
