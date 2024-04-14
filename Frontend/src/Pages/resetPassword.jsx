import React, { useState } from "react";
import Input from "../Components/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      alert("Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, un chiffre, un caractère spécial (!@#$%^&*) et aucun espace. ");
      return;
    }
console.log(token);
console.log('before update password request');
    await axios
      .post("http://localhost:5500/users/update-password/"+token, {
        password,
      })
      .then(() => {
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
