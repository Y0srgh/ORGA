import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup/SignupPage';
import EmailVerify from './components/EmailVerify/EmailVerify';
import AddPresident from './pages/signup/AdminTasks/UserFeatures/AddPresident';
import AddDvure from './pages/signup/AdminTasks/UserFeatures/AddDvure';
import AddDef from './pages/signup/AdminTasks/UserFeatures/AddDef';
import EditUser from './pages/signup/AdminTasks/UserFeatures/EditUser';
import ShowUser from './pages/signup/AdminTasks/UserFeatures/ShowUser';

const App = () => {
  return (
    <Routes>
      <Route path='/add-president' className="app-container" element={<AddPresident />}/>
      <Route path='/edit-user/:id' className="app-container" element={<EditUser />}/>
      <Route path='/show-user/:id' className="app-container" element={<ShowUser />}/>
      <Route path='/add-dvure' className="app-container" element={<AddDvure />}/>
      <Route path='/add-def' className="app-container" element={<AddDef />}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
    </Routes>
  )
}

export default App