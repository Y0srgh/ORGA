import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup/SignupPage';

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<SignupPage />}/>
    </Routes>
  )
}

export default App