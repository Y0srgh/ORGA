import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import SideB from './components/Home/SideB.jsx';
import SignIn from './pages/Sign-In';
import Home from './pages/Home';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import ParentComponent from './components/reserver/ParentComponent';
import ReserverTimeDate from './components/reserver/ReserverTimeDate';
import ReserverSalleform from './components/reserver/ReserverSalleform';
import ReservationDetails from './components/reserver/DetailsReservation';
import MyCalendar from './pages/CalendarPage/MyCalendar.jsx';
import EditReservation from './components/reserver/EditReservation.jsx';
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
import AdminDashboard from './pages/reservations/AdminDashboard';
import ReservationsDetails from './pages/reservations/ReservationDetails';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import PrimeNavbar from './components/Home/PrimeNavbar.jsx';
import Profile from './pages/Profile/Profile.jsx';


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SnackbarProvider>
      <div className="app">
        <button
          className={`sidebar-toggle ${isSidebarOpen ? 'rotated' : ''}`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? < GoSidebarExpand/> : <GoSidebarCollapse />}
        </button>
        <SideB isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <PrimeNavbar/>
        <div className="main-content">
          <Routes>
            <Route path='/user' className="app-container" element={<HomeUsers />} />
            <Route path='/user/add-user' className="app-container " element={<AddUser />} />
            <Route path='/user/add-president' className="app-container " element={<AddPresident />} />
            <Route path='/user/edit-user/:id' className="app-container" element={<EditUser />} />
            <Route path='/user/show-user/:id' className="app-container" element={<ShowUser />} />
            <Route path='/user/delete-user/:id' className="app-container" element={<DeleteUser />} />
            <Route path='/user/add-dvure' classNam e="app-container" element={<AddDvure />} />
            <Route path='/user/add-def' className="app-container" element={<AddDef />} />

            <Route path='/club' className="app-container" element={<HomeClubs />} />
            <Route path='/club/add-club' className="app-container " element={<AddClub />} />
            <Route path='/club/delete-club/:id' className="app-container " element={<DeleteClub />} />
            <Route path='/club/edit-club/:id' className="app-container " element={<EditClub />} />
            <Route path='/club/show-club/:id' className="app-container " element={<ShowClub />} />
            <Route path='/users/:id/verify/:token' element={<EmailVerify />} />

            <Route path='/admin-dashboard' className="app-container" element={<AdminDashboard />} />
            <Route path='/reservation-details' className="app-container" element={<ReservationsDetails />} />

            <Route exact path="/profile" element={<Profile />} />

            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/calendar" element={<MyCalendar />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route exact path="/reserver" element={<ParentComponent />} />
            <Route exact path="/reserver/edit-reservation/:reservationId" element={<EditReservation />} />
            <Route exact path="/reserver/ReserverTimeDate" element={<ReserverTimeDate />} />
            <Route exact path="/reserver/ReserverSalleform" element={<ReserverSalleform />} />
            <Route exact path="/reserver/DetailsReservation" element={<ReservationDetails />} />
          </Routes>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default App;
