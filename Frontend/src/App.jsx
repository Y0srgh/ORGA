import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from "notistack";

import SignupPage from './pages/signup/SignupPage';
import EmailVerify from './components/EmailVerify/EmailVerify';
import AddPresident from './pages/signup/AdminTasks/UserFeatures/AddPresident';
import AddDvure from './pages/signup/AdminTasks/UserFeatures/AddDvure';
import AddDef from './pages/signup/AdminTasks/UserFeatures/AddDef';
import EditUser from './pages/signup/AdminTasks/UserFeatures/EditUser';
import ShowUser from './pages/signup/AdminTasks/UserFeatures/ShowUser';
import DeleteUser from './pages/signup/AdminTasks/UserFeatures/DeleteUser';

const App = () => {
  return (
    <SnackbarProvider>
    <Routes>
      <Route path='/add-president' className="app-container" element={<AddPresident />}/>
      <Route path='/edit-user/:id' className="app-container" element={<EditUser />}/>
      <Route path='/show-user/:id' className="app-container" element={<ShowUser />}/>
      <Route path='/delete-user/:id' className="app-container" element={<DeleteUser />}/>
      <Route path='/add-dvure' className="app-container" element={<AddDvure />}/>
      <Route path='/add-def' className="app-container" element={<AddDef />}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
    </Routes>
    </SnackbarProvider>
  )
}

export default App