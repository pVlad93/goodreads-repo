import * as React from 'react';
import { useColorScheme } from "@mui/material/styles";
import { useState } from 'react';
import { loginUser } from "../api/SecurityApi";
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useNavigate } from 'react-router';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

const LoginFinal = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(undefined);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
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
                setToken(data.token);
                console.log("Login successful, token stored: ", data.token);
                navigate("/");
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
      <main>
        <ModeToggle />
        <CssBaseline />
        <Sheet
            sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            }}
            variant="outlined"
        >
            <div>
            <Typography level="h4" component="h1">
                <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
            <FormLabel>Account</FormLabel>
            <Input
                // html input attribute
                name="username"
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            </FormControl>
            <Button onClick={handleLogin} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
            {/* <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            sx={{ fontSize: 'sm', alignSelf: 'center' }}
            >
            Don&apos;t have an account?
            </Typography> */}
        </Sheet>
      </main>
  );
}

export default LoginFinal;