// src/app/farmers/dashboard/page.jsx
"use client";

import React from 'react';

const FarmerDashboard = () => {
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
          <h2 className="text-xl font-semibold mb-4">Welcome, [Farmer Name]!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Current Contracts</h3>
              <p>View and manage your current contracts here.</p>
              {/* Display a list or table of contracts */}
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Farm Statistics</h3>
              <p>View your farm statistics and performance metrics here.</p>
              {/* Display charts or stats */}
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-green-600 text-white text-center p-4">
        &copy; 2024 Contract Farming Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default FarmerDashboard;
