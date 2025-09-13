import React, { useState, useEffect } from 'react';
import './Home.css';

const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Luxury Commercial Properties',
      description: 'Premium office spaces and commercial buildings in prime business districts with modern amenities and infrastructure.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Modern Office Solutions',
      description: 'Contemporary workspace designs with cutting-edge technology and flexible layouts for growing businesses.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Smart Investment Opportunities',
      description: 'High-yield commercial properties with guaranteed returns and professional property management services.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Business Hub Locations',
      description: 'Strategic commercial spaces in thriving business districts with excellent connectivity and growth potential.'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <article>
      <div className="carousel" id="propertyCarousel">
        {/* Carousel Inner */}
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
              style={{
                display: index === currentSlide ? 'block' : 'none',
                transition: 'opacity 0.6s ease-in-out'
              }}
            >
              <img 
                src={slide.image} 
                alt={`Property ${slide.id}`}
                className="d-block w-100"
              />
              <div className="carousel-caption">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={prevSlide}
          style={{
            position: 'absolute',
            top: '50%',
            left: '35px',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid rgba(0,0,0,0.1)',
            color: '#333',
            padding: '12px 16px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 10,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'white';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.9)';
            e.target.style.transform = 'translateY(-50%) scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          <span>‹</span>
        </button>

        {/* Next Button */}
        <button
          className="carousel-control-next"
          type="button"
          onClick={nextSlide}
          style={{
            position: 'absolute',
            top: '50%',
            right: '35px',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid rgba(0,0,0,0.1)',
            color: '#333',
            padding: '12px 16px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 10,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'white';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.9)';
            e.target.style.transform = 'translateY(-50%) scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          <span>›</span>
        </button>

        {/* Indicators */}
        <div 
          className="carousel-indicators"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 5
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid white',
                background: index === currentSlide ? 'white' : 'transparent',
                cursor: 'pointer',
                opacity: index === currentSlide ? 1 : 0.7,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'white';
                e.target.style.opacity = '1';
              }}
              onMouseOut={(e) => {
                if (index !== currentSlide) {
                  e.target.style.background = 'transparent';
                  e.target.style.opacity = '0.7';
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Additional Content Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            fontWeight: '300'
          }}>
            Discover Premium Real Estate
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '30px',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            Explore our curated collection of commercial properties, modern office spaces, and investment opportunities in prime locations.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '15px 30px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              View All Properties
            </button>
            <button style={{
              padding: '15px 30px',
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HomeSection;