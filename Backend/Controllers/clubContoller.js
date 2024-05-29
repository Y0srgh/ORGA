import { Club } from "../Models/clubModel.js";
import { User } from "../Models/userModel.js";

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
    const { clubName, selected, selectedPresident } = req.body;

    if (!clubName) {
      return res.status(400).json({ message: "Club's name is required" });
    }

    const existingClub = await Club.findOne({ clubName });
    if (existingClub) {
      return res.status(400).json({ message: "Club already exists" });
    }

    if (selected && !selectedPresident) {
      return res.status(400).json({ message: "Veuillez affecter le club à un président" });
    }

    const president = await User.findOne({ _id: selectedPresident.code })
    if (!president) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    let select = false;
    if (selectedPresident) {
      select = true;
    }

    const club = await Club.create({
      clubName,
      selected: select,
      president: select ? president._id : null
    });
    let clubs = president.clubs;
    clubs.push(club._id);
    const stringifiedList = clubs.map(id => id.toString());

    president.clubs = clubs;
    console.log("pres", stringifiedList);
    const pres = await president.save();

    //User.findByIdAndUpdate(selectedPresident.code, {clubs : president.clubs})
    return res.status(201).json(pres);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { clubName, selected, selectedPresident } = req.body;

    if (!clubName) {
      return res.status(400).json({ message: "Check all the fields" });
    }

    if (selected && !selectedPresident) {
      return res.status(400).json({ message: "Veuillez affecter le club à un président" });
    }

    const existingClub = await Club.findOne({ clubName });
    if (!existingClub) {
      return res.status(400).json({ message: "Ce club n'existe pas" });
    }

    // Find all presidents whose clubs list includes the club ID
    const oldPresidents = await User.find({ clubs: existingClub._id });

    // Iterate through each president and update their clubs list
    for (const oldPresident of oldPresidents) {
      // Filter out the club ID from the president's clubs list
      const clubs = oldPresident.clubs.filter(club => club.toString() !== existingClub._id.toString());
      // Update the president's clubs list
      oldPresident.clubs = clubs;
      // Save the updated president
      const updatedPresident = await oldPresident.save();
      console.log("Updated president:", updatedPresident);
    }

    if (selected) {
      const newPresident = await User.findById(selectedPresident.code);
      if (!newPresident) {
        return res.status(400).json({ message: "Le président sélectionné n'existe pas" });
      }
      console.log("new pres", newPresident);
      let clubs = newPresident.clubs;
      clubs && clubs.push(existingClub._id) ||(clubs = [existingClub._id]);
      const stringifiedList = clubs?.map(id => id.toString());
  
      newPresident.clubs = clubs;
      console.log("pres", stringifiedList);
      const pres = await newPresident.save();

    }

    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      {
        clubName,
        selected,
        president: selected ? selectedPresident.code : null
      },
      { new: true }
    );

    return res.status(200).json(updatedClub);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
