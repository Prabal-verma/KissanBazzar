"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import CreateContractModal from '@/components/CreateContractModal'; // Adjust path if needed
import { toast } from 'react-toastify';

const ContractFormPage = () => {
  const params = useParams();
  const [farmer, setFarmer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { farmerId } = params;

  useEffect(() => {
    if (farmerId) {
      const fetchFarmer = async () => {
        try {
          const response = await axios.get(`/api/farmers/${farmerId}`);
          setFarmer(response.data);
          setIsLoading(false);
        } catch (error) {
          toast.error('Error fetching farmer details');
          setIsLoading(false);
        }
      };

      fetchFarmer();
    }
  }, [farmerId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!farmerId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Contract</h1>
      {isLoading ? (
        <p>Loading farmer details...</p>
      ) : (
        farmer ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Farmer Details</h2>
            <p><strong>Name:</strong> {farmer.name}</p>
            <p><strong>Email:</strong> {farmer.email}</p>
            <p><strong>Location:</strong> {farmer.farmDetails.location}</p>
            <p><strong>Crop Types:</strong> {farmer.farmDetails.cropTypes}</p>
            <button
              onClick={handleOpenModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Contract
            </button>
          </div>
        ) : (
          <p>No farmer details found.</p>
        )
      )}
      
      {isModalOpen && (
        <CreateContractModal
          farmer={farmer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ContractFormPage;