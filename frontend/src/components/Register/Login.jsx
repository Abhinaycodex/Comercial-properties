import { useState } from "react";
import axios from "axios";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Register.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(response.data.message || "Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-btn">Login</button>
          </form>
          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
