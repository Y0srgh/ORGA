import React, { useState } from "react";
import Input from "../Components/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JWT_SECRET } from "../../../Backend/Configurations/config";
import jwt from "jsonwebtoken";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5500/users//update-password/"+token, {
        password,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="forgot-password-container container">
      <form className="forgot-password-form form-group" onSubmit={handleSubmit}>
        <h2>Réinitialisation de mot de passe</h2>

        <Input
          type="password"
          placeholder="*************"
          className="form-control"
          label="Mot de passe"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className=" reset-pwd mt-3">
          Confirmer
        </button>

        <Link id="sign-in-link" to="/">
          Se Connecter
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
