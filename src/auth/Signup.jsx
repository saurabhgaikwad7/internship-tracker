import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Signup</h2>

        <input
          className="input-field"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="input-field"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="signup-button" type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
