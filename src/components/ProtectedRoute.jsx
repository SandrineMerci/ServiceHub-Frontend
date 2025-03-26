// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect to a default page (e.g., home)
    return <Navigate to="/" />;
  }

  // If the user is logged in and has the allowed role, render the requested component
  return <Outlet />;
};

export default ProtectedRoute;