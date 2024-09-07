// src/pages/buyer-profile.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { TailSpin } from 'react-loader-spinner'; // Spinner loader

function BuyerProfile() {
  const [profile, setProfile] = useState({ name: '', email: '', contracts: [], image: '/default-profile.png' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/buyers/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          throw new Error('Failed to fetch Buyer data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerData();
  }, []);

  if (loading) {
    return (
      <div className="flex bg-white justify-center items-center min-h-screen">
        <TailSpin
          height={60}
          width={60}
          color="gray"
          ariaLabel="loading-spinner"
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Buyer Profile</h1>

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg transition-transform hover:scale-105 duration-300 ease-in-out">
        {/* Profile Image Section */}
        <div className="flex items-center space-x-6 mb-6">
          <Image
            src={profile.image || '/defaultProfile.webp'}
            alt="Profile Image" height={65} width={65}
            className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-indigo-600"
          />
          <div>
            <h2 className="text-2xl font-semibold text-indigo-600">{profile?.name || 'N/A'}</h2>
            <p className="text-lg text-gray-600">{profile?.email || 'N/A'}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-2">
          <div className="flex gap-5">
            <p className="text-lg text-gray-800"><strong>Contact:</strong></p>
            <p className="text-lg text-gray-800">{profile?.contactNumber || 'N/A'}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-lg text-gray-800"><strong>Address:</strong></p>
            <p className="text-lg text-gray-800">{profile?.address || 'N/A'}</p>
          </div>
        </div>

        <Link 
          href="/buyers/edit-profile"
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-65 block text-center"
        >
          Edit Profile
        </Link>

        {/* Contracts Section */}
        <h3 className="text-xl font-semibold text-indigo-600 mt-8 mb-4">Contracts</h3>
        {profile.contracts && profile.contracts.length > 0 ? (
          <ul className="space-y-2">
            {profile.contracts.map((contract, index) => (
              <li 
                key={index} 
                className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {contract.title || 'Contract Title'} - {contract.status || 'Pending'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700">No contracts found.</p>
        )}
      </div>

      <Link
        href="/create-contract"
        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        Create New Contract
      </Link>
    </div>
  );
}

export default BuyerProfile;
