// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ServiceList from "./pages/ServiceList";
import styles from './styles/App.module.css';
import Navbar from './components/Navbar.jsx';
import ProviderDashboard from "./pages/ProviderDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import BookingForm from "./components/BookingForm.jsx";
import Authentication from "./pages/Authentication.jsx";
import Review from "./components/Review.jsx";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:category" element={<ServiceList />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/review" element={<Review />} />
         
               {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={["provider"]} />}>
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Customers are redirected to the home page */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<ServiceList />} />
        </Route>
        </Routes>
    
      </div>
    </Router>
    
  );
};
// <Review user={loggedInUser} services={availableServices} serviceId={defaultServiceId} />

export default App;