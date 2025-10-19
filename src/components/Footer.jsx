import styles from '../styles/Footer.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className={styles.contact}>
            <h5>Contact Us</h5>
            <p><FaMapMarkerAlt /> Jammu, India</p>
            <p><FaPhoneAlt /> +91 98765 43210</p>
            <p><FaEnvelope /> vridhhub@example.com</p>
          </Col>
          <Col md={4} className={styles.about}>
            <h5>About VridhHub</h5>
            <p>Supporting elderly care through tech-enabled solutions that ensure dignity, health, and community.</p>
          </Col>
          <Col md={4} className={styles.social}>
            <h5>Follow Us</h5>
            <div className={styles.icons}>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="text-center">
          <Col>
            <p className={styles.copy}>
              &copy; {new Date().getFullYear()} VridhHub | Designed by Lomash Gupta
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
