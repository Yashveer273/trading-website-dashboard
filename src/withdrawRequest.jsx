import React, { useState, useCallback, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, Loader2, X, AlertTriangle, ListChecks,  
} from 'lucide-react';
import './withdrawRequest.css';

const API_WITHDRAW_PENDING = 'http://localhost:5004/api/withdraw/withdraw-pending';
const API_WITHDRAW_APPROVE = 'http://localhost:5004/api/withdraw/withdraw-approve/';
const API_WITHDRAW_REJECT = 'http://localhost:5004/api/withdraw/withdraw-reject/';
const API_BANK_DETAILS = 'http://localhost:5004/api/withdraw/bank-details';

async function handleResponse(res) {
  try {
    const clonedRes = res.clone();
    return await clonedRes.json();
  } catch (e) {
    console.log(e);
    return await res.text();
  }
}

const WithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bankDetails, setBankDetails] = useState(null);

  const MessageDisplay = ({ text }) => {
    if (!text) return null;

    const isSuccess = text.includes('Approved') || text.includes('Rejected');
    const isError = text.includes('failed') || text.includes('Error:');

    let wrapperClass = "msg-box";
    let icon;

    if (isSuccess) {
      wrapperClass += " success";
      icon = <CheckCircle className="icon" />;
    } else if (isError) {
      wrapperClass += " error";
      icon = <X className="icon" />;
    } else {
      wrapperClass += " info";
      icon = <Loader2 className="icon spin" />;
    }

    return (
      <div className={wrapperClass}>
        {icon}
        <span>{text}</span>
      </div>
    );
  };

  const fetchWithdrawals = useCallback(async () => {
    setIsLoading(true);
    setMessage('Fetching pending withdrawals...');
    setWithdrawals([]);
    try {
      const res = await fetch(API_WITHDRAW_PENDING);
      const data = await handleResponse(res);
      if (!res.ok) throw new Error(data.message || `Failed: ${res.status}`);
      if (Array.isArray(data.data)) {
        setWithdrawals(data.data);
        setMessage(`${data.data.length} pending withdrawals loaded.`);
      } else {
        throw new Error('Server response not a list.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateWithdrawStatus = useCallback(async (id, status) => {
    setMessage(status === "approved" ? 'Approving withdrawal...' : 'Rejecting withdrawal...');
    try {
      const apiUrl = status === "approved" ? API_WITHDRAW_APPROVE : API_WITHDRAW_REJECT;
      const res = await fetch(`${apiUrl}${id}`, { method: 'PUT' });
      const resultBody = await handleResponse(res);
      if (!res.ok) throw new Error(resultBody.message || res.statusText);
      setMessage(`Withdrawal ID ${id} ${status === "approved" ? 'Approved' : 'Rejected'}.`);
      fetchWithdrawals();
    } catch (error) {
      setMessage(`Update failed: ${error.message}`);
    }
  }, [fetchWithdrawals]);

  const showBankDetails = async (userId) => {
    setMessage('Fetching bank details...');
    try {
      const res = await fetch(API_BANK_DETAILS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await handleResponse(res);
      if (!res.ok) throw new Error(data.message || 'Failed to fetch bank details');
      setBankDetails(data.bankDetails);
      setMessage('Bank details fetched successfully.');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setBankDetails(null);
    }
  };

  const WithdrawItem = ({ item }) => (
    <div className="transaction-card">
      <div className="transaction-header">
        <div className="transaction-user">
          <p>User ID: <span>{item.user?._id}</span></p>
          <p>Created At: <span>{new Date(item.createdAt).toLocaleString()}</span></p>
        </div>
        <p className="transaction-amount">
         
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount)}
        </p>
      </div>

      <div className="transaction-actions">
        <button
          onClick={() => updateWithdrawStatus(item._id, "approved")}
          disabled={isLoading}
          className="approve-btn"
        >
          <ListChecks className="icon" /> Approve
        </button>
        <button
          onClick={() => updateWithdrawStatus(item._id, "rejected")}
          disabled={isLoading}
          className="reject-btn"
        >
          <X className="icon" /> Reject
        </button>
        <button
          onClick={() => showBankDetails(item.user?._id)}
          disabled={isLoading}
          className="show-bank-btn"
        >
           Show Bank
        </button>
      </div>
      {bankDetails && (
        <div className="bank-details">
          <p>Holder Name: <span>{bankDetails.holderName}</span></p>
          <p>Account Number: <span>{bankDetails.accountNumber}</span></p>
          <p>IFSC: <span>{bankDetails.ifscCode}</span></p>
          <p>Bank Name: <span>{bankDetails.bankName}</span></p>
          <p>UPI ID: <span>{bankDetails.upiId}</span></p>
        </div>
      )}
    </div>
  );
useEffect(()=>{
fetchWithdrawals()
},[fetchWithdrawals]);
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-header">
          <h1><AlertTriangle className="icon" /> Pending Withdrawals</h1>
          <button
            onClick={fetchWithdrawals}
            disabled={isLoading}
            className="fetch-btn"
          >
            <RefreshCw className={`icon ${isLoading ? 'spin' : ''}`} />
            {isLoading ? 'Loading...' : 'Fetch Withdrawals'}
          </button>
          <MessageDisplay text={message} />
        </div>

        <div className="transaction-list">
          {!isLoading && withdrawals.length === 0 && message.includes("loaded") && (
            <div className="no-transactions">
              <CheckCircle className="icon" />
              <p>No pending withdrawals.</p>
            </div>
          )}
          {withdrawals.map(item => (
            <WithdrawItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequest;
