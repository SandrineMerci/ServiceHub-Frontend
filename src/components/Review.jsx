import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Review.module.css";

const Review = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`https://servicehub-backend.onrender.com/api/services`);
       console.log("Fetched Services:",response.data);
        setServices(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://servicehub-backend.onrender.com/api/reviews`);
        console.log("Fetched reviews:", response.data); // Debugging
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);
  

  // Submit review without updating displayed reviews immediately
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://servicehub-backend.onrender.com/api/reviews", {
        serviceId: selectedService,
        rating,
        comment,
      });

      setMessage("Review submitted successfully! It will appear after a refresh.");
      
      // Reset form
      setSelectedService("");
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Review Submission Section */}
      <div className={styles.reviewSection}>
        <h2 className={styles.heading}>Leave a Review</h2>
        <form className={styles.reviewForm} onSubmit={handleSubmit}>
          {/* <label className={styles.label}>Service Used</label>
          <select
            className={styles.select}
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">-- Select a Service --</option>
            {services.map((service) => (
              <option key={service.id} value={service.id} >
                {service.name}
              </option>
            ))}
          </select> */}

          <label className={styles.label}>Rating</label>
          <select
            className={styles.select}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} {star === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </select>

          <label className={styles.label}>Your Review</label>
          <textarea
            className={styles.textarea}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button className={styles.submitButton} type="submit">
            Submit Review
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
      </div>

      {/* Review Display Section */}
      <div className={styles.displaySection}>
        <h3 className={styles.reviewTitle}>Recent Reviews</h3>
        <div className={styles.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className={styles.reviewCard}>
                <span className={styles.stars}>
                  {"⭐".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
                <p className={styles.comment}>"{review.comment}"</p>
                {/* <div className={styles.userInfo}>
                  <strong>{review.username || "Anonymous"}</strong>
                  <p>Used {review.serviceUsed || "this service"}</p>
                </div> */}
              </div>
            ))
          ) : (
            <p className={styles.noReviews}>No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
