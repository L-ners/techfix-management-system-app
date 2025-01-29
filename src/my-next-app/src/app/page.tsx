"use client";

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import RegisterAppointment from "@/components/RegisterAppointment";
import AppointmentList from "@/components/AppointmentList";




function WelcomePage() {
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to TechFix Management System</h1>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/menu")}>
        Get Started
      </button>
    </div>
  );
}

function MenuPage() {
  return (
    <div className="container mt-5">
      <h2 className="text-center">TechFix Menu</h2>
      <nav className="text-center">
        <Link to="/register" className="btn btn-link">
          Register Appointment
        </Link>
        <Link to="/appointments" className="btn btn-link">
          View Appointments
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/register" element={<RegisterAppointment />} />
        <Route path="/appointments" element={<AppointmentList />} />
      </Routes>
    </Router>
  );
}


export default App;
