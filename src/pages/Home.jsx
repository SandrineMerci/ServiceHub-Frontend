import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { FaTools, FaBroom, FaBolt, FaChalkboardTeacher, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/services"); // Redirects to Service List page
  };
 const handleView=() =>{
  navigate("/review");
 };
   
  return (
    <div>
      {/* Navbar at the top */}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Find Local Services You Need</h1>
          <p>
            Connect with trusted professionals in your area. Book services, get quotes, and solve your problems with ServiceHub.
          </p>
          <button className={styles.browseButton} onClick={handleViewAll}>Browse Services</button>
        </div>
      </section>

      {/* Explore Categories Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Explore Categories</h2>
        <p className={styles.sectionSubtitle}>
          Find the perfect service for your needs from our wide range of categories.
        </p>

        <div className={styles.categoriesContainer}>
          <div className={styles.categoryCard}>
            <FaTools className={styles.categoryIcon} />
            <h3>Repairing Services</h3>
          </div>
          <div className={styles.categoryCard}>
            <FaBroom className={styles.categoryIcon} />
            <h3>Cleaning Services</h3>
          </div>
          <div className={styles.categoryCard}>
            <FaBolt className={styles.categoryIcon} />
            <h3>Electrical Services</h3>
          </div>
          <div className={styles.categoryCard}>
            <FaChalkboardTeacher className={styles.categoryIcon}/>
            <h3>Tutoring & Education</h3>
          </div>

          <div className={styles.categoryCard}>
            <FaUtensils className={styles.categoryIcon}/>
            <h3>Cooking Services</h3>
          </div>

        </div>

        <button className={styles.viewAllButton} onClick={handleViewAll}>
      View All Categories
    </button>
      </section>
     {/* How It Works Section */}
<section id="about" className={styles.howItWorksSection}>
  <h2>How ServiceHub Works</h2>
  <div className={styles.stepsContainer}>
    <div className={styles.step}>
      <div className={styles.stepNumber}>1</div>
      <h3>Search for Services</h3>
      <p>Browse through our categories or search for specific services that match your needs.</p>
    </div>
    <div className={styles.step}>
      <div className={styles.stepNumber}>2</div>
      <h3>Book a Service</h3>
      <p>Choose a date, and book your appointment securely.</p>
    </div>
    <div className={styles.step}>
      <div className={styles.stepNumber}>3</div>
      <h3>Get It Done</h3>
      <p>Your service provider arrives at the scheduled time and completes the job professionally.</p>
    </div>
  </div>
</section>


     {/* Contact Section */}
<section className={styles.section}>
  <h2>What Our Customers Say</h2>
  <p>Hear from people who have used ServiceHub to solve their problems</p>
  <div className={styles.testimonialContainer}>
    <div className={styles.testimonialCard}>
      <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
      <p>
        ServiceHub made finding a reliable electrician so easy. John was professional, punctual, 
        and fixed it quickly. Will definitely use again!
      </p>
      <div className={styles.userInfo}>
        
        <div>
          <strong>Isaac Tuyishime</strong>
          <p>Used Electrical Services</p>
        </div>
      </div>
    </div>

    <div className={styles.testimonialCard}>
      <span className={styles.stars}>⭐⭐⭐⭐☆</span>
      <p>
        The house cleaner I found through ServiceHub was fantastic. My home has never looked 
        better! The booking process was simple and straightforward.
      </p>
      <div className={styles.userInfo}>
       
        <div>
          <strong>Mucyo Gretha</strong>
          <p>Used Cleaning Services</p>
        </div>
      </div>
    </div>

    <div className={styles.testimonialCard}>
      <span className={styles.stars}>⭐⭐⭐☆☆</span>
      <p>
        My son's math grades improved dramatically thanks to the tutor we found on ServiceHub. 
        The platform made it easy to find someone qualified in our area.
      </p>
      <div className={styles.userInfo}>
    
        <div>
          <strong>Kaliza Lauraine</strong>
          <p>Used Tutoring Services</p>
        </div>


      </div>

      <button className={styles.viewAllButton} onClick={handleView}>
      View All Reviews
    </button>
    </div>
  </div>
</section>

{/*get started section*/}
<section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.heading}>Ready to get started?</h2>
        <p className={styles.paragraph}>
          Join ServiceHub today and connect with top local professionals.
        </p>
        <button className={styles.ctaButton} onClick={handleViewAll}>Find a Service</button>
      </div>
    </section>


{/* Footer Section */}
<section id="contact">
<footer className={styles.footer}>
  <div className={styles.footerContainer}>
    
    {/* ServiceHub Info */}
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>ServiceHub</h3>
      <p className={styles.footerText}>
        Connecting local service providers with customers in the community. 
        Find the help you need or grow your service business.
      </p>
    </div>

  

     {/* Quick Links */}
     <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>Quick Links</h3>
      <ul className={styles.footerList}>
       
        <li><Link to="/home">Home</Link></li>
           <li> <Link to="/services">Services</Link></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div className={styles.footerColumn}>
      <h3 className={styles.footerTitle}>Contact</h3>
      <p className={styles.footerText}>Email: namahsando@gmail.com</p>
      <p className={styles.footerText}>Phone: (250) 783214300</p>
    </div>
  </div>

  {/* Copyright */}
  <div className={styles.footerBottom}>
    <p>© 2025 ServiceHub. All rights reserved.</p>
  </div>
</footer>
</section>
    </div>
  );
};

export default Home;
