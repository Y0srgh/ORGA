import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
/* import { validatePassword } from "./../formValidation.js";
 */const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
   /*  if (!validatePassword(password)) {
      alert("Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, un chiffre, un caractère spécial (!@#$%^&*) et aucun espace. ");
      return;
    } */
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
    <div>
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Réinitialiser le mot de passe</h1>

        <div className="input-box reset-pwd">
          <Input
            type="password"
            placeholder="*************"
            className="form-control"
            label="Mot de passe"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          Confirmer
        </button>
        <div className="login-link reset-pwd">
            <Link id="create-account-link" to="/sign-up">
              Se connecter
            </Link>
       
        </div>
      </form>
    </div>
  </div>
  );
};

export default ResetPassword;
