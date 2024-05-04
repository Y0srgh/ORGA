import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup/SignupPage';
import EmailVerify from './components/EmailVerify/EmailVerify';
import AddPresident from './pages/signup/AdminTasks/UserFeatures/AddPresident';
import AddDvure from './pages/signup/AdminTasks/UserFeatures/AddDvure';

const App = () => {
  return (
    <Routes>
      <Route path='/add-president' className="app-container" element={<AddPresident />}/>
      <Route path='/add-dvure' className="app-container" element={<AddDvure />}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
    </Routes>
  )
}

export default App