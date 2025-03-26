import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ProviderDashboard.module.css";

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
  });

  // Fetch the provider's services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services/my-services");
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
          setServices([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  // Handle input changes for the new service form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new service
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/services", newService, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setServices((prev) => [...prev, response.data]); // Add the new service to the list
      setNewService({
        title: "",
        description: "",
        price: "",
        location: "",
        category: "",
      }); // Reset the form
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Services</h1>

      {/* Add Service Form */}
      <form onSubmit={handleAddService} className={styles.form}>
        <h2>Add a New Service</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newService.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newService.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newService.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newService.location}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          value={newService.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Home Improvement">Home Improvement</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Education">Education</option>
          <option value="Cooking">Cooking</option>
        </select>
        <button type="submit">Add Service</button>
      </form>

      {/* Display Services */}
      <div className={styles.services}>
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className={styles.service}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <p>Price: ${service.price}</p>
              <p>Location: {service.location}</p>
              <p>Category: {service.category}</p>
            </div>
          ))
        ) : (
          <p>No services available</p>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;