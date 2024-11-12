import './Upcoming.css';
import { useState, useEffect } from 'react';
import axios from 'axios'; 

const UpcomingProjects = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const limit =3;


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:5000/api/Upcoming/?page=${currentPage}&limit=${limit}`);
        console.log(response);
        setUpcoming(response.data); // Set fetched projects
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching upcoming products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },  [currentPage]); 

  const handlepagechange = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlepagechangeprev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="projects-container">
      <p>Explore our upcoming projects with high rental revenue potential.</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : upcoming.length > 0 ? (
        <div className="projects-list">
          {upcoming.map((project) => (
            <div className="project-card" key={project._id}>
              <img
                src={project.image_url || 'https://via.placeholder.com/250'}
                alt={project.product_name}
                className="project-image"
              />
              <div className="project-details">
                <h2>{project.product_name}</h2>
                <p><strong>Price:</strong> ${project.price}</p>
                <p><strong>Quantity:</strong> {project.quantity}</p>
                <p><strong>Purchase Date:</strong> {new Date(project.purchase_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming products available at the moment.</p>
      )}

      <div className="next_bottom">
        <button onClick={handlepagechangeprev}>PREV PAGE</button>
        <button onClick={handlepagechange}>NEXT PAGE</button>
      </div>


    </div>

    
  );
};

export default UpcomingProjects;
