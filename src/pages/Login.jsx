// frontend/src/pages/Login.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Login.module.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect based on role
      const role = localStorage.getItem("role");
      if (role === "provider") {
        navigate("/provider-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "customer") {
        navigate("/services");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={styles.loginPage}>
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <p>
  Don't have an account? <Link to="/register">Register here</Link>
</p>
      </form>
    </div>
    </div>
  );
};

export default Login;