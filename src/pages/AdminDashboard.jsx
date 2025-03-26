import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/AdminDashboard.module.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, bookingsResponse, reviewsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/bookings"),
          axios.get("http://localhost:5000/api/reviews"), 
        ]);
  
        setUsers(usersResponse.data || []);
        setBookings(bookingsResponse.data || []);
        setReviews(reviewsResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* Show error message if API fails */}
      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <div className={styles.loading}>
          <p>Loading data...</p>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className={styles.summary}>
            <div className={styles.card}>
              <h3>Customers</h3>
              <p>{users.length}</p>
            </div>
            <div className={styles.card}>
              <h3>Total Bookings</h3>
              <p>{bookings.length}</p>
            </div>
          </div>

          {/* Users Table */}
          <h2>Customers</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No users available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Bookings Table */}
          <h2>Bookings</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Service</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.serviceTitle}</td>
                    <td>{new Date(booking.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Reviews Table */}
{/* Reviews Section */}
<h2> Reviews</h2>
<div className={styles.reviewsContainer}>
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <div key={review._id} className={styles.reviewCard}>
        <h3>{review.username || "Anonymous"}</h3>
        <p className={styles.comment}>{review.comment}</p>
        <div className={styles.rating}>
          ⭐ {review.rating}/5
        </div>
      </div>
    ))
  ) : (
    <p>No reviews available</p>
  )}
</div>


        </>
      )}
    </div>
  );
};

export default AdminDashboard;
