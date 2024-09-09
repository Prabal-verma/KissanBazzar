"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';

const FarmerMyContracts = ({ userId }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`/api/contracts`);
        setContracts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchContracts();
  }, [userId]);

  const handleAction = async (contractId, action) => {
    try {
      const response = await axios.post('/api/contracts/update', {
        contractId,
        status: action.charAt(0).toUpperCase() + action.slice(1).toLowerCase(),
      });
      if (response.status === 200) {
        toast.success(`Contract ${action}`);
        setContracts((prev) =>
          prev.map((contract) =>
            contract._id === contractId ? { ...contract, status: action.toLowerCase() } : contract
          )
        );
      }
    } catch (error) {
      console.error(error); // Log the error
      toast.error(`Error updating contract: ${error.response?.data?.message || 'Error'}`);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">My Contracts (Farmer)</h1>
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-gray-900" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">My Contracts (Farmer)</h1>
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">My Contracts (Farmer)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <div key={contract._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-900">{contract.buyerId.name}</h3>
              <span className={`text-sm font-medium ${contract.status === 'Pending' ? 'text-yellow-600' : contract.status === 'Accepted' ? 'text-green-700' : 'text-red-700'}`}>
                {contract.status}
              </span>
            </div>
            <div className="flex flex-col space-y-2 mb-4 text-md">
              <p className=" text-gray-600">Contract ID: {contract._id}</p>
              <p className=" text-gray-600">Date: {new Date(contract.createdAt).toLocaleDateString()}</p>
              <p className=" text-gray-600">Crop: {contract.crop}</p>
              <p className=" text-gray-600">Quantity: {contract.quantity} {contract.unit}</p>
              <p className=" text-gray-600">Price: {contract.price} per {contract.unit}/-</p>
            </div>
            {contract.status === 'Pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAction(contract._id, 'Accepted')}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ease-in-out"
                >
                  <FaCheck className="mr-1" /> Accept
                </button>
                <button
                  onClick={() => handleAction(contract._id, 'Rejected')}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg flex items-center transition-colors duration-200 ease-in-out"
                >
                  <FaTimes className="mr-1" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerMyContracts;
