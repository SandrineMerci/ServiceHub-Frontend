// frontend/src/pages/Register.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Register.module.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", { name, email, password, role, phone, address });
    try {
      await register(name, email, password, role, phone, address);
      alert("Registered successfully!");
      navigate("/login"); 
    } catch (err) {
        console.error("Registration Error:", err);
      alert(err);
    }
  };

  return (
    <div className={styles.registerPage}>
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.inputField}>
          <option value="customer">Customer</option>
          
        </select>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit">Register</button>
        <p>
 Have an account? <Link to="/login">Login here</Link>
</p>
      </form>
    </div>
    </div>
  );
};

export default Register;