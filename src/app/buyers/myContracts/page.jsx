"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyerMyContracts = ({ userId }) => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`/api/contracts`);
        setContracts(response.data);
      } catch (error) {
        toast.error('Error fetching contracts');
      }
    };
    fetchContracts();
  }, [userId]);

  return (
    <div className="container mx-auto p-6  text-black">
      <h1 className="text-2xl font-bold mb-6">My Contracts (Buyer)</h1>
      {contracts.map(contract => (
        <div key={contract._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold">Farmer: {contract.farmerId.name}</h3>
          <p>Status: {contract.status}</p>
        </div>
      ))}
    </div>
  );
};

export default BuyerMyContracts;
