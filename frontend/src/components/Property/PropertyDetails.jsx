import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaVectorSquare, FaUser, FaPhone } from "react-icons/fa";
import "./PropertyDetails.css";
import NavBar from "../NavBar/NavBar";
const PropertyDetails = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();  
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // ✅ dependency fixed

  const handleContact = () => {
    window.open("https://wa.link/9mexid", "_blank");
  };

  if (loading) return <div className="loading">Loading property...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return null;

  return (
    <>
      <NavBar />
      <div className="property-details-page">
        {/* Banner */}
        <div className="property-banner">
          <img src={property.thumbnail} alt={property.property_name} />
          <div className="overlay">
          <h1>{property.property_name}</h1>
          <p><FaMapMarkerAlt /> {property.location}</p>
        </div>
      </div>

      {/* Info */}
      <div className="property-info">
        <h2>Property Information</h2>
        <p><FaVectorSquare /> Size: {property.property_size} sqft</p>
        <p><FaUser /> Owner: {property.owner_name}</p>
        <p>Type: {property.property_type}</p>
        <p>Value: ₹{property.property_value.toLocaleString()}</p>
        <p>
          Monthly Profit: ₹
          {(property.monthly_profit / 100000).toFixed(1)}L
        </p>
      </div>

      {/* Description */}
      <div className="property-description">
        <h2>Description</h2>
        <p>{property.description || "Best property available in the market."}</p>
      </div>

      {/* Contact */}
      <div className="contact-section">
        <h2>Interested?</h2>
        <button onClick={handleContact} className="btn btn-green">
          <FaPhone /> Contact via WhatsApp
        </button>
      </div>
    </div>
    </>
  );
};

export default PropertyDetails;
