import { useState } from "react";
import axios from "axios";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import './Register.css';


const Register = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const [isRegister, setIsRegister] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setMessage("");
    setFormData({ user_name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    setLoading(true);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const msg = response.data.message || (isRegister ? "Registered!" : "Logged in!");
      setMessage(msg);

      if (!isRegister && response.data.token) {
        localStorage.setItem("token", response.data.token);
        // redirect if needed
      }

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="form-group">
                <label htmlFor="user_name">Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
            </button>
            <button type="button" className="toggle-btn" onClick={toggleMode}>
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </form>
          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
