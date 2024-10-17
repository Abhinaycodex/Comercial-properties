// src/components/RentForm.js
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

const RentPage = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    monthlyRent: "",
    size: "",
    location: "",
    leaseDuration: "", // in months or years
    furnished: "No", // Furnished or not
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
      const response = await axios.post("https://api.example.com/rentals", formData);
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
      setErrorMessage(error, "Failed to list the property for rent. Please try again.");
    }
  };

  return (
    <>
    <NavBar />
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>

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
              label="Monthly Rent (in $)"
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Property for Rent
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

export default RentPage;
