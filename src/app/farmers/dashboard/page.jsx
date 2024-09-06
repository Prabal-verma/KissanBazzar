"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmerDashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [farmStats, setFarmStats] = useState({});
  const [farmerName, setFarmerName] = useState('');

  // Fetch data when the component mounts
  useEffect(() => {
    // Replace with your API endpoint to fetch contracts and farm stats
    const fetchData = async () => {
      try {
        const [contractsResponse, statsResponse, profileResponse] = await Promise.all([
          axios.get('/api/farmers/contracts'), // Update with your actual endpoint
          axios.get('/api/farmers/stats'), // Update with your actual endpoint
          axios.get('/api/farmers/profile'), // Update with your actual endpoint
        ]);
        setContracts(contractsResponse.data);
        setFarmStats(statsResponse.data);
        setFarmerName(profileResponse.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
      </div>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4">
          <nav className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block py-2 px-4 rounded hover:bg-green-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 rounded hover:bg-green-100">
                  My Contracts
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 rounded hover:bg-green-100">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 rounded hover:bg-green-100">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {farmerName}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Current Contracts</h3>
              <p>View and manage your current contracts here.</p>
              <ul>
                {contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <li key={contract.id} className="mb-2">
                      <p>{contract.title}</p>
                      <p>{contract.description}</p>
                    </li>
                  ))
                ) : (
                  <p>No contracts found.</p>
                )}
              </ul>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Farm Statistics</h3>
              <p>View your farm statistics and performance metrics here.</p>
              {/* Display charts or stats */}
              <pre>{JSON.stringify(farmStats, null, 2)}</pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
