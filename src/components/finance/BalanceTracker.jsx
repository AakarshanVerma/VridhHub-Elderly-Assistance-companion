import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';
import { Helmet } from 'react-helmet';
import '../../styles/finance/BalanceTracker.css';
import { ArrowBack } from '@mui/icons-material';

const BalanceTracker = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
    fetchRecentTransactions();
  }, []);

  const fetchBalance = async () => {
    const { data, error } = await supabase
      .from('Balance')
      .select('balance')
      .single();

    if (error) {
      setAlert({ show: true, message: `Error fetching balance: ${error.message}`, variant: 'danger' });
    } else if (data) {
      setCurrentBalance(parseFloat(data.balance) || 0);
    }
  };

  const fetchRecentTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, transaction_type, timestamp')
      .order('timestamp', { ascending: false })
      .limit(5);

    if (error) {
      setAlert({ show: true, message: `Error fetching transactions: ${error.message}`, variant: 'danger' });
    } else {
      setRecentTransactions(data || []);
    }
  };

  const handleBack = () => {
    navigate('/finance');
  };

  const handleAddMoney = () => {
    // You can navigate to another page to add money or handle the logic here
    alert("Add money functionality will be implemented here.");
  };

  return (
    <>
      <Helmet>
        <title>Finance - Balance Tracker</title>
      </Helmet>

      {/* Go Back Button placed outside the container */}
      <button className="back-button" onClick={handleBack}>
        <ArrowBack fontSize="inherit" />
      </button>

      <div className="balance-container">
        <div className="balance-header-container">
          <h1 className="balance-header">Balance Tracker</h1>
          <button className="add-money-button" onClick={handleAddMoney}>
            Add Money
          </button>
        </div>

        <div className="current-balance">
          Current Balance: ${currentBalance.toFixed(2)}
        </div>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    {transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1)}
                  </td>
                  <td>Rs. {parseFloat(transaction.amount).toFixed(2)}</td>
                  <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No recent transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BalanceTracker;
