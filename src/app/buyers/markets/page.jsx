"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContract } from '@/context/ContractContext';
import { TailSpin } from 'react-loader-spinner'; // Spinner loader
import CreateContractModal from '@/components/CreateContractModal';

const MarketPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setContract } = useContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState({
    cropType: '',
    location: '',
    size: '',
  });

  // Fetch all farmers
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('/api/farmers/all');
        setFarmers(response.data);
        setFilteredFarmers(response.data); // Initially, show all farmers
      } catch (error) {
        toast.error('Error fetching farmers');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const handleOpenModal = (farmer) => {
    setContract(farmer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle input change for live filtering
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });

    const filtered = farmers.filter((farmer) => {
      const matchesCropType = farmer.farmDetails.cropTypes
        .toLowerCase()
        .includes(name === 'cropType' ? value.toLowerCase() : search.cropType.toLowerCase());
      const matchesLocation = farmer.farmDetails.location
        .toLowerCase()
        .includes(name === 'location' ? value.toLowerCase() : search.location.toLowerCase());
      const matchesSize = search.size
        ? farmer.farmDetails.size >= Number(name === 'size' ? value : search.size)
        : true;

      return matchesCropType && matchesLocation && matchesSize;
    });

    // Show filtered farmers or all farmers if inputs are empty
    setFilteredFarmers(filtered.length ? filtered : farmers);
  };

  // Handle clear button click
  const handleClear = () => {
    setSearch({
      cropType: '',
      location: '',
      size: '',
    });
    setFilteredFarmers(farmers); // Show all farmers again
  };

  if (loading) {
    return <div className="flex bg-white justify-center items-center min-h-screen">
    <TailSpin
      height={60}
      width={60}
      color="gray"
      ariaLabel="loading-spinner"
    />
  </div>; // Loading state
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Farmers Available for Contract</h1>

      {/* Search Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="cropType"
          placeholder="Crop Type"
          value={search.cropType}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={search.location}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          name="size"
          placeholder="Minimum Farm Size (acres)"
          value={search.size}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
        >
          Clear
        </button>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.length === 0 ? (
          <p>No farmers found</p>
        ) : (
          filteredFarmers.map((farmer) => (
            <div key={farmer._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-black">
              <h3 className="text-xl font-semibold mb-2">{farmer.name}</h3>
              <p className="text-gray-700 mb-1">Email: {farmer.email}</p>
              <p className="text-gray-700 mb-1">Contact: {farmer.contactNumber || 'N/A'}</p>
              <p className="text-gray-700 mb-1">Address: {farmer.address || 'N/A'}</p>

              {/* Farm Details */}
              {farmer.farmDetails && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Farm Details:</h4>
                  <p className="text-gray-700 mb-1">Location: {farmer.farmDetails.location || 'N/A'}</p>
                  <p className="text-gray-700 mb-1">Size: {farmer.farmDetails.size ? `${farmer.farmDetails.size} acres` : 'N/A'}</p>
                  <p className="text-gray-700 mb-1">Crop Types: {farmer.farmDetails.cropTypes || 'N/A'}</p>
                </div>
              )}

              {/* Contract button */}
              <button onClick={() => handleOpenModal(farmer)} className="inline-block bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition-colors duration-200">
                Contract
              </button>
            </div>
          ))
        )}
         {isModalOpen && <CreateContractModal onClose={handleCloseModal} />}
         </div>
      </div>
    
  );
};

export default MarketPage;
