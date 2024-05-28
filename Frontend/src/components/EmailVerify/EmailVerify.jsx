import "./style.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import success from "../../assets/success.png";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      await axios
        .get(`http://localhost:5500/users/${param.id}/verify/${param.token}`)
        .then(() => {
          setValidUrl(true);
        })
        .catch((error) => {
          console.log(error);
          setValidUrl(false); // Set validUrl to false if there's an error
        });
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div className="email-verify-container">
      {validUrl ? (
        <>
          <img src={success} alt="Success" className="email-verify-img" />
          <h1 className="email-verify-text">Email vérifié avec succès !</h1>
          <Link to="/login" className="email-verify-link">
            <button className="email-verify-button">Se connecter</button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="email-verify-text">Erreur de vérification :(   </h1>
          <p className="email-verify-text">
            Le lien de vérification est invalide.
          </p>
        </>
      )}
    </div>
  );
};

export default EmailVerify;
