import { useNavigate, Outlet } from 'react-router-dom';
import bookingImg from '../../assets/transportbooking.jpeg';
import carpoolingImg from '../../assets/carpooling2.jpeg';
import { Helmet } from 'react-helmet';
import '../../styles/transport/Transport.css';

const tilesData = [
  {
    title: 'Book Cab',
    description: 'Quickly book a cab with elderly-friendly options for your comfort and safety.',
    buttonLabel: 'Access Book Cab',
    imgSrc: bookingImg,
    link: '/transport/book-cab',
    alt: 'Book Cab',
  },
  {
    title: 'Carpool',
    description: 'Join or offer rides with verified users in a safe, accessible carpool network.',
    buttonLabel: 'Access Carpool',
    imgSrc: carpoolingImg,
    link: '/transport/carpool',
    alt: 'Carpool',
  },
];

const Transport = () => {
  const navigate = useNavigate();

  const handleTileClick = (link) => {
    navigate(link);
  };

  return (
    <>
      <Helmet>
        <title>Transport</title>
      </Helmet>

      <div className="transport-container">
        <h1 className="transport-title">Elderly Travel Assistance</h1>

        {/* Intro paragraph */}
        <section className="transport-intro transport-subtext">
          Enjoy seamless travel with our elderly-friendly cab booking and carpooling services, designed for safety, comfort, and independence.
        </section>

        <div className="row justify-content-center mt-5">
          {tilesData.map((tile, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
              <div className="tile-card">
                <img src={tile.imgSrc} alt={tile.alt} className="tile-img" />
                <div className="card-body">
                  <h5 className="tile-title">{tile.title}</h5>
                  <p className="tile-description">{tile.description}</p>
                  <button
                    className="transport-button mt-3"
                    onClick={() => handleTileClick(tile.link)}
                  >
                    {tile.buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Transport;
