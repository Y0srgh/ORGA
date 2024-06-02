import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5500/users/forgot-password`, {
        email,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Mot de passe oublié </h1>

          <div className="input-box">
            <Input
              type="email"
              autoComplete="off"
              placeholder="prenom.nom@insat.ucar.tn"
              className="form-control"
              label="Adresse Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">Confirmer</button>
          <div className="login-link">
            <p id="create-account">
              Vous n'avez pas un compte ?{" "}
              <Link id="create-account-link" to="/user/add-president">
                Créer un compte
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
