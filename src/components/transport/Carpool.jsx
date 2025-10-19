import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../styles/transport/Carpool.css'; // Import your CSS styles

const Carpool = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleRideAction = (actionType) => {
    if (actionType === 'success') {
      setToastMessage('Ride successfully booked!');
      setToastVariant('success');
    } else {
      setToastMessage('There was an error booking the ride.');
      setToastVariant('danger');
    }
    setShowToast(true);
  };

  return (
    <>
      <Helmet>
        <title>Transport - Carpooling Service</title>
      </Helmet>
      <div className="carpool-container">
        <header className="carpool-header">
          <h1>Elderly Carpool Service</h1>
          <p>Safe and Convenient Rides for Seniors</p>
        </header>

        <nav className="carpool-nav">
          <a href="#features">Carpool Options</a>
        </nav>

        <section className="carpool-content" id="features">
          <h2>Carpooling Options</h2>
          <div className="carpool-features">
            {/* Join a Carpool Section */}
            <div className="carpool-feature-item">
              <div className="carpool-feature-image join-image"></div>
              <h3>Join a Carpool</h3>
              <p>Find and join carpool groups exclusively for seniors in your area. Enjoy safe, reliable rides with companions you can trust.</p>
              <div className="carpool-form">
                <label htmlFor="carpool-date">Select Date:</label>
                <input type="date" id="carpool-date" name="carpool-date" />
                <label htmlFor="carpool-time">Select Time:</label>
                <input type="time" id="carpool-time" name="carpool-time" />
                <button onClick={() => handleRideAction('success')}>Find a Ride</button>
              </div>
            </div>
            {/* Offer a Ride Section */}
            <div className="carpool-feature-item">
              <div className="carpool-feature-image offer-image"></div>
              <h3>Offer a Ride</h3>
              <p>If you drive and have extra space, offer a ride to fellow seniors. Help build a supportive community while sharing the journey.</p>
              <div className="carpool-form">
                <label htmlFor="offer-date">Select Date:</label>
                <input type="date" id="offer-date" name="offer-date" />
                <label htmlFor="offer-time">Select Time:</label>
                <input type="time" id="offer-time" name="offer-time" />
                <button onClick={() => handleRideAction('error')}>Offer a Ride</button>
              </div>
            </div>
          </div>
        </section>

        {/* Toast Notifications */}
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

export default Carpool;
