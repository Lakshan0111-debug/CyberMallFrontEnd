import React, { useState } from 'react';
import './review.css';

const Review = () => {
    const [rating, setRating] = useState(0); // Track selected rating
    const [hover, setHover] = useState(0);   // Track hover effect on stars
    const [comment, setComment] = useState(''); // Optional comment
    const [submitted, setSubmitted] = useState(false); // Submission status
    const [errorMessage, setErrorMessage] = useState(''); // Error message

    // Handle rating click
    const handleRatingClick = (value) => {
        setRating(value);
        setErrorMessage(''); // Clear error when rating is selected
    };

    // Handle hover over stars
    const handleHover = (value) => {
        setHover(value);
    };

    // Handle comment change
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if rating is selected
        if (rating === 0) {
            setErrorMessage('Rating is required!');
        } else {
            setSubmitted(true); // Mark form as submitted
            console.log('Rating:', rating);
            console.log('Comment:', comment); // Optional comment

            // Clear form data after submission
            setRating(0);
            setHover(0);
            setComment('');
            setErrorMessage('');

            // Reset submission status after 1.5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 1500);
        }
    };

    return (
        <div className="review-container">
            {submitted ? (
                <div className="thank-you-message">
                    <h2>Thank you for your Review!</h2>
                </div>
            ) : (
                <div className="A">
                    <form onSubmit={handleSubmit}>
                        <div className="rating">
                            <h2>Your Review:</h2>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    className={`star ${value <= (hover || rating) ? 'filled' : ''}`}
                                    onClick={() => handleRatingClick(value)}
                                    onMouseEnter={() => handleHover(value)}
                                    onMouseLeave={() => handleHover(0)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                        <div className="comment">
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Write your comment here... "
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="submit-btn">Submit Review</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Review;
