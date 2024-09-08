'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image


function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/farmers/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFarmer(data);
        } else {
          throw new Error('Failed to fetch farmer data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {/* Profile Overview */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-border">
          <h1 className="text-3xl font-semibold text-text mb-4">Farmer Profile</h1>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <div className="md:w-1/3 mb-6 md:mb-0">
            <Image 
                src={farmer?.profileImage || '/placeholder.png'} // Adjust placeholder path if needed
                alt="Farmer Profile" 
                width={150}
                height={150}
                className="w-full h-auto rounded-full shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-primary mb-2">{farmer?.name || 'Not available'}</h2>
              <p className="text-lg text-text mb-4">Location: {farmer?.address?.location || 'Not available'}</p>
              <p className="text-lg text-text mb-4">Farm Size: {farmer?.farmDetails?.size || 'Not available'}</p>
              <p className="text-lg text-text mb-4">Crops: {farmer?.farmDetails?.crops?.join(', ') || 'Not available'}</p>
              <Link 
                href="/farmers/edit-profile"
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
          <p className="text-gray-700">{farmer?.farmDetails?.description || 'No details available'}</p>
        </div>
      </section>

      {/* Contracts/Activities */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Active Contracts</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-border">
          <h3 className="text-xl font-semibold text-primary mb-4">Current Contracts</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {farmer?.contracts?.length > 0 ? (
              farmer.contracts.map((contract, index) => (
                <li key={index} className="mb-2">
                  {contract.title} - {contract.description} (Expires: {contract.expiryDate})
                </li>
              ))
            ) : (
              <li>No contracts available</li>
            )}
          </ul>
        </div>
      </section>
      <Link 
        href="/farmers/manage-contracts"
        className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
      >
        Manage Contracts
      </Link>
    </div>
  );
}

export default FarmerProfile;
