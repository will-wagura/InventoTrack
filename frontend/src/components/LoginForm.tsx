import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { auth, signInWithPopup, googleAuthProvider } from "./firebaseConfig";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../services/api";
import { AxiosError } from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for remembered user in localStorage and set form fields
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const { email, password } = JSON.parse(rememberedUser);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    // Validate form fields and set error messages
    const tempErrors = {
      email: email ? "" : "Email is required",
      password: password ? "" : "Password is required",
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        // Perform the login request
        const response = await login(email, password);

        // Extract tokens and role from the response
        const { access_token, refresh_token, role, message } = response.data;
        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);
        console.log('Role:', role);

        // Store tokens in localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // Store user credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('rememberedUser');
        }

        // Navigate based on user role
        switch (role) {
          case 'superadmin':
          case 'merchant':
            navigate('/merchant-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'clerk':
            navigate('/clerk-dashboard');
            break;
          default:
            navigate('/merchant-dashboard'); // Default route
            break;
        }

        alert(message); // Display message from the response
      } catch (error) {
        const typedError = error as AxiosError<{ message: string }>;
        alert('Login failed: ' + (typedError.response?.data.message || 'Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      const typedError = error as { message: string };
      alert("Google sign-in failed: " + typedError.message);
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        USER LOGIN
      </Typography>
      <TextField
        fullWidth
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: "#20B2AA" }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
        variant="outlined"
      />
      <TextField
        fullWidth
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#20B2AA" }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1 }}
        variant="outlined"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="small"
            />
          }
          label={<Typography variant="body2" sx={{ fontSize: "0.75rem" }}>Remember me</Typography>}
        />
        <RouterLink to="/forgot-password" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#20B2AA" }}>Forgot password?</Typography>
        </RouterLink>
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        disabled={isLoading}
        sx={{ mb: 2, backgroundColor: "#20B2AA", "&:hover": { backgroundColor: "#1C9B9B" }, fontSize: "0.9rem", py: 1 }}
      >
        {isLoading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box sx={{ flex: 1, height: 1, bgcolor: "grey.300" }} />
        <Typography variant="body2" sx={{ px: 2, color: "grey.500", fontSize: "0.75rem" }}>OR</Typography>
        <Box sx={{ flex: 1, height: 1, bgcolor: "grey.300" }} />
      </Box>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        sx={{ borderColor: "#20B2AA", color: "#20B2AA", "&:hover": { borderColor: "#1C9B9B" }, fontSize: "0.8rem", py: 1 }}
      >
        Continue with Google
      </Button>
    </>
  );
};

export default LoginForm;
