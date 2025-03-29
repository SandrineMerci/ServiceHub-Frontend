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
    description: "Expert automotive services including engine diagnostics, brake repairs, oil changes, and electrical system checks. Our certified mechanics use OEM parts and advanced tools to ensure your vehicle runs smoothly and safely. 24/7 emergency towing available.",
    price: "$50 - $150"
  },
  { 
    id: 2, 
    title: "Phone Repair", 
    location: "Los Angeles", 
    category: "Repairing", 
    image: "/images/phoneRepair.jpeg",
     description:"Fast, reliable smartphone and tablet repairs for cracked screens, battery replacements, water damage, and software issues. We repair all major brands (Apple, Samsung, etc.) with 90-day warranties on all parts and labor.",
    price: "$30 - $80"
  },
  { 
    id: 3, 
    title: "Home Wiring",  
    location: "Chicago", 
    category: "Electrical", 
    image: "/images/homeWiring.jpeg",
    description: "Licensed electricians for home wiring, panel upgrades, and lighting installations. Compliant with national safety codes. Ideal for renovations, smart home setups, and fixing faulty circuits.",
    price: "$100 - $300" 
  },
  { 
    id: 4, 
    title: "Appliance Repair",  
    location: "Houston", 
    category: "Electrical", 
    image: "/images/applianceRepair.jpeg",
    description:"Professional repair for refrigerators, washing machines, ovens, and other major appliances. We service all brands and offer genuine replacement parts with 6-month guarantees.",
    price: "$40 - $120" 
  },
  { 
    id: 5, 
    title: "Home Cleaning",  
    location: "San Francisco", 
    category: "Cleaning", 
    image: "/images/homeCleaning.jpeg",
    description: "Thorough residential cleaning with eco-friendly products. Services include deep kitchen/bath sanitation, dusting, vacuuming, and window cleaning. Flexible schedules (one-time or recurring).",
    price: "$80 - $200" 
  },
  { 
    id: 6, 
    title: "Office Cleaning", 
    location: "Seattle", 
    category: "Cleaning", 
    image: "/images/officeCleaning.jpeg",
    description: "Steam and dry cleaning for carpets, rugs, and upholstery. Removes stains, allergens, and odors using non-toxic solutions. Commercial/residential services available.",
    price: "$60 - $150" 
  },
  { 
    id: 7, 
    title: "Math Tutoring",  
    location: "Boston", 
    category: "Education", 
    image: "/images/mathTutoring.webp",
    description:"Personalized K-12 and college math tutoring (algebra, calculus, statistics). Certified teachers tailor sessions to curriculum needs with progress tracking and test prep (SAT/ACT).",
    price: "$50 - $300" 
  },
  { 
    id: 8, 
    title: "English Tutoring",  
    location: "Miami", 
    category: "Education", 
    image: "/images/englishTutoring.webp",
    description: "Comprehensive English language coaching: essay writing, grammar, literature analysis, and ESL. Native-speaking tutors with 5+ years experience.",
    price: "$50 - $300" 
  },
  { 
    id: 9, 
    title: "Personal Chef",  
    location: "Las Vegas", 
    category: "Cooking", 
    image: "/images/personalChef.webp",
    description: "Private chefs for meal preparation, dinner parties, and dietary-specific cooking (vegan, keto, gluten-free). Includes grocery shopping and kitchen cleanup.",
    price: "$50 - $300" 
  },
  { 
    id: 10, 
    title: "Meal Prep",  
    location: "Denver", 
    category: "Cooking", 
    image: "/images/mealPrep.jpg",
    description: "Weekly healthy meal prep with macros tracking. Ready-to-eat meals delivered fresh or frozen. Perfect for fitness goals or busy families.",
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