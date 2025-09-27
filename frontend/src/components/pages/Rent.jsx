// src/components/RentPage.js
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./RentPage.css"; // <-- Import CSS file

const RentPage = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    monthlyRent: "",
    size: "",
    location: "",
    leaseDuration: "",
    furnished: "No",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentals",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Property listed successfully for rent!");
        setFormData({
          propertyName: "",
          monthlyRent: "",
          size: "",
          location: "",
          leaseDuration: "",
          furnished: "No",
          description: "",
        });
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.error ||
        error.message ||
        "Failed to list the property for rent. Please try again.";
      setErrorMessage(errMsg);
    }
  };

  return (
    <>
      <NavBar />

      <Container maxWidth="sm" className="rent-container">
        <Paper className="rent-form-card" elevation={4}>
          <Typography variant="h4" align="center" gutterBottom>
            List Your Property for Rent
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
                  fullWidth
                  label="Monthly Rent (in ₹)"
                  name="monthlyRent"
                  type="number"
                  value={formData.monthlyRent}
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
                  label="Lease Duration (in months)"
                  name="leaseDuration"
                  type="number"
                  value={formData.leaseDuration}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Furnished"
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  className="rent-submit-btn"
                >
                  Submit Property for Rent
                </Button>
              </Grid>

              <Grid item xs={12}>
                {successMessage && (
                  <Alert severity="success">{successMessage}</Alert>
                )}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Footer />
    </>
  );
};

export default RentPage;
