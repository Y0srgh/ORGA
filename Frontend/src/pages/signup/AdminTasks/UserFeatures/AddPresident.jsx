import React, { useEffect, useState } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail, MdPermIdentity } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MultiSelect } from 'primereact/multiselect';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";


import './styles.css'; // Import custom CSS for styling

const AddPresident = () => {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("Président");
  const [levelOfStudy, setLevelOfStudy] = useState("");
  const [StudentID, setStudentID] = useState("");
  const [clubs, setClubs] = useState([]);
  const [selectedClubs, setSelectedClubs] = useState([]);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch unselected clubs from the backend
    const fetchClubs = async () => {
      try {
        const response = await axios.get("http://localhost:5500/clubs/available");
        // Map the received data to transform it
        const transformedClubs = response.data.data.map(club => ({
          name: club.clubName,
          code: club._id
        }));
        console.log(transformedClubs);
        setClubs(transformedClubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const clubs = role === "Président" ? selectedClubs : undefined;
    const data = {
      userName,
      email,
      mot_de_passe,
      phoneNumber,
      role,
      levelOfStudy: role === "Président" ? levelOfStudy : undefined,
      StudentID: role === "Président" ? StudentID : undefined,
      clubs,
    };

    await axios
      .post("http://localhost:5500/users/register", data)
      .then(() => {
        enqueueSnackbar("Un email a été envoyé !", {
          variant: "success",
        });
        //navigate("/login");
        setUserName("");
        setEmail("");
        setMot_de_passe("");
        setPhoneNumber("");
        setRole("");
        setLevelOfStudy("");
        setStudentID("");
        setSelectedClubs([]);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error);
      });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-z]+(\.[a-z]+)?@insat\.ucar\.tn$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    // Regular expression for alphabetical username validation
    const usernameRegex = /^[a-zA-Z]+$/;
    return usernameRegex.test(username);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation
    const phoneNumberRegex = /^[5279]\d{7}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const validateStudentID = (studentID) => {
    // Regular expression for student ID validation
    const studentIDRegex = /^\d{7}$/;
    return studentIDRegex.test(studentID);
  };

  const validateForm = () => {
    // Perform validation for all fields
    if (!validateEmail(email)) {
      // Handle invalid email
      return false;
    }
    if (!validateUsername(userName)) {
      // Handle invalid username
      return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      // Handle invalid phone number
      return false;
    }
    if (mot_de_passe.length < 5) {
      return false;
    }

    if (
      role === "Président" &&
      (!levelOfStudy || levelOfStudy < 1 || levelOfStudy > 5)
    ) {
      // Handle invalid level of study
      return false;
    }
    if (role === "Président" && !validateStudentID(StudentID)) {
      // Handle invalid student ID
      return false;
    }
    if (role === "Président" && selectedClubs.length === 0) {
      // Handle no club selected for president
      return false;
    }
    return true; // Form is valid
  };

  return (
    <div className='mt-20 form-wrapper'>
    <h1 className="text-3xl font-bold mb-8 text-center text-[#800020]">Ajouter un nouveau président</h1>
      <div className="blur-frame max-w-4xl mx-auto px-6 py-8 my-6">

      <form className="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-10">

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Pseudo-Identité</label>
            <input
              type="text"
              placeholder="Pseudo-Identité"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <MdPermIdentity className="w-[18px] h-[18px] absolute right-4 icon-maroon" />
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">ID d'étudiant</label>
            <input
              type="text"
              placeholder="ID d'étudint"
              value={StudentID}
              onChange={(e) => setStudentID(e.target.value)}
              required
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <HiOutlineIdentification className="w-[18px] h-[18px] absolute right-4 icon-maroon" />
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Numéro de téléphone</label>
            <input type="number" placeholder="Numéro de téléphone."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <IoPhonePortraitOutline className="w-[18px] h-[18px] absolute right-4 icon-maroon" />
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Niveau d'étude</label>
            <input type="number"
              min={1}
              max={5} placeholder="Niveau d'étude"
              value={levelOfStudy}
              onChange={(e) => setLevelOfStudy(e.target.value)}
              required
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <PiStudentBold className="w-[18px] h-[18px] absolute right-4 icon-maroon" />
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Email</label>
            <input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="prenom.nom@insat.ucar.tn"
              className="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none" />
            <MdOutlineMail className="w-[18px] h-[18px] absolute right-4 icon-maroon" />
          </div>
         
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Affecter les clubs</label>
            <MultiSelect value={selectedClubs} onChange={(e) => setSelectedClubs(e.value)} options={clubs} optionLabel="name" display="chip"
              placeholder="Affectation des clubs" maxSelectedLabels={3} className="w-full md:w-20rem mt-6" />
          </div>
          <div className="relative flex items-center">
            <label className="text-[13px] absolute top-[-10px] left-0 font-semibold">Mot de passe</label>
            <Password value={mot_de_passe} className='px-0 pt-0 mt-4 pb-0 w-[200px] bg-white text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none' onChange={(e) => setMot_de_passe(e.target.value)} toggleMask />
          </div>

          </div>
          <button type="submit" disabled={!validateForm()} className="mt-10 mb-5 px-2 py-2.5 rounded text-sm font-semibold bg-[#333] text-white hover:bg-[#222] mx-auto block w-80">Submit</button>

      </form>
      </div>
    </div>
  );
};

export default AddPresident;
