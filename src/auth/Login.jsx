import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // For demo purposes: if no user exists, create one and log them in
    const existingUser = localStorage.getItem("user");
    if (!existingUser) {
      // Create a demo user for first-time login (use AuthContext's hash method)
      const hash = (value) => btoa(value);
      const demoUser = {
        email: email,
        name: email.split("@")[0] || "Demo User",
        password: hash(password),
      };
      localStorage.setItem("user", JSON.stringify(demoUser));
      // Manually update auth context by calling login (which will now succeed)
      const success = login(email, password);
      if (success) {
        navigate("/dashboard");
      }
      return;
    }

    // Try to login with existing credentials
    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <motion.form
        className="login-form"
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="login-title">Internship Tracker</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

        {/* ---- Signup Redirect ---- */}
        <p
          style={{
            marginTop: "18px",
            color: "#73399cff",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              fontWeight: "600",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign up
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
