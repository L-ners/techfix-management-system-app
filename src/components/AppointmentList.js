import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://zst00myym5.execute-api.us-east-1.amazonaws.com/prod/appointments"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Appointment List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.customer_name}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.technician_assigned}</td>
              <td>{appointment.status || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;


