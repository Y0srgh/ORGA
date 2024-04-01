import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./SignupFrom.css";

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
    setRole(type); // Update role state with the selected type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const levelOfStudy = 1;
    const StudentID = '2100'
    const data = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      levelOfStudy,
      StudentID,
      role,
    };
    await axios
      .post("http://localhost:5500/users", data)
      .then(() => {
        enqueueSnackbar("La demande a été enregistrée avec succès!", {variant: 'success'});
        navigate("/signup");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Bienvenue à bord !</h1>
          <div className="input-box">
            <div className="input-half">
              <label>Prénom</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Votre Prénom"
              />
            </div>
            <div className="input-half">
              <label>Nom</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Votre Nom"
              />
            </div>
          </div>
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
