import React from "react";
import "./SignupFrom.css";

const SignupForm = () => {
  return (
    <div>
      <div className="wrapper">
        <form action="">
          {/* <h1>ORGA</h1>
          <p className="slogan">ORGANISATION ET GESTION DES RESSOURCES ASSOCIATIVES</p>
           */}
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
          <div className="input-box">
            <select className="dropdown">
              <option value="" disabled selected>
                Sélectionnez votre type de profil
              </option>
              <option value="admin">Admin</option>
              <option value="dvure">Dvure</option>
              <option value="president">Président</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
