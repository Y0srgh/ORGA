import React from "react";
import "./design/signIn.css";

import { Link } from "react-router-dom";
import Input from "../components/Input.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(`http://localhost:5500/users/login`, {
        email,
        password,
      });
      console.log(response)

      // Extract the user ID from the response data
      const { userID } = response.data;
      console.log(userID)

      // Store the user ID in the local storage
      localStorage.setItem('userId', userID);

      // Navigate to the reservation page
      
      navigate("/reserver");
    } catch (error) {
      console.log(error);
    }
    /*axios.post(`http://localhost:5500/users/login`, {
      email,
      password,
    })
    .then((resp)=>{
      console.log(resp);
    })
    .catch((error)=>{
      console.log(error);
    })*/

  };

  return (


    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login to ORGA </h1>

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
          <Link
            id="forgot-password-link"
            to="/forgot-password"
            className="forgot-password-link"
          >
            Mot de passe oublié?
          </Link></div>

          <button type="submit">
            Se connecter
          </button>
          <div className="login-link">
            <p id="create-account">
              Vous n'avez pas un compte ?{" "}
              <Link id="create-account-link" to="/sign-up">
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
