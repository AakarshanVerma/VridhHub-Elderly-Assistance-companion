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
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="text-center text-md-left py-4">
          {/* Contact Info */}
          <Col md={4} className={styles.contact}>
            <h5 className="mb-3">Contact Us</h5>
            <p><FaMapMarkerAlt className={styles.icon} /> Jammu, India</p>
            <p><FaPhoneAlt className={styles.icon} /> +91 98765 43210</p>
            <p><FaEnvelope className={styles.icon} /> vridhhub@example.com</p>
          </Col>

          {/* About */}
          <Col md={4} className={styles.about}>
            <h5 className="mb-3">About VridhHub</h5>
            <p>
              Supporting elderly care through tech-enabled solutions that ensure dignity, health, and community.
            </p>
          </Col>

          {/* Social Links */}
          <Col md={4} className={styles.social}>
            <h5 className="mb-3">Follow Us</h5>
            <div className={styles.icons}>
              <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        <hr />

        {/* Copyright */}
        <Row className="text-center py-3">
          <Col>
            <p className={styles.copy}>
              &copy; {currentYear} VridhHub | Designed by <strong>Byte Busters</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
