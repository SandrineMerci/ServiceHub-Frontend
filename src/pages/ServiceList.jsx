import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import styles from "../styles/ServiceList.module.css";
import { useAuth } from "../context/AuthContext.jsx";


// Inside the component


const ServiceList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Handle errors

  const { user } = useAuth();


  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          category
            ? `http://localhost:5000/api/services?category=${category}`
            : "http://localhost:5000/api/services"
        );
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(selectedCategory ? `/services/${selectedCategory}` : "/services");
  };

  const handleBooking = (id) => {
    if (user) {
      navigate(`/book/${id}`); // Redirect to booking form if logged in
    } else {
      alert("Please log in to book a service.");
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Services</h1>

      <div className={styles.filters}>
        <label>Select Category: </label>
        <select value={category || ""} onChange={handleCategoryChange} className={styles.select}>
          <option value="">All Categories</option>
          <option value="repairing">Repairing Services</option>
          <option value="electrical">Electrical Services</option>
          <option value="cleaning">Cleaning Services</option>
          <option value="education">Tutoring & Education</option>
          <option value="cooking">Cooking Services</option>
        </select>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading services...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : services.length > 0 ? (
        <div className={styles.services}>
          {services.map((service) => (
            <div key={service._id} className={styles.service}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <p><strong>Price Range: $</strong> {service.priceRange || "Not available"}</p>
              <p>Location: {service.location}</p>
             
              <button className={styles.bookButton} onClick={() => handleBooking(service._id)}>
  Book Service
</button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noService}>No services available in this category.</p>
      )}
    </div>
  );
};

export default ServiceList;
