import { useState, useEffect } from "react";
import "./PropertyCard.css"; // Add CSS for card styling
import { ListGroup, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios"; // Import axios for API requests
import { Link } from "react-router-dom";

const PropertyCard = () => {
  const [properties, setProperties] = useState([]); // Store properties
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const limit = 3; // Number of properties per page

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(null); // Error handling
  const [propertyType, setPropertyType] = useState(""); // Property type filter
  const [minPrice, setMinPrice] = useState(0); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(10000); // Maximum price filter

  // Fetch data based on current filters and page
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loading indicator
      setError(null); // Reset error

      try {
        const response = await axios.get(
          `http://localhost:5000/api/properties?&page=${currentPage}&limit=${limit}&search=${searchQuery}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        setProperties(response.data); // Set properties data
      } catch (err) {
        // If the error response has data and message, use that. Otherwise, fallback to a generic message.
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Error fetching properties. Please try again.";
        setError(errorMessage); // Set error to a string message, not an object
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchData(); // Call fetch function
  }, [currentPage, searchQuery, propertyType, minPrice, maxPrice]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === "next" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
    window.scrollTo(0, 850);
  };

  const handleContact = () => {
    window.open("https://wa.link/9mexid", "_blank");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "searchQuery":
        setSearchQuery(value);
        break;
      case "propertyType":
        setPropertyType(value);
        break;
      case "minPrice":
        setMinPrice(Number(value));
        break;
      case "maxPrice":
        setMaxPrice(Number(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="property-page">
      {/* Filter Section */}
      <Form className="filters">
        <Form.Group controlId="searchQuery">
          <Form.Label>Search by Name</Form.Label>
          <Form.Control
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search properties..."
          />
        </Form.Group>

        <Form.Group controlId="propertyType">
          <Form.Label>Filter by Property Type</Form.Label>
          <Form.Control
            as="select"
            name="propertyType"
            value={propertyType}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="office">Office</option>
            <option value="Shop">Shop</option>
            <option value="Showroom">Showroom</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="minPrice">
          <Form.Label>Min Price</Form.Label>
          <Form.Control
            type="number"
            name="minPrice"
            onChange={handleChange}
            placeholder="Min Price"
          />
        </Form.Group>

        <Form.Group controlId="maxPrice">
          <Form.Label>Max Price</Form.Label>
          <Form.Control
            type="number"
            name="maxPrice"
            onChange={handleChange}
            placeholder="Max Price"
          />
        </Form.Group>

        <Button variant="primary" onClick={() => setCurrentPage(1)}>
          Apply Filters
        </Button>
      </Form>

      {/* Loading Indicator */}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading</span>
        </Spinner>
      )}

      {/* Error Handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* List of Properties */}
      <ListGroup className="items">
        {properties.length > 0 ? (
          properties.map((property) => (
            <ListGroup.Item key={property._id} className="property-card">
              <Link to={`/BUY/${property._id}`} target="_blank">
                <img
                  src={property.thumbnail || "property-thumbnail.jpg"}
                  alt={property.property_name}
                  className="property-thumbnail"
                />
              </Link>
              <div className="property-details">
                <h3>{property.property_name || "Unnamed Property"}</h3>
                <p>Location: {property.location}</p>
                <p>Size: {property.property_size} sqft</p>
                <p>min-Value{property.property_value}</p>
                <p>Owner: {property.owner_name}</p>
              </div>
              <div className="contact-section">
                <button onClick={handleContact}>WhatsApp us</button>
                <p>Monthly Profit: 2 lakh</p>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>No properties available at the moment.</p>
        )}
      </ListGroup>

      {/* Pagination Section */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          PREV PAGE
        </button>
        <button onClick={() => handlePageChange("next")}>NEXT PAGE</button>
      </div>
    </div>
  );
};

export default PropertyCard;
