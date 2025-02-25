import { Box, Button, Modal, Typography, Divider, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { getCommentsByBookId, postReview } from "../api/CommentsApi";
import { useNavigate } from "react-router";

const CommentModal = ({ modalData, bookTitle, bookId, userId, onReviewSubmitted, onClose }) => {

    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState(modalData);

    const navigate = useNavigate();

    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    }

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await postReview(userId, bookId, reviewText, rating);

        if (!response) {
            console.log("Error submitting review: Response is null");
            return;
        }

        if (!response.ok) {
            console.log(`Error: Failed to submit review. Status: ${response.status}`);
            return;
        }

        console.log("Review submitted successfully");

        setRating(0);
        setReviewText("");

        try {
            const updatedComments = await getCommentsByBookId(bookId);
            setComments(updatedComments);
            onReviewSubmitted(updatedComments);
        } catch (error) {
            console.error(`Error fetching comments: ${error}`);
        }

    }

    return(
        <Modal open={true} onClose={onClose}>
        <Box sx={{ padding: 3, backgroundColor: "white", margin: "auto", width: 1000, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Book Reviews - <strong>{bookTitle}</strong></Typography>

            {modalData && modalData.length > 0 ? ( modalData.map((comment, index) => (
                <Box key={index} sx={{ paddingY: 1 }}>
                    <Typography variant="body2"><strong>{comment.userFirstName} {comment.userLastName}</strong> - {formatDate(comment.createdAt)}</Typography>
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>{comment.reviewText}</Typography>
                    <Typography variant="body2">⭐ {comment.rating}/5</Typography>
                    {index !== modalData.length - 1 && <Divider sx={{ marginY: 1 }} />}
                </Box>
            ))
        ): (
            <Typography variant="body2" sx={{ marginBottom: 2 }}>No reviews yet.</Typography>
        )}
            {/* Review Section */}
            <Box sx={{ marginTop: 3}}>
                <Typography variant="body2">Add a Review: </Typography>
                <TextField
                    label="Write your comment"
                    multiline
                    rows={3}
                    value={reviewText}
                    onChange={handleReviewChange}
                    fullWidth
                    sx={{ marginBottom: 2}}
                />
                <Typography variant="body2">Rating:</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    precision={1}
                />
                <Button onClick={handleSubmit} sex={{ marginTop: 2}}>Submit review</Button>
            </Box>
            <Button onClick={onClose} sx={{ marginTop: 2, display: "block", marginLeft: "auto" }}>Close</Button>
        </Box>
    </Modal>
    );
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export default CommentModal;