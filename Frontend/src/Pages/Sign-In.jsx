import React from "react";
import "./design/signIn.css";
import { Link } from "react-router-dom";
import Input from "../Components/Input.jsx";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/auth/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.status)
      navigate("/accueil");
    });
  };
  return (
    <div className="sign-in-container container">
      <form className="sign-in-form form-group" action="">
        <Input
          type="email"
          autoComplete="off"
          placeholder="John.doe@insat.ucar.tn"
          className="form-control"
          label="Adresse Email"
          id="email"
        />
        <Input
          type="password"
          placeholder="*************"
          className="form-control"
          label="Mot de passe"
          id="password"
        />
        <Link
          id="forgot-password-link"
          to="/forgot-password"
          className="forgot-password-link"
        >
          Mot de passe oublié?
        </Link>
        <button type="submit" className=" mt-3">
          Se connecter
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

export default SignIn;
