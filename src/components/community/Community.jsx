import { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import communityMeetup1 from '../../assets/communityMeetup1.jpeg';
import '../../styles/community/Community.css';

// ErrorBoundary to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-container">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const Community = () => {
  const [expandedInfo, setExpandedInfo] = useState({ info1: false });

  const communityData = [
    {
      id: 'info1',
      title: 'Local Gatherings',
      image: communityMeetup1,
      description:
        'Participate in local gatherings organized by NGOs to foster a sense of belonging among the elderly.',
      moreInfo:
        "These gatherings provide an opportunity to share stories, play games, and enjoy each other's company in a friendly and supportive environment.",
    },
  ];

  const toggleInfo = (id) => {
    setExpandedInfo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ErrorBoundary>
      <div className="community-container">
        <Helmet>
          <title>VridhHub - Community</title>
          <meta name="description" content="Join our elderly community events and activities" />
        </Helmet>

        <header className="header">
          <h1>Elderly Connect</h1>
          <p>Combating Isolation Through Community</p>
        </header>

        <nav className="nav-container">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About Us</Link>
          <Link to="/isolation">Community</Link>
        </nav>

        <section className="hero-section">
          <h1>Building Bridges, Not Walls</h1>
        </section>

        <section id="community" className="content-section">
          <h2 className="section-title">Community Meetups</h2>
          <div className="feature-grid">
            {communityData.map((item) => (
              <div key={item.id} className="feature-card">
                <div className="card-image-container">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button onClick={() => toggleInfo(item.id)} className="toggle-button">
                    {expandedInfo[item.id] ? 'Show Less' : 'Learn More'}
                  </button>
                  <div className={`more-info ${expandedInfo[item.id] ? 'active' : ''}`}>
                    <p>{item.moreInfo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default Community;
