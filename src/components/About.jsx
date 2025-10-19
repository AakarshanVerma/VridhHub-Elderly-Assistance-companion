import React, { useState } from 'react';
import { Container, Row, Col, Collapse, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const About = () => {
  const [openSection, setOpenSection] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleToggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAlertClose = () => setShowAlert(false);

  const styles = {
    footer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      fontSize: '16px',
      position: 'relative',
      bottom: '0',
      width: '100%',
      boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
      marginTop: '2rem',
    },
  };

  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <Container fluid className="py-5 bg-light" style={{ fontSize: '1.2rem' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center text-primary mb-4" style={{ fontSize: '2.5rem' }}>
              About Us
            </h1>

            <div className="text-center mb-4">
              <p className="lead">
                Welcome to our platform! We strive to make financial management simple and stress-free for everyone.
              </p>

              <Alert
                variant="info"
                show={showAlert}
                onClose={handleAlertClose}
                dismissible
                transition
              >
                We are committed to providing a secure and user-friendly experience. If you have any questions, feel free to reach out to our support team.
              </Alert>

              <p
                className="text-primary mt-3"
                onClick={() => setShowAlert(true)}
                style={{ cursor: 'pointer', fontWeight: '500' }}
              >
                Learn More
              </p>
            </div>

            <hr />

            <h3
              className="text-primary mt-4"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => handleToggleSection('whatWeOffer')}
            >
              What We Offer
            </h3>
            <Collapse in={openSection === 'whatWeOffer'}>
              <div className="mt-3">
                <p>
                  We offer a comprehensive suite of tools designed to help you track your finances easily. Our platform includes features for monitoring your balance, viewing recent transactions, and analyzing your spending patterns.
                </p>
              </div>
            </Collapse>

            <hr />

            <h3
              className="text-primary mt-4"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => handleToggleSection('whyItMatters')}
            >
              Why It Matters
            </h3>
            <Collapse in={openSection === 'whyItMatters'}>
              <div className="mt-3">
                <p>
                  Financial management is essential for achieving long-term security and peace of mind. By using our tools, you can easily keep track of your financial health and make informed decisions.
                </p>
              </div>
            </Collapse>

            <hr />

            <h3
              className="text-primary mt-4"
              style={{ fontSize: '2rem', cursor: 'pointer' }}
              onClick={() => handleToggleSection('whyChooseUs')}
            >
              Why Choose Us?
            </h3>
            <Collapse in={openSection === 'whyChooseUs'}>
              <div className="mt-3">
                <ul>
                  <li>Simple and intuitive design, easy to navigate</li>
                  <li>High level of security to protect your data</li>
                  <li>Responsive support team available to assist you</li>
                  <li>Clear and accessible information, tailored for all users</li>
                </ul>
                <p>
                  If you have any questions or need further assistance, please do not hesitate to{' '}
                  <a href="/contact" className="text-primary">
                    contact us
                  </a>
                  . We are here to help!
                </p>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>

      <footer style={styles.footer}>
        Designed By: <strong>Byte Busters</strong>
      </footer>
    </>
  );
};

export default About;
