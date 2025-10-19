import { useNavigate, Outlet } from 'react-router-dom';
import prescriptionImg from '../../assets/pres.jpg';
import doctorImg from '../../assets/directory.jpg';
import { Helmet } from 'react-helmet';
import '../../styles/health/Health.css';

// Tile data
const tilesData = [
  {
    title: 'Prescription',
    imgSrc: prescriptionImg,
    link: '/health/prescription',
    alt: 'Prescription Management for Elders',
  },
  {
    title: 'Doctor Directory',
    imgSrc: doctorImg,
    link: '/health/doctor',
    alt: 'Find Doctors Near You',
  },
];

const Health = () => {
  const navigate = useNavigate();

  const handleTileClick = (link) => {
    navigate(link);
  };

  return (
    <>
      <Helmet>
        <title>Health | VridhHub</title>
      </Helmet>

      {/* Optional welcome/intro banner */}
      <div className="health-banner">
        <h2>Your Health, Our Priority</h2>
        <p>
          Explore medical tools specially crafted for elderly users — from managing prescriptions
          to finding trusted healthcare providers.
        </p>
      </div>

      <div className="health-container">
        <h1 className="health-title">Comprehensive Elder Care</h1>

        <div className="health-row">
          {tilesData.map((tile, index) => (
            <div
              className="health-card"
              key={index}
              onClick={() => handleTileClick(tile.link)}
              role="button"
              aria-label={`Navigate to ${tile.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTileClick(tile.link)}
            >
              <img src={tile.imgSrc} alt={tile.alt} />
              <div className="card-body">
                <h5 className="card-title">{tile.title}</h5>
                <p className="card-text">
                  {tile.title === 'Prescription'
                    ? 'Manage and track your medications with ease.'
                    : 'Locate and connect with trusted medical professionals.'}
                </p>
                <button className="health-button">Explore</button>
              </div>
            </div>
          ))}
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default Health;
