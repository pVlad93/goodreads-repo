const BASE_API = "http://localhost:8080/";

export const loginUser = (username, password) => fetch(`${BASE_API}login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
});

export const getUserRole = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
        console.error("No token found, user is not authenticated");
        return null;
    }

    try {
        const response = await fetch(`${BASE_API}role`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user role");
        }
        
        const data = await response.text();
        return data; 
    } catch (error) {
        console.error("Error fetching user role:". error);
        return null;
    }
}