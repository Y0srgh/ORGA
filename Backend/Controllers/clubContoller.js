import { Club } from "../Models/clubModel";

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

export const createClub = async (req, res) => {
  try {
    const { clubName } = req.body;

    if (!clubName) {
      return res.status(400).json({ message: "Club name is required" });
    }
    const existingClub = await Club.findOne({ clubName });
    if (existingClub) {
      return res.status(400).json({ message: "Club already exists" });
    }
    const club = await Club.create(req.body);
    return res.status(201).json(club);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { clubName } = req.body;
    if (!clubName) {
      return res.status(400).json({ message: "Club name is required" });
    }
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(club);
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
}
