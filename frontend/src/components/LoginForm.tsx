import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithPopup, googleAuthProvider } from "./firebaseConfig";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../services/api";
import { AxiosError } from "axios";
import "./LoginForm.css";
import Logo from "../image/inventotrack-high-resolution-logo-transparent-side.png";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
// FaEye, FaEyeSlash

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const { email, password } = JSON.parse(rememberedUser);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const tempErrors = {
      email: email ? "" : "Email is required",
      password: password ? "" : "Password is required",
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await login(email, password);
        const { access_token, refresh_token, role, message } = response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        switch (role) {
          case "superadmin":
          case "merchant":
            navigate("/merchant-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "clerk":
            navigate("/clerk-dashboard");
            break;
          default:
            navigate("/merchant-dashboard");
            break;
        }

        alert(message);
      } catch (error) {
        const typedError = error as AxiosError<{ message: string }>;
        alert(
          "Login failed: " +
            (typedError.response?.data.message || "Unknown error")
        );
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

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="login-container">
      <img src={Logo} alt="InventoTrack Logo" className="logo" />
      <div className="login-box">
        <h2 className="login-header">USER LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input ${errors.email && "input-error"}`}
              autoComplete="off"
            />
            <FaUser className="input-icon" />
            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </div>
          <div className="input-field">
            <input
              type={password ? "text" : "password"}
              // type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input ${errors.password && "input-error"}`}
              autoComplete="off"
            />
            <FaLock className="input-icon" />
            {/* <span className="show-password-icon" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span> */}
            {errors.password && (
              <small className="error-text">{errors.password}</small>
            )}
          </div>
          <div className="login-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <RouterLink to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </RouterLink>
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </div>
        <button onClick={handleGoogleSignIn} className="google-sign-in-button">
          <FaGoogle className="google-icon" />
          Continue with Google
        </button>
        <p className="signup-text">
          Don’t have an account?{" "}
          <RouterLink to="/sign-up" className="signup-link">
            Sign up here
          </RouterLink>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
