import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Sign-In';

const App = () => {
  return (
   
      <Routes>
        <Route exact path="/" element={<SignIn/>} />
      </Routes>
  );
}

export default App;