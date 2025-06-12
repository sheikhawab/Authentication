import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import LandingPage from "./Screens/Landingpage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useSelector } from "react-redux";
function App() {
  const User = useSelector(((state)=>state.user.user));
  return (
      <Router>      
      <Routes>
        <Route path="/" element={User ? <LandingPage />:<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    
  );
}

export default App;