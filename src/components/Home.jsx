import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import health from '../assets/health.png';
import finance from '../assets/finance.jpeg.jpg';
import transport from '../assets/transport.jpg';
import isolation from '../assets/isolation.png';
import "../styles/Home.css";

const Home = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const servicesData = [
    {
      id: 1,
      title: 'Health',
      image: health,
      link: '/health'
    },
    {
      id: 2,
      title: 'Finance',
      image: finance,
      link: '/finance'
    },
    {
      id: 3,
      title: 'Transport',
      image: transport,
      link: '/transport'
    },
    {
      id: 4,
      title: 'Isolation',
      image: isolation,
      link: '/isolation'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Vridhub - Empowering Seniors</title>
      </Helmet>
      
      <div className="home-container">
        <h1 className="main-title">Empowering Seniors, Enhancing Lives</h1>
        <p className="subtitle">Your trusted companion for elderly care and support</p>

        <section className="content-section">
          {servicesData.map((service) => (
            <Link 
              to={service.link} 
              key={service.id}
              className={`card ${hoveredService === service.id ? 'card-hover' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="card-image-container">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="service-image"
                />
              </div>
              <h3 className="service-title">{service.title}</h3>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
