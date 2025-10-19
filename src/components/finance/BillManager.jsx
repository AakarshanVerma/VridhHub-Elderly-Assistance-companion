import { useState, useEffect } from 'react';
import supabase from '../../../supabase';
import {
  Snackbar, Alert, Button, TextField, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchBills(); }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchBills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('BillManager').select('*');
    setLoading(false);
    if (error) return showSnackbar('Error fetching bills: ' + error.message, 'error');
    setBills(data);
  };

  const resetForm = () => {
    setForm({ name: '', amount: '', date: '', status: 'paid' });
    setEditId(null);
    setDialogOpen(false);
  };

  const openForm = (bill = null) => {
    if (bill) {
      setForm({
        name: bill.billname,
        amount: bill.billamount,
        date: bill.duedate,
        status: bill.status
      });
      setEditId(bill.id);
    } else resetForm();
    setDialogOpen(true);
  };

  const saveBill = async () => {
    const { name, amount, date, status } = form;
    if (!name || !amount || !date || !status) return showSnackbar('Please fill in all fields.', 'error');

    if (isNaN(amount) || Number(amount) <= 0) return showSnackbar('Amount must be a positive number.', 'error');

    const billData = { billname: name, billamount: amount, duedate: date, status };
    const response = editId
      ? await supabase.from('BillManager').update(billData).eq('id', editId)
      : await supabase.from('BillManager').insert([billData]);

    if (response.error) return showSnackbar('Error saving bill: ' + response.error.message, 'error');

    fetchBills();
    resetForm();
    showSnackbar(`Bill ${editId ? 'updated' : 'added'} successfully!`);
  };

  const deleteBill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bill?')) return;
    const { error } = await supabase.from('BillManager').delete().eq('id', id);
    if (error) return showSnackbar('Error deleting bill: ' + error.message, 'error');
    setBills(bills.filter(b => b.id !== id));
    showSnackbar('Bill deleted successfully!');
  };

  const statusColor = { paid: '#4caf50', unpaid: '#f44336', pending: '#ff9800' };

  return (
    <>
      <Helmet><title>Finance - Bill Manager</title></Helmet>
      <div className="bill-manager-container">

        {/* Back Button */}
        <Button variant="text" onClick={() => navigate('/finance')} style={{ marginBottom: '20px' }}>
          ← Back
        </Button>

        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Bill Manager</h1>

        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Button variant="contained" color="info" onClick={() => openForm()} sx={{ fontSize: '18px', padding: '15px 30px', minWidth: '200px' }}>
            Add Bill
          </Button>
        </Box>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading bills...</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Bill Name', 'Amount', 'Due Date', 'Status', 'Actions'].map(header => (
                    <TableCell key={header} align="center">{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.length > 0 ? bills.map(bill => (
                  <TableRow key={bill.id}>
                    <TableCell align="center">{bill.billname}</TableCell>
                    <TableCell align="center">₹{parseFloat(bill.billamount).toFixed(2)}</TableCell>
                    <TableCell align="center">{bill.duedate}</TableCell>
                    <TableCell align="center" style={{ color: statusColor[bill.status] }}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => openForm(bill)}><Edit /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteBill(bill.id)}><Delete /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No bills found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={resetForm}>
          <DialogTitle>{editId ? 'Edit Bill' : 'Add Bill'}</DialogTitle>
          <DialogContent>
            <TextField label="Bill Name" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <TextField label="Amount" fullWidth margin="dense" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            <TextField label="Due Date" type="date" fullWidth margin="dense" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} InputLabelProps={{ shrink: true }} />
            <Select fullWidth margin="dense" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
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
