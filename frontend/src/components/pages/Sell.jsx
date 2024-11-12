import { useState } from "react";
import axios from "axios";
import "./sell.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Sell = () => {
  const [propertyData, setPropertyData] = useState({
    property_id: "",
    property_name: "",
    property_type: "",
    property_size: "",
    property_value: "",
    location: "",
    year_built: "",
    owner_name: "",
    owner_email: "",
    last_inspection_date: "",
    thumbnail: null,
    property_image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   console.log(propertyData);

  //   // Append all data correctly
  //   for (let key in propertyData) {
  //     if (propertyData[key] !== null) {
  //       formData.append(key, propertyData[key]);
  //     }
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/properties/add', propertyData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setMessage(response.data.message);

  //     // Reset form on successful submission
  //     setPropertyData({
  //       property_id: '',
  //       property_name: '',
  //       property_type: '',
  //       property_size: '',
  //       property_value: '',
  //       location: '',
  //       year_built: '',
  //       owner_name: '',
  //       owner_email: '',
  //       last_inspection_date: '',
  //       thumbnail: null,
  //       property_image: null,
  //     });

  //     // Reset file input elements
  //     if (document.getElementById('thumbnail')) {
  //       document.getElementById('thumbnail').value = '';
  //     }
  //     if (document.getElementById('property_image')) {
  //       document.getElementById('property_image').value = '';
  //     }
  //   } catch (error) {
  //     setMessage('Error adding property: ' + (error.response?.data?.message || error.message));
  //   }
  // };

  const handleSubmit = async (e) => {
    console.log(propertyData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/properties/add",
        propertyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sell-property-container">
      <NavBar />
      <h2>Sell Your Property</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        <input
          type="number"
          name="property_id"
          placeholder="Property ID"
          value={propertyData.property_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="property_name"
          placeholder="Property Name"
          value={propertyData.property_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="property_type"
          placeholder="Property Type"
          value={propertyData.property_type}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="property_size"
          placeholder="Property Size (sqft)"
          value={propertyData.property_size}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="property_value"
          placeholder="Property Value ($)"
          value={propertyData.property_value}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={propertyData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year_built"
          placeholder="Year Built"
          value={propertyData.year_built}
          onChange={handleChange}
          min="1000"
          max={new Date().getFullYear()}
          required
        />
        <input
          type="text"
          name="owner_name"
          placeholder="Owner Name"
          value={propertyData.owner_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="owner_email"
          placeholder="Owner Email"
          value={propertyData.owner_email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="last_inspection_date"
          value={propertyData.last_inspection_date}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          type="file"
          id="property_image"
          name="property_image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Add Property</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Footer />
    </div>
  );
};

export default Sell;
