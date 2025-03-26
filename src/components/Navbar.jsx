import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "../styles/Navbar.module.css";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { SiAmazonsimpleemailservice } from "react-icons/si";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">ServiceHub</Link>
      </div>
      <div className={styles.links}>
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/services"><SiAmazonsimpleemailservice /> Services</Link>
            <Link to="/review">Reviews</Link>
            <Link to="/about" onClick={(e) => {
              e.preventDefault();  // Prevent navigation
              scrollToSection("about");
            }}>
              About
            </Link>

           
            {user.role === "admin" && (
              <>
                <Link to="/admin-dashboard">Dashboard</Link>
               
              </>
            )}
           <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><RiLoginCircleLine /> Login</Link>
            <Link to="/register"><FaUserPlus /> Register</Link>
            <Link to="/services"><SiAmazonsimpleemailservice /> Services</Link>
           
            <Link to="/about" onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}>
              About
            </Link>
            <Link to="/contact" onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}>
              Contact
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
