import React from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import SignupForm from "../../components/signup/SignupForm";
import "./SignupPage.css";
const SignupPage = () => {
  return (
    <div>
      <SnackbarProvider  autoHideDuration={3000}>
        <SignupForm />
      </SnackbarProvider>
    </div>
  );
};

export default SignupPage;
