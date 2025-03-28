import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FiUsers, FiCalendar, FiStar, FiLoader, 
  FiAlertCircle, FiTrendingUp, FiCheckCircle 
} from "react-icons/fi";
import styles from "../styles/AdminDashboard.module.css";
import LineChart from '../components/LineChart';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const bookingTrendData = {
    labels: bookings.map(booking => 
      new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })
    ),
    datasets: [{
      label: 'Bookings',
      data: bookings.map((_, index) => index + 1), // Cumulative count
      borderColor: '#4361ee',
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      tension: 0.3,
      fill: true
    }]
  };
  
  const bookingTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  // Prepare user growth data
  const userGrowthData = {
    labels: users.map(user => 
      new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short' })
    ),
    datasets: [{
      label: 'Users',
      data: users.map((_, index) => index + 1), // Cumulative count
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      tension: 0.3,
      fill: true
    }]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, bookingsResponse, reviewsResponse] = await Promise.all([
          axios.get("https://servicehub-backend.onrender.com/api/users"),
          axios.get("https://servicehub-backend.onrender.com/api/bookings"),
          axios.get("https://servicehub-backend.onrender.com/api/reviews"),
        ]);

        setUsers(usersResponse.data || []);
        setBookings(bookingsResponse.data || []);
        setReviews(reviewsResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

    const handleStatusUpdate = async (bookingId, newStatus) => {
      try {
        // Call your API endpoint to update the status
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
    
        // Update the UI state if using React state management
        const updatedBookings = bookings.map(booking => 
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
    
      } catch (error) {
        console.error('Error updating status:', error);
        // Optionally show error message to user
      }
    };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>
          <span className={styles.adminBadge}>Admin</span> Dashboard
        </h1>
        <div className={styles.lastUpdated}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </header>

      {error && (
        <div className={styles.alertError}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <nav className={styles.navTabs}>
            <button
              className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <FiTrendingUp /> Overview
            </button>
            <button
              className={`${styles.tab} ${activeTab === "users" ? styles.active : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <FiUsers /> Users ({users.length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === "bookings" ? styles.active : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              <FiCalendar /> Bookings ({bookings.length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === "reviews" ? styles.active : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              <FiStar /> Reviews ({reviews.length})
            </button>
          </nav>

          <div className={styles.dashboardContent}>
            {activeTab === "overview" && (
              <>
                <div className={styles.metricsGrid}>
                  <div className={`${styles.metricCard} ${styles.primary}`}>
                    <FiUsers className={styles.metricIcon} />
                    <div>
                      <h3>Total Users</h3>
                      <p>{users.length}</p>
                    </div>
                  </div>
                  
                  <div className={`${styles.metricCard} ${styles.success}`}>
                    <FiCalendar className={styles.metricIcon} />
                    <div>
                      <h3>Completed Bookings</h3>
                      <p>{bookings.filter(b => b.status === "completed").length}</p>
                    </div>
                  </div>
                  
                  <div className={`${styles.metricCard} ${styles.warning}`}>
                    <FiLoader className={styles.metricIcon} />
                    <div>
                      <h3>Pending Bookings</h3>
                      <p>{pendingBookings}</p>
                    </div>
                  </div>
                  
                  <div className={`${styles.metricCard} ${styles.info}`}>
                    <FiStar className={styles.metricIcon} />
                    <div>
                      <h3>Avg. Rating</h3>
                      <p>{avgRating}/5</p>
                    </div>
                  </div>
                </div>

                <div className={styles.chartsContainer}>
  <div className={styles.chart}>
    <h3>Bookings Trend</h3>
    <div className={styles.chartWrapper}>
      <LineChart 
        data={bookingTrendData} 
        options={bookingTrendOptions} 
      />
    </div>
  </div>
  <div className={styles.chart}>
    <h3>User Growth</h3>
    <div className={styles.chartWrapper}>
      <LineChart 
        data={userGrowthData} 
        options={bookingTrendOptions} 
      />
    </div>
  </div>
</div>
              </>
            )}

            {activeTab === "users" && (
              <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                  <h2>User Management</h2>
                  {/* <input 
                    type="text" 
                    placeholder="Search users..." 
                    className={styles.searchInput}
                  /> */}
                </div>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className={styles.userCell}>
                            <div className={styles.avatar}>
                              {user.name.charAt(0)}
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`${styles.badge} ${
                            user.role === "admin" ? styles.badgePrimary : styles.badgeSecondary
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        {/* <td>
                          <button className={styles.actionButton}>Edit</button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                  <h2>Booking Management</h2>
                  <div className={styles.filterControls}>
                    {/* <select className={styles.filterSelect}>
                      <option>All Statuses</option>
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select> */}
                    {/* <input 
                      type="date" 
                      className={styles.dateFilter}
                    /> */}
                  </div>
                </div>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                      {/* <th>Amount</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.name}</td>
                        <td>{booking.serviceTitle}</td>
                        <td>
                          {new Date(booking.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${
                            booking.status === "completed" ? styles.success :
                            booking.status === "pending" ? styles.warning :
                            styles.error
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
  {booking.status === "completed" ? (
    <button
      onClick={() => handleStatusUpdate(booking._id, "pending")}
      className={`${styles.editButton} ${styles.secondaryButton}`}
    >
      Revert to Pending
    </button>
  ) : (
    <button
      onClick={() => handleStatusUpdate(booking._id, "completed")}
      className={styles.editButton}
    >
      Mark Completed
    </button>
  )}
</td>
                        {/* <td>${booking.price?.toFixed(2) || "0.00"}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className={styles.reviewsGrid}>
                {reviews.map((review) => (
  <div key={review._id} className={styles.reviewCard}>
    <div className={styles.reviewHeader}>
      <div className={styles.reviewerInfo}>
        <div className={styles.avatar}>
          {review.username?.charAt(0) || 'A'}
        </div>
        <div>
          <h3>{review.username || "Anonymous"}</h3>
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <span 
                key={i}
                className={`${styles.star} ${i < review.rating ? styles.filled : ''}`}
              >
                {i < review.rating ? '★' : '☆'}
              </span>
            ))}
            <span className={styles.ratingNumber}>{review.rating}.0</span>
          </div>
        </div>
      </div>
      <div className={styles.reviewDate}>
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
    <p className={styles.comment}>{review.comment}</p>
  </div>
))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;