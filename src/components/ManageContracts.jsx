// src/components/ManageContracts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageContracts() {
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch contracts from the backend
  const fetchContracts = async () => {
    try {
      const response = await axios.get('/api/farmer/contracts'); // Replace with your API endpoint
      setContracts(response.data);
    } catch (err) {
      setError('Failed to fetch contracts. Please try again later.');
      console.error('Error fetching contracts:', err);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  // Handle contract acceptance
  const handleAccept = async (contractId) => {
    try {
      await axios.post(`/api/contracts/${contractId}/accept`); // Replace with your API endpoint
      setMessage('Contract accepted successfully!');
      fetchContracts(); // Refresh the contract list after accepting
    } catch (err) {
      setError('Failed to accept contract. Please try again later.');
      console.error('Error accepting contract:', err);
    }
  };

  // Handle contract rejection
  const handleReject = async (contractId) => {
    try {
      await axios.post(`/api/contracts/${contractId}/reject`); // Replace with your API endpoint
      setMessage('Contract rejected successfully!');
      fetchContracts(); // Refresh the contract list after rejecting
    } catch (err) {
      setError('Failed to reject contract. Please try again later.');
      console.error('Error rejecting contract:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Manage Contracts</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {contracts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white p-4 rounded-lg shadow-md border border-border"
            >
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {contract.title}
              </h2>
              <p className="text-text mb-2">{contract.description}</p>
              <p className="text-text mb-2">
                Start Date: {new Date(contract.startDate).toLocaleDateString()}
              </p>
              <p className="text-text mb-2">
                End Date: {new Date(contract.endDate).toLocaleDateString()}
              </p>
              <p className="text-text mb-4">Terms: {contract.terms}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAccept(contract.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(contract.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text">No contracts available for review.</p>
      )}
    </div>
  );
}

export default ManageContracts;
