"use client"
// src/pages/buyer-profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function BuyerProfile() {
  const [profile, setProfile] = useState({ name: '', email: '', contracts: [] });
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
    

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-text mb-8">Buyer Profile</h1>

      {loading ? (
        <p className="text-lg text-primary">Loading profile...</p>
      ) : error ? (
        <p className="text-lg text-red-600">{error}</p>
      ) : (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">Profile Details</h2>
          <p className="text-lg text-text mb-2"><strong>Name:</strong> {profile?.name || 'N/A'}</p>
          <p className="text-lg text-text mb-2"><strong>Email:</strong> {profile?.email || 'N/A'}</p>
          <p className="text-lg text-text mb-2"><strong>Contact:</strong> {profile?.contactNumber || 'N/A'}</p>
          <p className="text-lg text-text mb-2"><strong>Address:</strong> {profile?.address || 'N/A'}</p>
          <Link 
                href="/buyers/edit-profile"
                className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300"
              >
                Edit Profile
              </Link>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-4">Contracts</h3>
          {profile.contracts && profile.contracts.length > 0 ? (
            <ul className="space-y-2">
              {profile.contracts.map((contract, index) => (
                <li key={index} className="border border-border p-3 rounded-md">
                  {contract.title || 'Contract Title'} - {contract.status || 'Pending'}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-700">No contracts found.</p>
          )}
        </div>
      )}
      <Link
        href="/create-contract"
        className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
      >
        Create New Contract
      </Link>
    </div>
  );
}

export default BuyerProfile;
