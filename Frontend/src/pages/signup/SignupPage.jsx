import React from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
//import SignupForm from "../../components/signup/SignupForm";
import "./SignupPage.css";
import RegistrationForm from './../../components/signup/RegistrationForm';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <SnackbarProvider  autoHideDuration={3000}>
        <RegistrationForm />
      </SnackbarProvider>
    </div>
  );
};

export default SignupPage;
