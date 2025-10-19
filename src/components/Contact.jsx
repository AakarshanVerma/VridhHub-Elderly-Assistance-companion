import React, { useState } from 'react';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import supabase from '../../supabase'; // Import Supabase client
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && email && message) {
      setLoading(true); // Show loading animation
      const { data, error } = await supabase
        .from('contact')
        .insert([{ name, email, message }]);

      setLoading(false); // Hide loading animation

      if (error) {
        setSnackbarMessage('Error: ' + error.message);
        setSnackbarSeverity('error'); // Set severity to error
        setSnackbarOpen(true); // Open snackbar
      } else {
        setSnackbarMessage('Your message has been sent successfully!');
        setSnackbarSeverity('success'); // Set severity to success
        setSnackbarOpen(true); // Open snackbar
        // Clear the form
        setName('');
        setEmail('');
        setMessage('');
      }
    } else {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarSeverity('error'); // Set severity to error
      setSnackbarOpen(true); // Open snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close snackbar
  };

  return (
    <>
    <Helmet>
      <title>Contact Us</title>
    </Helmet>
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyle}
            required
          ></textarea>
        </div>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Send'} {/* Show loading animation */}
        </button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
};

// Inline styles
const containerStyle = {
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '5px',
};

const inputStyle = {
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  height: '120px',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Contact;
