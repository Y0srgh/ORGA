import React, { useState } from "react";
import "./SignupFrom.css";

const SignupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("your type");
  const types = ["Admin", "Devure", "Pres"];

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
        <form action="">
          <div className="input-box">
            <label>Prénom & Nom</label>
            <input type="text" required placeholder="Prénom  Nom" />
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
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
