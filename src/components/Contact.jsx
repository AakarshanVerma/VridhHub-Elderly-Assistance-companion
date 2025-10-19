import React, { useState } from 'react';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import supabase from '../../supabase';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('contact').insert([{ name, email, message }]);
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
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>

      <div style={containerStyle}>
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <FormField label="Name" value={name} onChange={setName} />
          <FormField label="Email" type="email" value={email} onChange={setEmail} />
          <FormField label="Message" textarea value={message} onChange={setMessage} />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Send'}
          </button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
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

// Reusable form field component
const FormField = ({ label, value, onChange, type = 'text', textarea }) => (
  <div style={formGroupStyle}>
    <label>{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={textareaStyle}
        required
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
        required
      />
    )}
  </div>
);

// Inline styles
const containerStyle = {
  maxWidth: '600px',
  margin: '40px auto',
  padding: '30px',
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
  gap: '5px',
  textAlign: 'left',
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
  ...inputStyle,
  height: '120px',
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
