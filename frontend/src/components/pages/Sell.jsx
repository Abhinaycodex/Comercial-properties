// src/components/SellRentForm.js
import  { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";


const SellPage = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "Sell", // Default to "Sell"
    price: "",
    size: "",
    location: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
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

    try {
      const response = await axios.post("https://api.example.com/properties", formData);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Property listed successfully!");
        setFormData({
          propertyName: "",
          propertyType: "Sell",
          price: "",
          size: "",
          location: "",
          description: "",
        });
      }
    } catch (error) {
      setErrorMessage(error, "Failed to list the property. Please try again.");
    }
  };

  return (
    <>
    <NavBar />
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        List Your Property
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Property Name"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Property Type"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <MenuItem value="Sell">Sell</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price (in $)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Size (in sqft)"
              name="size"
              type="number"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Property
            </Button>
          </Grid>

          <Grid item xs={12}>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Grid>
        </Grid>
      </form>
    </Container>
    <Footer />
    </>
  );
};

export default SellPage;
