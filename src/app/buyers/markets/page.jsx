"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContract } from '../../../context/ContractContext'; // Adjust path if needed
import CreateContractModal from '@/components/CreateContractModal';
import { toast } from 'react-toastify';

const MarketsPage = () => {
  const [farmers, setFarmers] = useState([]);
  const { setContract } = useContract();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('/api/farmers/all');
        setFarmers(response.data);
      } catch (error) {
        toast.error('Error fetching farmers');
      }
    };

    fetchFarmers();
  }, []);

  const handleOpenModal = (farmer) => {
    console.log('Button clicked for farmer:', farmer); // Debug
    setContract(farmer);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Markets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmers.map((farmer) => (
          <div key={farmer._id} className="bg-white text-black p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{farmer.name}</h2>
            <p><strong>Email:</strong> {farmer.email}</p>
            <p><strong>Location:</strong> {farmer.farmDetails.location}</p>
            <button
              onClick={() => handleOpenModal(farmer)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Contract
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && <CreateContractModal onClose={handleCloseModal} />}
    </div>
  );
};

export default MarketsPage;
