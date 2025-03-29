import  { useState } from "react";
import axios from "axios";
import  Navbar  from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Register = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  // State for response messages
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("user_name", formData.user_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      
      setMessage(response.data.message || "User registered successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error: Could not register user.");
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="email">Name:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <div>
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <Footer />
    </div>
  );
};

export default Register;
