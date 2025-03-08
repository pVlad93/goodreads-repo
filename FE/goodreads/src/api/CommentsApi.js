const BASE_API="http://localhost:8080/review/"

export const getCommentsByBookId = async (bookId) => {
    try {
        const response = await fetch(`${BASE_API}book/${bookId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Error fetching comments");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const postReview = async (userId, bookId, reviewText, rating) => {
    try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${BASE_API}book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                bookId,
                reviewText,
                rating
            })
        });

        if (!response.ok) {
            console.log("Error: Failed to post review");
            return null;
        }

        return response;
    } catch (error) {
        console.log("Error sending request:", error);
        return null;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${BASE_API}${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        return response;
    } catch (error) {
        console.log("Error sending requests: ", error);
    }
}