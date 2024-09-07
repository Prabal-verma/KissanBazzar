import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContract } from '@/context/ContractContext';
import { toast } from 'react-toastify';

const CreateContractModal = ({ onClose }) => {
  const { contractData } = useContract();
  const [formData, setFormData] = useState({
    farmerId: contractData ? contractData._id : '',
    buyerId: '',
    cropType: '',
    quantity: '',
    startDate: '',  // Added
    endDate: '',    // Added
    pricePerUnit: '', // Added
  });

  useEffect(() => {
    if (contractData) {
      setFormData((prev) => ({
        ...prev,
        farmerId: contractData._id,
      }));
    }
  }, [contractData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contracts', formData);
      toast.success('Contract created successfully');
      onClose();
    } catch (error) {
      toast.error('Error creating contract');
      console.error('Error creating contract:', error);
    }
  };

  if (!contractData) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Contract with {contractData.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            placeholder="Crop Type"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="End Date"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            placeholder="Price per Unit"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContractModal;
