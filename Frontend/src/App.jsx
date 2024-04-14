import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup/SignupPage';
import EmailVerify from './components/EmailVerify/EmailVerify';

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/login' element={<SignupPage />}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
    </Routes>
  )
}

export default App