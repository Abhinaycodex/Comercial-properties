import { useState, useRef } from 'react';
import './Tabs.css'; // Add CSS for styling
import PropertyCard from '../Property/PropertyCard';
import UpcomingProjects from '../Upcoming/Upcoming';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("properties");

  // Create references for each section
  const propertiesRef = useRef(null);
  const upcomingRef = useRef(null);

  // Scroll to section when a tab is clicked
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Scroll to the respective section
    if (tab === "properties" && propertiesRef.current) {
      propertiesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "upcoming" && upcomingRef.current) {
      upcomingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Tabs for navigation */}
      <div className="tabs-container">
        <button
          className={activeTab === "properties" ? "active" : ""}
          onClick={() => handleTabClick("properties")}
        >
          PROPERTIES
        </button>
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => handleTabClick("upcoming")}
        >
          UPCOMING PROJECTS
        </button>
      </div>

      {/* Properties Section */}
      <div ref={propertiesRef} className="section">
        <h2>Properties Section</h2>
        <p>Details about commercial properties will be shown here.</p>
        <PropertyCard />
      </div>

      {/* Upcoming Projects Section */}
      <div ref={upcomingRef} className="section">
        <h2>Upcoming Projects Section</h2>
        <p>Details about upcoming projects with high rent revenue potential.</p>
        <UpcomingProjects />
      </div>
    </div>
  );
};

export default Tabs;
