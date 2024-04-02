import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/Sign-In";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
