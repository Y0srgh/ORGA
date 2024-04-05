import React from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import SignupForm from "../../components/signup/SignupForm";
import "./SignupPage.css";
import RegestrationForm from './../../components/signup/RegestrationForm';

const SignupPage = () => {
  return (
    <div>
      <SnackbarProvider  autoHideDuration={3000}>
        <RegestrationForm />
      </SnackbarProvider>
    </div>
  );
};

export default SignupPage;
