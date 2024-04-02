import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Sign-In';
import Home from './Pages/Home';

const App = () => {
  return (
   
      <Routes>
        <Route exact path="/" element={<SignIn/>} />
        <Route exact path="/home" element={<Home/>} />
      </Routes>
  );
}

export default App;