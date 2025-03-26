import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Authentication.module.css"; // Import your CSS file

const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        const role = localStorage.getItem("role");
        if (role === "provider") navigate("/provider-dashboard");
        else if (role === "admin") navigate("/admin-dashboard");
        else navigate("/services");
      } else {
        await register(name, email, password, role, phone, address);
        alert("Registered successfully!");
        setIsLogin(true); // Switch to login after successful registration
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.welcomeSection}>
        <h1>Welcome to ServiceHub</h1>
        <p>Your trusted platform for finding services.</p>
      </div>

      <div className={styles.authCard}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className={styles.inputField} />
              <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.inputField}>
                <option value="customer">Customer</option>
                
                <option value="admin">Admin</option>
              </select>
              <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.inputField} />
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className={styles.inputField} />
            </>
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.inputField} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.inputField} />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
