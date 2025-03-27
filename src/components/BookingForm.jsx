import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/BookingForm.module.css";
import { useParams, useNavigate } from "react-router-dom";

const BookingForm = ({ serviceId: propServiceId, onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get serviceId from URL if not passed as a prop
  const serviceId = propServiceId || id; // Use either prop or URL param

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Service ID:", serviceId);
  }, [serviceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceId) {
      setMessage("Error: Service ID is missing!");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        serviceId,
        ...formData,
      });
  
      setMessage("Booking successful!");
  
      setTimeout(() => {
        setMessage(""); // Clear message
        navigate("/services"); // Redirect to service list
      }, 2000);
    } catch (err) {
      setMessage("Error booking service.");
    }
  };
  
  const handleClose = () => {
    navigate("/services"); // Redirect to Services page
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Book Service</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description of what you want"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button className={styles.coBook} type="submit">Confirm Booking</button>
        </form>
        {message && <p>{message}</p>}
        <button className={styles.close} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
