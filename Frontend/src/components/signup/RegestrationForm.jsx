import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./SignupFrom.css";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [levelOfStudy, setLevelOfStudy] = useState("");
  const [StudentID, setStudentID] = useState("");
  const [clubs, setClubs] = useState([]);
  const [selectedClubs, setSelectedClubs] = useState([]);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(
    "Choisissez votre type de profil"
  );
  const types = ["Dvure", "Président"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectType = (type) => {
    setSelectedType(type);
    setIsOpen(false);
    setRole(type); // Update role state with the selected type
  };

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    // Fetch unselected clubs from the backend
    const fetchClubs = async () => {
      try {
        const response = await axios.get("http://localhost:5500/clubs/available");
        console.log(response.data.data);
        setClubs(response.data.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clubs =role === "Président" ? selectedClubs: undefined;
    const data = {
      userName,
      email,
      password,
      phoneNumber,
      role,
      levelOfStudy: role === "Président" ? levelOfStudy : undefined,
      StudentID: role === "Président" ? StudentID : undefined,
      clubs,
    };

    await axios
      .post("http://localhost:5500/users/register", data)
      .then(() => {
        enqueueSnackbar("Un email vous a été envoyé !", {
          variant: "success",
        });
        //navigate("/login");
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Bienvenue à bord !</h1>
          {/* Reste du formulaire inchangé */}
          <div className="input-box">
            <label>Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="prenom.nom@insat.ucar.tn"
            />
          </div>
          <div className="input-box">
            <label>Pseudo-identité</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Votre Pseudo-identité"
            />
          </div>
          <div className="input-box">
            <label>Numéro de téléphone</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Votre numéro"
            />
          </div>
          <div className="input-box">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Votre mot de passe"
            />
          </div>

          <div className="input-box dropdown">
            <div className="select" onClick={toggleDropdown}>
              <span className="selected">{selectedType}</span>
              <div className={`caret ${isOpen ? "caret-rotate" : ""}`}></div>
            </div>
            <ul className={`menu ${isOpen ? "menu-open" : ""}`}>
              {types.map((type, index) => (
                <li key={index} onClick={() => selectType(type)}>
                  {type}
                </li>
              ))}
            </ul>
          </div>
          {/* Ajout de nouveaux champs pour le président en bas */}
          {role === "Président" && (
            <>
              <div className="input-box">
                <label>Niveau d'étude</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={levelOfStudy}
                  onChange={(e) => setLevelOfStudy(e.target.value)}
                  required
                  placeholder="Niveau d'étude"
                />
              </div>
              <div className="input-box">
                <label>ID d'étudiant</label>
                <input
                  type="text"
                  value={StudentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  required
                  placeholder="ID d'étudiant"
                />
              </div>

              {clubs && clubs.length > 0 && (
                <div className="input-box ">
                  <label >Choisir un ou plusieurs clubs</label>
                  {clubs.map((club) => (
                    <div className="checkbox-input" key={club._id}>
                      <input
                        type="checkbox"
                        id={club._id}
                        value={club._id}
                        checked={selectedClubs.includes(club._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedClubs([...selectedClubs, club._id]);
                          } else {
                            setSelectedClubs(
                              selectedClubs.filter((id) => id !== club._id)
                            );
                          }
                        }}
                      />
                      <label className="checkbox-label" htmlFor={club._id}>{club.clubName}</label>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {/* Fin des nouveaux champs */}
          <button type="submit">S'inscrire</button>
          <div className="login-link">
            <p>
              Avez-vous déjà un compte? <Link href="#">se connecter</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
