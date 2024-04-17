import React from 'react'
import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentComponent from './Components/Reserver/ParentComponent';
import ReserverTimeDate from './Components/Reserver/ReserverTimeDate';
import ReserverSalleform from './Components/Reserver/ReserverSalleform';

function App() {


  return (
    <Router>
      <div className="App">
      <Routes>
        
        <Route exact path="/reserver" element={<ParentComponent/>} />
        <Route exact path="./components/Reserver/ReserverTimeDate" element={<ReserverTimeDate/>} />
        <Route exact path="./components/Reserver/ReserverSalleform" element={<ReserverSalleform/>} />
       </Routes>
       </div>
    </Router>
  );
}

export default App