const BASE_API = "http://localhost:8080/book"

export const getAllBooks = () => fetch(`${BASE_API}/getAllBooks`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const addBook = async (title, description, genre) => {
    const token = localStorage.getItem("jwtToken"); // Retrieve JWT from storage

    console.log("Sending JWT Token:", token); // Debugging

    const response = await fetch(BASE_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Ensure correct format
        },
        body: JSON.stringify({ title, description, genre })
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error adding book:", errorData);
        throw new Error(errorData.message || "Failed to add books");
    }

    return response.text();
};

export const getGenres = async () => {
    return fetch(`${BASE_API}/genres`);
}