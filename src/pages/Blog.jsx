// Blog.js
import React, { useState } from "react";
import {  FiFileText , FiTag, FiClock, FiDollarSign, FiUser, FiPhone } from "react-icons/fi";
import "../styles/Blog.css";

const services = [
  { 
    id: 1, 
    title: "Car Repair",  
    location: "Kigali City", 
    category: "Repairing", 
    image: "/images/carRepair.jpg" ,
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300"
  },
  { 
    id: 2, 
    title: "Phone Repair", 
    location: "Los Angeles", 
    category: "Repairing", 
    image: "/images/phoneRepair.jpeg",
     description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300"
  },
  { 
    id: 3, 
    title: "Home Wiring",  
    location: "Chicago", 
    category: "Electrical", 
    image: "/images/homeWiring.jpeg",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 4, 
    title: "Appliance Repair",  
    location: "Houston", 
    category: "Electrical", 
    image: "/images/applianceRepair.jpeg",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 5, 
    title: "Home Cleaning",  
    location: "San Francisco", 
    category: "Cleaning", 
    image: "/images/homeCleaning.jpeg",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 6, 
    title: "Office Cleaning", 
    location: "Seattle", 
    category: "Cleaning", 
    image: "/images/officeCleaning.jpeg",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 7, 
    title: "Math Tutoring",  
    location: "Boston", 
    category: "Education", 
    image: "/images/mathTutoring.webp",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 8, 
    title: "English Tutoring",  
    location: "Miami", 
    category: "Education", 
    image: "/images/englishTutoring.webp",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 9, 
    title: "Personal Chef",  
    location: "Las Vegas", 
    category: "Cooking", 
    image: "/images/personalChef.webp",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  },
  { 
    id: 10, 
    title: "Meal Prep",  
    location: "Denver", 
    category: "Cooking", 
    image: "/images/mealPrep.jpg",
    description: "Professional auto diagnostics, brake repairs, and engine maintenance by certified technicians.",
    price: "$50 - $300" 
  }
];

const Blog = () => {
    const [expandedId, setExpandedId] = useState(null);
  return (
    <div className="blog-container">
      {services.map((service) => (
        <div key={service.id} className="blog-card">
          <img src={service.image} alt={service.title} className="blog-image" />
          <div className="blog-content">
            <h2 className="blog-title">{service.title}</h2>
            
            <p className="blog-info">
              <FiTag /> {service.category}
            </p>
            {/* Expanded Content (hidden by default) */}
            {expandedId === service.id && (
              <div className="service-details">
                <p className="description">< FiFileText /> {service.description}</p>
                <div className="details-grid">
                  <span><FiDollarSign /> <strong>Price:</strong> {service.price}</span>
                  
                </div>
                
              </div>
            )}
            
            <button 
              onClick={() => setExpandedId(expandedId === service.id ? null : service.id)} 
              className="blog-button"
            >
              {expandedId === service.id ? "Hide Details" : "View Service"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;