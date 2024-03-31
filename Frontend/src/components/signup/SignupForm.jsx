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
            <input type="text" required placeholder="Username" />
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
