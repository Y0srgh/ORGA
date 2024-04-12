import { Club } from "../Models/clubModel";

export const findAllClubs = async (req, res) => { 
  try {
    const clubs = await Club.find();
    return res.status(200).json({
        count:clubs.length, 
        data: clubs});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
