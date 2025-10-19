import { useNavigate, Outlet } from 'react-router-dom';
import billmanagement from '../../assets/billmanagement.jpeg';
import balanceImg from '../../assets/balance.png';
import { Helmet } from 'react-helmet';
import '../../styles/finance/Finance.css';

const tilesData = [
  {
    title: 'Bill Manager',
    imgSrc: billmanagement,
    link: '/finance/bill-manager',
    alt: 'Bill Manager',
    description: 'Manage and track all your bills in one place',
    style: {
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0'
    }
  },
  {
    title: 'Balance Tracker',
    imgSrc: balanceImg,
    link: '/finance/balance-tracker',
    alt: 'Balance Tracker',
    description: 'Keep track of your finances with real-time balance updates',
    style: {
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0'
    }
  }
];

const Finance = () => {
  const navigate = useNavigate();

  const handleTileClick = (link) => {
    navigate(link);
  };

  return (
    <div className="finance-container">
      <Helmet>
        <title>Finance Management</title>
      </Helmet>
      
      <h1 className="finance-header">Financial Management Hub</h1>

      <p className="finance-subtext">
        Secure Finances, Peace of Mind. Easily track your balance, manage expenses, and stay in control with tools designed for comfort, clarity, and confidence.
      </p>
      
      <div className="finance-grid">
        {tilesData.map((tile, index) => (
          <div 
            className="finance-card animate-in" 
            key={index}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => handleTileClick(tile.link)}
          >
            <div className="card-image-container">
              <img
                src={tile.imgSrc}
                alt={tile.alt}
                className="finance-image"
                loading="lazy"
                style={tile.style}
                onError={(e) => {
                  console.error(`Failed to load image: ${tile.title}`);
                  e.target.src = 'https://via.placeholder.com/300x200?text=Finance+Image';
                }}
              />
            </div>
            <div className="card-content">
              <h2 className="card-header">{tile.title}</h2>
              <p className="card-description">{tile.description}</p>
              <button className="finance-button">
                Access {tile.title}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Outlet />
    </div>
  );
};

export default Finance;
