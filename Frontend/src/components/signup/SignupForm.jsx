import React, { useState } from "react";
import "./SignupFrom.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(
    "Veillez choisir votre type"
  );
  const types = ["Dvure", "Président"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectType = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Bienvenue à bord !</h1>
          <div className="input-box">
            <label>Prénom & Nom</label>
            <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required 
            placeholder="Prénom  Nom" />
          </div>
          <div className="input-box">
            <label>Adresse Email</label>
            <input
              type="email"
              required
              placeholder="prenom.nom@insat.ucar.tn"
            />
          </div>
          <div className="input-box">
            <label>Numéro de téléphone</label>
            <input type="tel" required placeholder="Votre numéro" />
          </div>
          <div className="input-box">
            <label>Mot de passe</label>
            <input type="password" required placeholder="Votre mot de passe" />
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
