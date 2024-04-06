import React, { useState } from "react";
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
  const [studentID, setStudentID] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userName,
      email,
      password,
      phoneNumber,
      role,
      levelOfStudy: role === "Président" ? levelOfStudy : undefined,
      studentID: role === "Président" ? studentID : undefined,
    };

    await axios
      .post("http://localhost:5500/users", data)
      .then(() => {
        enqueueSnackbar('La demande a été enregistrée avec succès!', {
          variant: 'success',
        });
        navigate("/signup");
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
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
                  type="text"
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
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  required
                  placeholder="ID d'étudiant"
                />
              </div>
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
