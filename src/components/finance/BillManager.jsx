import { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import {
  Snackbar, Alert, Button, TextField, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../styles/finance/BillManager.css';

const BillManager = () => {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ name: '', amount: '', date: '', status: 'paid' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  useEffect(() => { fetchBills(); }, []);

  const fetchBills = async () => {
    const { data, error } = await supabase.from('BillManager').select('*');
    if (error) showSnackbar('Error fetching bills: ' + error.message, 'error');
    else setBills(data);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const saveBill = async () => {
    const { name, amount, date, status } = form;
    if (!name || !amount || !date || !status) return showSnackbar('Please fill in all fields.', 'error');

    const billData = {
      billname: name, billamount: amount, duedate: date, status
    };

    let response;
    if (editId) {
      response = await supabase.from('BillManager').update(billData).eq('id', editId);
    } else {
      response = await supabase.from('BillManager').insert([billData]);
    }

    if (response.error) return showSnackbar('Error saving bill: ' + response.error.message, 'error');

    fetchBills();
    resetForm();
    showSnackbar(`Bill ${editId ? 'updated' : 'added'} successfully!`);
  };

  const deleteBill = async (id) => {
    const { error } = await supabase.from('BillManager').delete().eq('id', id);
    if (error) showSnackbar('Error deleting bill: ' + error.message, 'error');
    else {
      setBills(bills.filter(b => b.id !== id));
      showSnackbar('Bill deleted successfully!');
    }
  };

  const resetForm = () => {
    setForm({ name: '', amount: '', date: '', status: 'paid' });
    setEditId(null);
    setDialogOpen(false);
  };

  const openForm = (bill = null) => {
    if (bill) {
      setForm({ name: bill.billname, amount: bill.billamount, date: bill.duedate, status: bill.status });
      setEditId(bill.id);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const statusColor = {
    paid: '#4caf50', unpaid: '#f44336', pending: '#ff9800'
  };

  return (
    <>
      <Helmet><title>Finance - Bill Manager</title></Helmet>
      <div className="bill-manager-container">

        {/* Go Back Button */}
        <button className="back-button" onClick={() => navigate('/finance')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2c7b47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
        </button>

        {/* Title */}
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Bill Manager</h1>

        {/* Add Bill Button */}
        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => openForm()}
            style={{
              fontSize: '18px', padding: '15px 30px', minWidth: '200px',
            }}
          >
            Add Bill
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Bill Name', 'Amount', 'Due Date', 'Status', 'Actions'].map(header => (
                  <TableCell key={header} align="center">{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell align="center">{bill.billname}</TableCell>
                  <TableCell align="center">{bill.billamount}</TableCell>
                  <TableCell align="center">{bill.duedate}</TableCell>
                  <TableCell align="center" style={{ color: statusColor[bill.status] }}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => openForm(bill)}><Edit /></IconButton>
                    <IconButton onClick={() => deleteBill(bill.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={resetForm}>
          <DialogTitle>{editId ? 'Edit Bill' : 'Add Bill'}</DialogTitle>
          <DialogContent>
            <TextField label="Bill Name" fullWidth margin="dense"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Amount" fullWidth margin="dense"
              value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <TextField label="Due Date" type="date" fullWidth margin="dense"
              value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              InputLabelProps={{ shrink: true }} />
            <Select fullWidth margin="dense" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetForm}>Cancel</Button>
            <Button onClick={saveBill} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default BillManager;
