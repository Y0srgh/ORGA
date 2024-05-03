import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup/SignupPage';
import EmailVerify from './components/EmailVerify/EmailVerify';
import AddUser from './pages/signup/AdminTasks/UserFeatures/AddUser';

const App = () => {
  return (
    <Routes>
      <Route path='/signup' className="app-container" element={<AddUser />}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
    </Routes>
  )
}

export default App