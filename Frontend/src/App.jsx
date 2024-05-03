import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/Sign-In";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";
import ParentComponent from "./Components/reserver/ParentComponent";
import ReserverTimeDate from "./Components/reserver/ReserverTimeDate";
import ReserverSalleform from "./Components/reserver/ReserverSalleform";
import ReservationDetails from "./Components/reserver/DetailsReservation";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route exact path="/reserver" element={<ParentComponent/>} />
      <Route exact path="/reserver/ReserverTimeDate" element={<ReserverTimeDate/>} />
        <Route exact path="/reserver/ReserverSalleform" element={<ReserverSalleform/>} />
        <Route exact path="/reserver/DetailsReservation" element={<ReservationDetails/>} />

    </Routes>
  );
};

export default App;
