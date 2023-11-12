import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {firestore} from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import ProtectedRoute from "./routes/ProtectedRoute";
import Root from "./routes/root";
import DashboardPage from "./pages/Dashboard";
import ErrorPage from "./error-page";
import Home from "./pages/home";
import Menus from "./pages/menu";
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import AuthDetails from './pages/AuthDetails';
import { AuthProvider, useAuth } from './AuthContext';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login } from '@mui/icons-material';



function App() {
  const {user} = useAuth();


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path="/admin" element={<ProtectedRoute user={user}>
          <DashboardPage />
        </ProtectedRoute>} />
      </Routes>
    </div>
  )
  
}

export default App;
