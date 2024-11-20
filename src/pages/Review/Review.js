import React, { useEffect, useState } from 'react';
import './review.css';
import axios from 'axios';

const Review = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [reviews, setReviews] = useState([]); 
    const [editIndex, setEditIndex] = useState(null); 

    useEffect(() =>{
        loadReview();
    },[])

    async function loadReview () {
        try {
           const response = await axios.get(`http://localhost:8080/api/v1/review`);
           setReviews(response.data);
        } catch (error) {
           console.log(error) 
        }
        
    }

    const handleRatingClick = (value) => {
        setRating(value);
        setErrorMessage('');
    };

    const handleHover = (value) => {
        setHover(value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        const data = {
            rating: rating,
            comment: comment
        };
        try {
            await axios.post(`http://localhost:8080/api/v1/review`,data)
            loadReview()
            setSubmitted(true);
            setRating(0);
            setHover(0);
            setComment('');
            setErrorMessage('');
        } catch (error) {
            console.log(error.response.data);
        }

        }

    async function editReview(review) {
        setEditIndex(review);
        setRating(review.rating);
        setComment(review.comment);
    }

    async function updateReview() {
        const data = {
            rating: rating,
            comment: comment
        };

        await axios.put('http://localhost:8080/api/v1/review/'+editIndex?.id, data)
        setEditIndex(null);
        loadReview();
        setRating(0);
        setHover(0);
        setComment("")
        
        
    }
    

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (confirmDelete) {
            try{
                await axios.delete(`http://localhost:8080/api/v1/review/${id}`);
                loadReview();
            }
            catch (error){
                console.error("error deleting product",error);
                
            }
        }
    };
    

    return (
        <div className="review-container">
            {submitted && !editIndex && (
                <div className="thank-you-message">
                    <h2>Thank you for your Review!</h2>
                </div>
            )}

            <div className="A">
                <form onSubmit={handleSubmit}>
                    <div className="rating">
                        <h2>{editIndex !== null ? 'Edit Your Review:' : 'Your Review:'}</h2>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                className={`star ${value <= (hover || rating) ? 'filled' : ''}`}
                                onClick={() => handleRatingClick(value)}
                                onMouseEnter={() => handleHover(value)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <div className="comment">
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Write your comment here..."
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>

    {editIndex ? (
        <>
            <button type="submit" className="submit-btn" onClick={updateReview}>
                Update Review
            </button>
        </>
    ) : (
        <>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
                Submit Review
            </button>
        </>
    )
    }
            
            <div className="review-table">
                    <div className='aaa'>
                        <h2>Submitted Reviews:</h2>
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <td>
                                        <button
                                            onClick={() => editReview(review)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No reviews submitted yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Review;
