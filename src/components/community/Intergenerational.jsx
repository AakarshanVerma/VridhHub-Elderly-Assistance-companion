import  { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import intergenerational from '../../assets/intergerenationalmeetups.jpg';
import intergerenationalskills from '../../assets/intergerenationalskills.jpg';
import intergerenationalsupport from '../../assets/intergerenationalsupport.jpg';
import '../../styles/community/Intergenerational.css';

const Intergenerational = () => {
  const [info, setInfo] = useState({
    info1: false,
    info2: false,
    info3: false,
  });

  const toggleInfo = (id) => {
    setInfo((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <Helmet>
        <title>Isolation - Intergenerational</title>
      </Helmet>
      
      <div className="intergenerational-container">
        <header className="header">
          <h1>Bridging Generations</h1>
          <p>Connecting the Elderly with Orphans through Compassionate Meetups</p>
        </header>
        
        <nav className="nav-container">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#features" className="nav-link">Features</a>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/isolation" className="nav-link">Community</Link>
        </nav>
        
        <section className="hero-section">
          <h1>Bridging the Gap Between Generations</h1>
        </section>
        
        <section id="features" className="content-section">
          <div className="section-header">
            <h2 className="section-title">Our Features</h2>
          </div>
          <div className="program-grid">
            <div className="program-card">
              <img src={intergenerational} alt="Intergenerational Meetups" className="program-image" />
              <h3 className="program-title">Intergenerational Meetups</h3>
              <p className="program-description">Organize and participate in meetups that bring the elderly and orphans together for shared activities and companionship.</p>
              <button
                className="join-button"
                onClick={() => toggleInfo('info1')}
              >
                Learn More
              </button>
              <div className={`more-info ${info.info1 ? 'active' : ''}`}>
                <p>These meetups are designed to foster mutual understanding and emotional support between the elderly and orphans, helping to build lasting relationships.</p>
              </div>
            </div>

            <div className="program-card">
              <img src={intergerenationalskills} alt="Skill Sharing" className="program-image" />
              <h3 className="program-title">Skill Sharing</h3>
              <p className="program-description">Elderly participants can share their life skills and experiences with the younger generation, offering guidance and wisdom.</p>
              <button
                className="join-button"
                onClick={() => toggleInfo('info2')}
              >
                Learn More
              </button>
              <div className={`more-info ${info.info2 ? 'active' : ''}`}>
                <p>From storytelling to craft making, these sessions provide a platform for the elderly to pass on their knowledge and for orphans to learn valuable life lessons.</p>
              </div>
            </div>

            <div className="program-card">
              <img src={intergerenationalsupport} alt="Community Support" className="program-image" />
              <h3 className="program-title">Community Support</h3>
              <p className="program-description">Build a supportive community where both the elderly and orphans can find companionship, understanding, and care.</p>
              <button
                className="join-button"
                onClick={() => toggleInfo('info3')}
              >
                Learn More
              </button>
              <div className={`more-info ${info.info3 ? 'active' : ''}`}>
                <p>Our programs focus on creating a sense of belonging and emotional security through regular interaction and community-building activities.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Intergenerational;
