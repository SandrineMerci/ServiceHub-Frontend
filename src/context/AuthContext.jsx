// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ token });
    }
    setLoading(false);
    console.log("AuthProvider initialized with user:", {user});
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
  
      // Log the response for debugging
      console.log("Login Response:", response);
  
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
  
      const { token, role } = response.data; // Extract token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Store the role in localStorage
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ token, role }); // Update the user state
    } catch (err) {
      console.error("Login Error:", err);
      throw err.response?.data?.message || "Login failed. Please try again.";
    }
  };

  // Register function
  const register = async (name, email, password, role, phone, address) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register`, {
        name,
        email,
        password,
        role,
        phone,
        address,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); 
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ token });
    } catch (err) {
      throw err.response.data.message;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);