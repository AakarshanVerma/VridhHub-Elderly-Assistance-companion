import { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import {
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowBack } from '@mui/icons-material';
import '../../styles/health/Doctor.css';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching doctors:', error);
      } else {
        setDoctors(data);
      }
    };

    fetchDoctors();
  }, []);

  const handleAddDoctor = async () => {
    if (!name || !address || !specialization || !contact) {
      setAlert({ message: 'Please fill in all fields.', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('doctors')
      .insert([{ name, address, specialization, contact }]);

    if (error) {
      console.error('Error adding doctor:', error);
      setAlert({ message: 'Failed to add doctor.', type: 'error' });
    } else {
      setDoctors([...doctors, ...data]);
      setAlert({ message: 'Doctor added successfully.', type: 'success' });
      setOpenDialog(false);
      setName('');
      setAddress('');
      setSpecialization('');
      setContact('');
    }

    setLoading(false);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleBack = () => navigate('/health');

  return (
    <>
      <Helmet>
        <title>Health - Doctors</title>
      </Helmet>

      <main className="doctor-main">

        {/* Updated Go Back Button - NOW POSITION HIGHER */}
        <button onClick={handleBack} className="go-back-btn">
          <ArrowBack className="back-arrow-icon" />
        </button>

        {/* Loading Spinner */}
        {loading && (
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {/* Add Doctor Button */}
        <div className="doctor-button-wrapper">
          <Button
            variant="contained"
            className="futuristic-btn"
            onClick={handleOpenDialog}
          >
            <span>Add Doctor</span>
          </Button>
        </div>

        {/* Doctors List */}
        <div className="doctor-container">
          <h2 className="section-title">Your Consulted Doctors</h2>
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div>
                  <h5>{doctor.name}</h5>
                  <p>Address: {doctor.address}</p>
                  <p>Specialization: {doctor.specialization}</p>
                  <p>Contact: {doctor.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog for Adding Doctor */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Doctor</DialogTitle>
          <DialogContent>
            <div className="dialog-form">
              <TextField
                label="Doctor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
              <TextField
                label="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                fullWidth
              />
              <TextField
                label="Contact Information"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddDoctor} color="primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </main>
    </>
  );
};

export default Doctor;
