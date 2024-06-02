import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import "./design/signIn.css";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5500/users/login`, {
        userName,
        password,
      });
      const { userID } = response.data;
      console.log("response login", response);
      localStorage.setItem('userId', userID);
      localStorage.role = response.data.role;
      localStorage.token = response.data.token;
      window.location.href = "/reserver";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login to ORGA</h1>
          <div className="input-box">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Pseudo-identité"
              label="Pseudo-identité"
              className="form-control"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-box">
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
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-password-link">
              Mot de passe oublié?
            </Link>
          </div>
          <button type="submit">Se connecter</button>
          <div className="login-link">
            <p id="create-account">
              Vous n'avez pas un compte ?{" "}
              <Link to="/user/add-president" id="create-account-link">
                Créer un compte
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
