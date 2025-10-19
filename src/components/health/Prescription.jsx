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

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const { data, error } = await supabase
        .from('prescription')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching prescriptions: ', error);
      } else {
        setPrescriptions(data);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setAlert({ message: 'Please select a file first!', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    const fileName = `${Date.now()}_${file.name}`;

    const { data: storageData, error: uploadError } = await supabase.storage
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

    const { data, error: insertError } = await supabase
      .from('prescription')
      .insert([{ file: file.name, file_path: filePath, file_name: fileName }]);

    if (insertError) {
      console.error('Error saving prescription to database: ', insertError);
      setAlert({ message: 'Error saving prescription to database. Please try again.', type: 'error' });
    } else {
      setAlert({ message: 'Prescription uploaded successfully', type: 'success' });
      setFile(null);
      setPrescriptions([...prescriptions, { file: file.name, file_path: filePath, file_name: fileName }]);
    }
    setLoading(false);
    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  const handleDelete = async (id, fileName) => {
    const { error: deleteStorageError } = await supabase.storage
      .from('prescriptions')
      .remove([fileName]);

    if (deleteStorageError) {
      console.error('Error deleting file from storage: ', deleteStorageError);
      setAlert({ message: 'Error deleting file from storage. Please try again.', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    const { error: deleteDbError } = await supabase
      .from('prescription')
      .delete()
      .eq('id', id);

    if (deleteDbError) {
      console.error('Error deleting prescription from database: ', deleteDbError);
      setAlert({ message: 'Error deleting prescription from database. Please try again.', type: 'error' });
      setOpenSnackbar(true);
      return;
    }

    setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
    setAlert({ message: 'Prescription deleted successfully', type: 'success' });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleClickOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleBack = () => navigate('/health');

  return (
    <>
      <Helmet>
        <title>Health - Prescription</title>
      </Helmet>
      <div className="prescription-main">
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Uploading...</span>
          </Spinner>
        )}

        {/* Updated Go Back Button */}
        <button className="go-back-btn" onClick={handleBack}>
          <ArrowBack className="back-arrow-icon" />
        </button>

        <div className="prescription-button-wrapper">
          <Button
            variant="contained"
            className="futuristic-btn"
            onClick={handleClickOpenDialog}
          >
            <span>Add Prescription</span>
          </Button>
        </div>

        <div className="prescription-container">
          <h2 className="section-title">View Your Prescriptions</h2>
          <div className="prescription-list">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="prescription-card">
                <div>
                  <h5>{prescription.file}</h5>
                  <p>
                    <a href={prescription.file_path} target="_blank" rel="noopener noreferrer">
                      Download/View
                    </a>
                  </p>
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
        </div>

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
      </div>

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
    </>
  );
};

export default Prescription;
