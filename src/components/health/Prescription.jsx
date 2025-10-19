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
import '../../styles/health/Prescription.css';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // Fetch prescriptions from Supabase
  useEffect(() => {
    const fetchPrescriptions = async () => {
      const { data, error } = await supabase
        .from('prescription')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prescriptions: ', error);
        setAlert({ message: 'Failed to fetch prescriptions.', type: 'error' });
        setOpenSnackbar(true);
      } else {
        setPrescriptions(data);
      }
    };
    fetchPrescriptions();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setAlert({ message: 'Please select a file first!', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    const fileName = `${Date.now()}_${file.name}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('prescriptions')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file: ', uploadError);
      setAlert({ message: 'Error uploading file. Please try again.', type: 'error' });
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    const filePath = `${supabaseUrl}/storage/v1/object/public/prescriptions/${fileName}`;

    // Insert into database
    const { data, error: insertError } = await supabase
      .from('prescription')
      .insert([{ file: file.name, file_path: filePath, file_name: fileName }]);

    if (insertError) {
      console.error('Error saving prescription: ', insertError);
      setAlert({ message: 'Error saving prescription. Please try again.', type: 'error' });
    } else {
      setPrescriptions([...prescriptions, { file: file.name, file_path: filePath, file_name: fileName }]);
      setAlert({ message: 'Prescription uploaded successfully!', type: 'success' });
      setFile(null);
      setOpenDialog(false);
    }

    setLoading(false);
    setOpenSnackbar(true);
  };

  // Handle delete
  const handleDelete = async (id, fileName) => {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('prescriptions')
      .remove([fileName]);

    if (storageError) {
      console.error('Error deleting file: ', storageError);
      setAlert({ message: 'Error deleting file from storage.', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('prescription')
      .delete()
      .eq('id', id);

    if (dbError) {
      console.error('Error deleting prescription: ', dbError);
      setAlert({ message: 'Error deleting prescription from database.', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    setPrescriptions(prescriptions.filter(p => p.id !== id));
    setAlert({ message: 'Prescription deleted successfully!', type: 'success' });
    setOpenSnackbar(true);
  };

  const handleBack = () => navigate('/health');
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <Helmet>
        <title>Health - Prescription</title>
      </Helmet>

      <div className="prescription-main">
        {/* Go Back Button */}
        <button className="go-back-btn" onClick={handleBack}>
          <ArrowBack className="back-arrow-icon" />
        </button>

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-overlay">
            <CircularProgress />
          </div>
        )}

        {/* Add Prescription Button */}
        <div className="prescription-button-wrapper">
          <Button
            variant="contained"
            className="futuristic-btn"
            onClick={handleOpenDialog}
          >
            <span>Add Prescription</span>
          </Button>
        </div>

        {/* Prescriptions List */}
        <div className="prescription-container">
          <h2 className="section-title">View Your Prescriptions</h2>
          {prescriptions.length === 0 ? (
            <p className="no-prescriptions">No prescriptions uploaded yet.</p>
          ) : (
            <div className="prescription-list">
              {prescriptions.map(prescription => (
                <div key={prescription.id} className="prescription-card">
                  <div className="prescription-card-content">
                    <h5>{prescription.file}</h5>
                    <a href={prescription.file_path} target="_blank" rel="noopener noreferrer">
                      Download / View
                    </a>
                  </div>
                  <Button
                    onClick={() => handleDelete(prescription.id, prescription.file_name)}
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dialog for File Upload */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Upload New Prescription</DialogTitle>
          <DialogContent>
            <TextField
              type="file"
              fullWidth
              onChange={handleFileChange}
              inputProps={{ accept: '.pdf,.jpg,.png' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleFileUpload} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
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
      </div>
    </>
  );
};

export default Prescription;
