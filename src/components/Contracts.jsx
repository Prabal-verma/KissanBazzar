// src/components/Contracts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch contracts from the backend
  const fetchContracts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contracts'); // Replace with your API endpoint
      setContracts(response.data || []); // Fallback to an empty array if no data is returned
    } catch (err) {
      setError('Failed to fetch contracts. Please try again later.');
      console.error('Error fetching contracts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contracts when the component mounts
  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-text mb-8">Contracts</h1>

      {loading ? (
        <p className="text-lg text-primary">Loading contracts...</p>
      ) : error ? (
        <p className="text-lg text-red-600">{error}</p>
      ) : contracts.length > 0 ? (
        <div className="w-full max-w-5xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map((contract, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-2xl font-semibold text-primary mb-2">
                  {contract.title || 'Contract Title'}
                </h2>
                <p className="text-lg text-text mb-2">
                  {contract.description || 'Description of the contract goes here.'}
                </p>
                <p className="text-sm text-gray-600">
                  Expiry Date: {contract.expiryDate || 'N/A'}
                </p>
                <button
                  className="mt-4 bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-secondary transition-colors duration-300"
                  onClick={() => alert(`Viewing contract: ${contract.title}`)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-gray-700">No contracts available at the moment.</p>
      )}
    </div>
  );
}

export default Contracts;
