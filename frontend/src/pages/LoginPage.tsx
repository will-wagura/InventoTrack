// import { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   InputAdornment,
//   Checkbox,
//   FormControlLabel,
//   CircularProgress,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import GoogleIcon from "@mui/icons-material/Google";
// import { auth, signInWithEmailAndPassword, signInWithPopup, googleAuthProvider } from "./firebaseConfig";
// import { Link as RouterLink, useNavigate } from "react-router-dom";

// interface Props {
//   setSnackbar: React.Dispatch<
//     React.SetStateAction<{
//       open: boolean;
//       message: string;
//       severity: string;
//     }>
//   >;
// }

// const LoginPage = ({ setSnackbar }: Props) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState<{
//     username: string;
//     password: string;
//   }>({
//     username: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const rememberedUser = localStorage.getItem("rememberedUser");
//     if (rememberedUser) {
//       const { username, password } = JSON.parse(rememberedUser);
//       setUsername(username);
//       setPassword(password);
//       setRememberMe(true);
//     }
//   }, []);

//   const validateForm = () => {
//     const tempErrors = {
//       username: username ? "" : "Username is required",
//       password: password ? "" : "Password is required",
//     };
//     setErrors(tempErrors);
//     return Object.values(tempErrors).every((x) => x === "");
//   };

//   const handleSubmit = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);
//       try {
//         await signInWithEmailAndPassword(auth, username, password);
//         setSnackbar({
//           open: true,
//           message: "Login successful!",
//           severity: "success",
//         });
//         if (rememberMe) {
//           localStorage.setItem(
//             "rememberedUser",
//             JSON.stringify({ username, password })
//           );
//         } else {
//           localStorage.removeItem("rememberedUser");
//         }
//       } catch (error) {
//         const typedError = error as { message: string };
//         setSnackbar({
//           open: true,
//           message: "Login failed: " + typedError.message,
//           severity: "error",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleAuthProvider);
//       // The signed-in user info.
//       const user = result.user;
//       setSnackbar({
//         open: true,
//         message: `Welcome, ${user.displayName}!`,
//         severity: "success",
//       });
//     } catch (error) {
//       const typedError = error as { message: string };
//       setSnackbar({
//         open: true,
//         message: "Google sign-in failed: " + typedError.message,
//         severity: "error",
//       });
//     }
//   };

//   return (
//     <>
//       <Typography
//         variant="h6"
//         sx={{
//           mb: 3,
//           textAlign: "center",
//           fontWeight: "bold",
//           fontSize: "1.2rem",
//         }}
//       >
//         USER LOGIN
//       </Typography>
//       <TextField
//         fullWidth
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         error={!!errors.username}
//         helperText={errors.username}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <PersonIcon sx={{ color: "#20B2AA" }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{ mb: 2 }}
//         variant="outlined"
//       />
//       <TextField
//         fullWidth
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         error={!!errors.password}
//         helperText={errors.password}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <LockIcon sx={{ color: "#20B2AA" }} />
//             </InputAdornment>
//           ),
//         }}
//         sx={{ mb: 1 }}
//         variant="outlined"
//       />
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//               size="small"
//             />
//           }
//           label={
//             <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
//               Remember me
//             </Typography>
//           }
//         />
//         <RouterLink
//           to="/forgot-password"
//           style={{ textDecoration: "none" }}
//         >
//           <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#20B2AA" }}>
//             Forgot password?
//           </Typography>
//         </RouterLink>
//       </Box>
//       <Button
//         fullWidth
//         variant="contained"
//         onClick={handleSubmit}
//         disabled={isLoading}
//         sx={{
//           mb: 2,
//           backgroundColor: "#20B2AA",
//           "&:hover": { backgroundColor: "#1C9B9B" },
//           fontSize: "0.9rem",
//           py: 1,
//         }}
//       >
//         {isLoading ? <CircularProgress size={24} /> : "Sign In"}
//       </Button>
//       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//         <Box sx={{ flex: 1, height: 1, bgcolor: "grey.300" }} />
//         <Typography
//           variant="body2"
//           sx={{ px: 2, color: "grey.500", fontSize: "0.75rem" }}
//         >
//           OR
//         </Typography>
//         <Box sx={{ flex: 1, height: 1, bgcolor: "grey.300" }} />
//       </Box>
//       <Button
//         fullWidth
//         variant="outlined"
//         startIcon={<GoogleIcon />}
//         onClick={handleGoogleSignIn}
//         sx={{
//           borderColor: "#20B2AA",
//           color: "#20B2AA",
//           "&:hover": { borderColor: "#1C9B9B" },
//           fontSize: "0.8rem",
//           py: 1,
//         }}
//       >
//         Continue with Google
//       </Button>
//     </>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Update with your actual path

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'merchant' | 'clerk' | 'admin'>('merchant'); // Example role
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate authentication logic
    if (email && password) {
      // Set the role based on login credentials (for example purposes)
      // Normally, this should be done through API calls
      const userRole = role; // This should be fetched from backend after authentication

      // Save user role to local storage or state (if needed)
      // For simplicity, we're assuming the role is set here
      localStorage.setItem('userRole', userRole);

      // Redirect based on role
      navigate('/');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value as 'merchant' | 'clerk' | 'admin')}>
        <option value="merchant">Merchant</option>
        <option value="clerk">Clerk</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
