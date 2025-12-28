import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // temporary auth (for mini project)
    localStorage.setItem("auth", true);
    navigate("/dashboard");
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

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          required
        />

        <input
          type="password"
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
