import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from "notistack";

import SignupPage from './pages/signup/SignupPage';
import EmailVerify from './components/EmailVerify/EmailVerify';
import AddUser from './pages/signup/AdminTasks/UserFeatures/AddUser';
import AddPresident from './pages/signup/AdminTasks/UserFeatures/AddPresident';
import AddDvure from './pages/signup/AdminTasks/UserFeatures/AddDvure';
import AddDef from './pages/signup/AdminTasks/UserFeatures/AddDef';
import EditUser from './pages/signup/AdminTasks/UserFeatures/EditUser';
import ShowUser from './pages/signup/AdminTasks/UserFeatures/ShowUser';
import DeleteUser from './pages/signup/AdminTasks/UserFeatures/DeleteUser';
import HomeUsers from './pages/signup/AdminTasks/UserFeatures/HomeUsers';
import HomeClubs from './pages/signup/AdminTasks/ClubFeatures/HomeClubs';
import AddClub from './pages/signup/AdminTasks/ClubFeatures/AddClub';
import DeleteClub from './pages/signup/AdminTasks/ClubFeatures/DeleteClub';
import EditClub from './pages/signup/AdminTasks/ClubFeatures/EditClub';
import ShowClub from './pages/signup/AdminTasks/ClubFeatures/ShowClub';

const App = () => {
  return (
    <SnackbarProvider>
    <Routes>
      <Route path='/user' className="app-container" element={<HomeUsers />}/>
      <Route path='/user/add-user' className="app-container " element={<AddUser />}/>
      <Route path='/user/add-president' className="app-container " element={<AddPresident />}/>
      <Route path='/user/edit-user/:id' className="app-container" element={<EditUser />}/>
      <Route path='/user/show-user/:id' className="app-container" element={<ShowUser />}/>
      <Route path='/user/delete-user/:id' className="app-container" element={<DeleteUser />}/>
      <Route path='/user/add-dvure' classNam   e="app-container" element={<AddDvure />}/>
      <Route path='/user/add-def' className="app-container" element={<AddDef />}/>

      <Route path='/club' className="app-container" element={<HomeClubs />}/>
      <Route path='/club/add-club' className="app-container " element={<AddClub />}/>
      <Route path='/club/delete-club/:id' className="app-container " element={<DeleteClub />}/>
      <Route path='/club/edit-club/:id' className="app-container " element={<EditClub />}/>
      <Route path='/club/show-club/:id' className="app-container " element={<ShowClub />}/>
      <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
    </Routes>
    </SnackbarProvider>
  )
}

export default App