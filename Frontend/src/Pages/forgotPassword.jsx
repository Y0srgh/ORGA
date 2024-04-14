import React, { useState } from 'react';
import Input from '../Components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
//here
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    await axios.post(`http://localhost:5500/users/forgot-password`, {
      email,
    }).then(() => {
     navigate('/');
    }).catch((error) => {
      console.log(error);
    });;
  };


    return (
        <div className="forgot-password-container container">
            <form className="forgot-password-form form-group" onSubmit={handleSubmit}>
                <h2>Mot de passe oublié</h2>
                <Input
                    type="email"
                    autoComplete="off"
                    placeholder="prenom.nom@insat.ucar.tn"
                    className="form-control"
                    label="Adresse Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className=" reset-pwd mt-3">
                    Réinitialiser le mot de passe
                </button>
                <p id="create-account">
                    Vous n'avez pas un compte ?{" "}
                    <Link id="create-account-link" to="/sign-up">
                        Créer un compte
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;