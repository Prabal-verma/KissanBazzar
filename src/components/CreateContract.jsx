"use client"
// src/components/CreateContract.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CreateContract() {
  const [contract, setContract] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    terms: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContract({ ...contract, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Send the contract data to the backend
      const response = await axios.post('/api/contracts', contract); // Replace with your API endpoint
      setMessage('Contract created successfully!');
      setContract({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        terms: '',
      });
    } catch (err) {
      setError('Failed to create contract. Please try again later.');
      console.error('Error creating contract:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-6">Create a New Contract</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-text font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={contract.title}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-text font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={contract.description}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md p-2"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-text font-semibold mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={contract.startDate}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-text font-semibold mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={contract.endDate}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-text font-semibold mb-2">Terms</label>
          <textarea
            name="terms"
            value={contract.terms}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-md p-2"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
        >
          Create Contract
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

export default CreateContract;
