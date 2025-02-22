import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import { getUserRole } from '../../api/SecurityApi';

export const ButtonAppBar = ({ token, setToken }) => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated]= React.useState(!!localStorage.getItem("jwtToken"));
    const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem("jwtToken"));
        }

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        }
    }, []);

    React.useEffect(() => {
        const fetchedRole = async () => {
            if (!isAuthenticated) {
                return;
            }
            const role = await getUserRole();
            console.log("Received role: " + role);
            setUserRole(role);
        }

        fetchedRole();
    }, [isAuthenticated, token]);

    const handleLogin = () => {
        console.log("Navigating to login...");
        navigate("/login2");
    };

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setToken(null);
        setUserRole(null);
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Books
            </Typography>

            <Button color="inherit" onClick={() => navigate("/")}>
                Book Collection
            </Button>

            {userRole === "ROLE_AUTHOR" && (
                <Button color="inherit" onClick={() => navigate("/book")}>
                    Add Book
                </Button>
            )}

            {token ? (
            <Button onClick={handleLogout} color="inherit">Logout</Button>
            ) : (
            <Button onClick={handleLogin} color="inherit">Login</Button>
            )}
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default ButtonAppBar;