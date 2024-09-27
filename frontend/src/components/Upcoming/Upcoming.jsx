import './Upcoming.css';
import {projects} from '../../assets/upcoming'

const UpcomingProjects = () => {
  return (
    <div className="projects-container">
      <h1>Upcoming Commercial Projects</h1>
      <p>Explore our upcoming projects with high rental revenue potential.</p>

      <div className="projects-list">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-details">
              <h2>{project.name}</h2>
              <p><strong>Location:</strong> {project.location}</p>
              <p><strong>Expected Rent Revenue:</strong> {project.rentRevenue}</p>
              <p><strong>Completion Date:</strong> {project.completionDate}</p>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingProjects;
