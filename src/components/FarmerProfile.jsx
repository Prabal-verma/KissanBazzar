// src/pages/farmer-profile.js
import React from 'react';
import Link from 'next/link';

function FarmerProfile() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {/* Profile Overview */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-border">
          <h1 className="text-3xl font-semibold text-text mb-4">Farmer Profile</h1>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Farmer Profile" 
                className="w-full h-auto rounded-full shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-primary mb-2">John Doe</h2>
              <p className="text-lg text-text mb-4">Location: Springfield, IL</p>
              <p className="text-lg text-text mb-4">Farm Size: 50 acres</p>
              <p className="text-lg text-text mb-4">Crops: Corn, Soybeans, Wheat</p>
              <Link 
                href="/edit-profile"
                className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Details */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Farm Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">Farm Information</h3>
          <p className="text-gray-700">Our farm is located in Springfield, IL, covering an area of 50 acres. We specialize in growing corn, soybeans, and wheat, using sustainable farming practices to ensure high-quality produce.</p>
        </div>
      </section>

      {/* Contracts/Activities */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Active Contracts</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">Current Contracts</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">Contract with XYZ Corp. - Corn Supply (Expires: 12/31/2024)</li>
            <li className="mb-2">Contract with ABC Ltd. - Soybean Supply (Expires: 11/30/2024)</li>
          </ul>
        </div>
      </section>
      <Link 
        href="/manage-contracts"
        className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
      >
        Manage Contracts
      </Link>
    </div>
  );
}

export default FarmerProfile;
