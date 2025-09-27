import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaVectorSquare,
  FaUser,
  FaPhone,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./PropertyCard.css";

const PropertyCard = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  // UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/properties/");
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (propertyType) {
      filtered = filtered.filter((p) => p.property_type === propertyType);
    }
    if (location) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (minPrice) {
      filtered = filtered.filter((p) => p.property_value >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.property_value <= parseInt(maxPrice));
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchQuery, propertyType, location, minPrice, maxPrice, properties]);

  const totalPages = Math.ceil(filteredProperties.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContact = () => {
    window.open("https://wa.link/9mexid", "_blank");
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPropertyType("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="property-container">
      <div className="property-wrapper">
        {/* Header */}
        <div className="property-header">
          <h1>Premium Properties</h1>
          <p>Discover exceptional investment opportunities</p>
        </div>

        {/* Search and Filters */}
        <div className="filter-box">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search properties by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-primary"
            >
              <FaFilter /> Advanced Filters
            </button>
            {(propertyType || location || minPrice || maxPrice) && (
              <button onClick={clearFilters} className="btn-clear">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading properties...</span>
          </div>
        )}

        {/* Error */}
        {error && <div className="error-box">{error}</div>}

        {/* Properties Grid */}
        {!loading && (
          <div className="property-grid">
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map((property) => (
                <div key={property._id} className="property-card">
                  <div className="property-image">
                    <img src={property.thumbnail} alt={property.property_name} />
                    <span className="badge type">{property.property_type}</span>
                    <span className="badge price">{formatPrice(property.property_value)}</span>
                  </div>

                  <div className="property-details">
                    <h3>{property.property_name}</h3>
                    <div className="info">
                      <p><FaMapMarkerAlt /> {property.location}</p>
                      <p><FaVectorSquare /> {property.property_size} sqft</p>
                      <p><FaUser /> Owner: {property.owner_name}</p>
                    </div>

                    <div className="profit-box">
                      <span>Monthly Profit</span>
                      <strong>₹{(property.monthly_profit / 100000).toFixed(1)}L</strong>
                    </div>

                    <div className="actions">
                      <button onClick={handleContact} className="btn btn-green">
                        <FaPhone /> WhatsApp
                      </button>
                      
                      <Link to={`/properties/${property._id}`} className="btn btn-blue">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No properties found matching your criteria.</p>
                <button onClick={clearFilters} className="btn-clear">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft /> Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
