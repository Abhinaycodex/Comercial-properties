import { useState, useEffect } from "react";
import "./PropertyCard.css"; // Add CSS for card styling
import { ListGroup, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios"; // Import axios for API requests

const PropertyCard = () => {
  const [properties, setProperties] = useState([]); // Store properties
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const limit = 5; // Number of properties per page

  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(false); // Loading indicator
  const [error, setError] = useState(null); // Error handling
  const [propertyType, setPropertyType] = useState(""); // Property type filter
  const [minPrice, setMinPrice] = useState(0); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(1000000); // Maximum price filter

  // Fetch data based on current filters and page
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show loading indicator
      setError(null); // Reset error

      try {
        const response = await axios.get(
          `http://localhost:5000/api/properties?page=${currentPage}&limit=${limit}&search=${searchQuery}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        console.log(response);
        setProperties(response.data); // Set properties data
      } catch (err) {
        setError(err, "Error fetching properties. Please try again."); // Handle error
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchData(); // Call fetch function
  }, [currentPage, limit, searchQuery, propertyType, minPrice, maxPrice]);

  const handlepagechange = ()=>{
    setCurrentPage(prev=>prev+1)
    window.scrollTo(0,850);
  }
 
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle property type change
  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  // Handle price range changes
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };


  return (
    <>
      {/* Filter Section */}
      <Form className="filters">
        <Form.Group controlId="searchQuery">
          <Form.Label>Search by Name</Form.Label>
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search properties..."
          />
        </Form.Group>

        <Form.Group controlId="propertyType">
          <Form.Label>Filter by Property Type</Form.Label>
          <Form.Control as="select" value={propertyType} onChange={handlePropertyTypeChange}>
            <option value="">All</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="minPrice">
          <Form.Label>Min Price</Form.Label>
          <Form.Control
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min Price"
          />
        </Form.Group>

        <Form.Group controlId="maxPrice">
          <Form.Label>Max Price</Form.Label>
          <Form.Control
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max Price"
          />
        </Form.Group>

        <Button variant="primary" onClick={() => setCurrentPage(1)}>
          Apply Filters
        </Button>
      </Form>

      {/* Loading Indicator */}
      {loading && <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}

      {/* Error Handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* List of Properties */}
      <ListGroup>
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <ListGroup.Item className="property-card" key={property._id}>
              <div className="property-card">
                <img
                  src={property.thumbnail || "property-thumbnail.jpg"} // Fallback to placeholder
                  alt="Office Space"
                  className="property-thumbnail"
                />
                <div className="property-details">
                  <h3>{property.property_name}</h3>
                  <p>Location: {property.location}</p>
                  <p>Size: {property.property_size} sqft</p>
                  <p>Value: {property.property_value}</p>
                  <p>Year Built: {property.year_built}</p>
                  <p>Owner: {property.owner_name}</p>
                  <p>
                    Last Inspection Date:{" "}
                    {new Date(property.last_inspection_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="contact-section">
                  <button>Contact No.</button>
                  <p>Monthly Profit: 2 lakh</p>
                </div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>No properties available at the moment.</p>
        )}
      </ListGroup>

      <button onClick={handlepagechange}>
        NEXT PAGE
      </button>

     
    </>
  );
};

export default PropertyCard;
