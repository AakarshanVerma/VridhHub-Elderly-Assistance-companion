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
  CircularProgress
} from '@mui/material';
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

  // Fetch doctors from Supabase
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching doctors:', error);
        setAlert({ message: 'Failed to fetch doctors.', type: 'error' });
        setOpenSnackbar(true);
      } else {
        setDoctors(data);
      }
    };

    fetchDoctors();
  }, []);

  // Handle adding a doctor
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

    setLoading(false);

    if (error) {
      console.error('Error adding doctor:', error);
      setAlert({ message: 'Failed to add doctor.', type: 'error' });
    } else {
      // Prepend new doctor to the list for immediate feedback
      setDoctors([...(data || []), ...doctors]);
      setAlert({ message: 'Doctor added successfully.', type: 'success' });
      handleCloseDialog(); // resets form
    }

    setOpenSnackbar(true);
  };

  // Reset form and close dialog
  const handleCloseDialog = () => {
    setName('');
    setAddress('');
    setSpecialization('');
    setContact('');
    setOpenDialog(false);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleBack = () => navigate('/health');

  return (
    <>
      <Helmet>
        <title>Health - Doctors</title>
      </Helmet>

      <main className="doctor-main">
        {/* Go Back Button */}
        <button onClick={handleBack} className="go-back-btn" aria-label="Go Back">
          <ArrowBack className="back-arrow-icon" />
        </button>

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-overlay">
            <CircularProgress />
          </div>
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
          {doctors.length === 0 ? (
            <p className="no-doctors">No doctors added yet.</p>
          ) : (
            <div className="doctor-list">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-card-content">
                    <h5>{doctor.name}</h5>
                    <p><strong>Address:</strong> {doctor.address}</p>
                    <p><strong>Specialization:</strong> {doctor.specialization}</p>
                    <p><strong>Contact:</strong> {doctor.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                margin="dense"
              />
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Contact Information"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                fullWidth
                margin="dense"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
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
