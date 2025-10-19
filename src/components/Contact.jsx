import React, { useState } from 'react';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import supabase from '../../supabase'; // Supabase client
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && email && message) {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact')
        .insert([{ name, email, message }]);

      setLoading(false);

      if (error) {
        setSnackbarMessage('Error: ' + error.message);
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Your message has been sent successfully!');
        setSnackbarSeverity('success');
        setName('');
        setEmail('');
        setMessage('');
      }
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
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
            />
          </div>
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Send'}
          </button>
        </form>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
            variant="filled"
          >
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
  margin: '40px auto',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
  outline: 'none',
  transition: 'border 0.3s ease',
};

const textareaStyle = {
  padding: '10px',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  height: '120px',
  outline: 'none',
  transition: 'border 0.3s ease',
  resize: 'vertical',
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
  transition: 'background-color 0.3s ease',
};

export default Contact;
