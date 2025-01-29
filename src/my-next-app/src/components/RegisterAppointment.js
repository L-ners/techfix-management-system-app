"use client";

import React, { useState } from "react";
import axios from "axios";

const RegisterAppointment = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    appointment_date: "",
    technician_assigned: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://zst00myym5.execute-api.us-east-1.amazonaws.com/prod/appointments",
        formData
      );
      alert("Appointment registered successfully: " + response.data.message);
    } catch (error) {
      console.error("Error registering appointment:", error);
      alert("An error occurred while registering the appointment.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            name="customer_name"
            className="form-control"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Appointment Date</label>
          <input
            type="datetime-local"
            name="appointment_date"
            className="form-control"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Technician Assigned</label>
          <input
            type="text"
            name="technician_assigned"
            className="form-control"
            value={formData.technician_assigned}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register Appointment
        </button>
      </form>
    </div>
  );
};

export default RegisterAppointment;
