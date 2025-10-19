import { useNavigate, Outlet } from 'react-router-dom';
import meetingImg from '../../assets/community.webp';
import inter from '../../assets/intergerenationalmeetups.jpeg';
import { Helmet } from 'react-helmet';
import '../../styles/community/Isolation.css';

const tilesData = [
  {
    title: 'Community',
    imgSrc: meetingImg,
    link: '/isolation/community',
    alt: 'Community',
    description: 'Join vibrant senior groups and stay socially active.'
  },
  {
    title: 'Intergenerational',
    imgSrc: inter,
    link: '/isolation/intergenerational',
    alt: 'Intergenerational',
    description: 'Bridge the gap between generations through shared experiences.'
  },
];

const Isolation = () => {
  const navigate = useNavigate();

  const handleTileClick = (link) => {
    navigate(link);
  };

  return (
    <>
      <Helmet>
        <title>Isolation - Elderly Engagement</title>
      </Helmet>

      <div className="isolation-container">
        <h1 className="isolation-title">Isolation Support</h1>
        <p className="isolation-subtext">
          Connecting seniors through community events, companionship, and intergenerational activities.
        </p>

        <div className="isolation-grid">
          {tilesData.map((tile, index) => (
            <div
              key={index}
              className="tile-card"
              onClick={() => handleTileClick(tile.link)}
            >
              <img
                src={tile.imgSrc}
                alt={tile.alt}
                className="tile-img"
              />
              <div className="card-body">
                <h3 className="tile-title">{tile.title}</h3>
                <p className="tile-description">{tile.description}</p>
                <div className="button-wrapper">
                  <button className="isolation-button">Explore</button>
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

export default Isolation;
