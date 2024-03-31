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
          
          <div className="dropdown">
            <div className="select">
              <span className="selected">your type</span>
              <div className="caret"></div>
            </div>
            <ul className="menu">
                <li disabled>your type</li>
                <li>Admin</li>
                <li>Devure</li>
                <li>Pres</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
