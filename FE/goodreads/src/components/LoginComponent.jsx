import { useEffect, useState } from "react";
import { loginUser } from "../api/SecurityApi";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginUser(username, password);
            const text = await response.text();
            console.log(`Raw response: ${text}`);

            let data;
            try {
                data = JSON.parse(text);
            } catch (jsonError) {
                console.log(`Failed to parse JSON: ${jsonError}`);
                setError(`Invalid response from server`);
                return;
            }

            if (response.ok) {
                localStorage.setItem("jwtToken", data.token);
                console.log("Login successful, token stored: ", data.token);
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("Login failed");
            console.log(`error: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    }

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>Welcome!</h2>
                    <p>You are successfully logged in.</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>Login</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginComponent;