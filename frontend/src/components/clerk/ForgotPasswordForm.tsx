import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { auth, sendPasswordResetEmail } from "./firebaseConfig";

interface Props {
  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      severity: string;
    }>
  >;
}

const ForgotPasswordForm = ({ setSnackbar }: Props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSnackbar({
        open: true,
        message: "Password reset email sent!",
        severity: "success",
      });
    } catch (error) {
      const typedError = error as { message: string };
      setSnackbar({
        open: true,
        message: "Failed to send reset email: " + typedError.message,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Forgot Password
      </Typography>
      <TextField
        fullWidth
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
        variant="outlined"
      />
      <Button
        fullWidth
        variant="contained"
        onClick={(e) => handleResetPassword(e)}
        disabled={isLoading}
        sx={{
          backgroundColor: "#20B2AA",
          "&:hover": { backgroundColor: "#1C9B9B" },
          fontSize: "0.9rem",
          py: 1,
        }}
      >
        {isLoading ? <CircularProgress size={24} /> : "Send Reset Link"}
      </Button>
    </>
  );
};

export default ForgotPasswordForm;
