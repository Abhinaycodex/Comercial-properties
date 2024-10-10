import { useState, useEffect } from 'react'; // Ensure these hooks are imported
import './PropertyCard.css'; // Add CSS for card styling
import { ListGroup } from 'react-bootstrap';
import axios from 'axios'; // Import axios

const PropertyCard = () => {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:5173/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <ListGroup>
        {properties.map((property, index) => (
          <ListGroup.Item key={index}>
            <div className="property-card">
              <img src="property-thumbnail.jpg" alt="Office Space" className="property-thumbnail" />
              <div className="property-details">
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <p>${property.price}</p>
                <p>{property.description}</p>
                <p>{property.owner}</p>
              </div>
              <div className="contact-section">
                <button>Contact No.</button>
                <p>Monthly Profit: 2 lakh</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default PropertyCard;
