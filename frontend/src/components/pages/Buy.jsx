import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Alert } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import PropertyCard from '../Property/PropertyCard';

const BuyPage = () => {
  const { property_id } = useParams();
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:5000/api/properties/?${property_id}`);
        setProperty(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.error || "Error fetching property details.";
        setError(errorMessage);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    if (property_id) {
      fetchPropertyDetails(); 
    }
  }, [property_id]);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!property) {
    return <p>No property details available.</p>;
  }

  return (
    <div>
      <NavBar />
      <PropertyCard property={property} />
      <Footer />
    </div>
  );
};

export default BuyPage;
